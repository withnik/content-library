#!/usr/bin/env node
// Enforces "stay in your own directory". CODEOWNERS routes reviews; it does
// not stop anyone editing another member's app or the shared infra.
//
//   node scripts/check-scope.mjs <base-ref> <head-ref>
//
// Fails when a PR touches more than one member directory, or touches
// anything outside seasons/<n>/members/. The maintainer's PRs are expected
// to touch shared paths, so they skip the check.
//
// Escape hatch for general improvements: the maintainer adds the
// `shared-change` label. It counts only if the maintainer was the last one to
// add it. Added by anyone else, it is removed and the check runs as normal.
//
// Runs from pull_request_target, i.e. the base branch's copy of this file, so
// a PR cannot rewrite the check that judges it.

import { execFileSync } from 'node:child_process';

const MEMBERS = 'seasons/1/members';
const MAINTAINER = 'niksumeiko';
const SHARED_LABEL = 'shared-change';

const [baseRef = 'origin/main', headRef = 'HEAD'] = process.argv.slice(2);
const author = process.env.PR_AUTHOR ?? process.env.GITHUB_ACTOR ?? '';
const repo = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.PR_NUMBER;
const labels = JSON.parse(process.env.PR_LABELS || '[]');

const gh = (...args) => execFileSync('gh', args, { encoding: 'utf8' }).trim();

if (author === MAINTAINER) {
    console.log(`Author is ${MAINTAINER} — scope check skipped.`);
    process.exit(0);
}

if (labels.includes(SHARED_LABEL)) {
    // The payload says the label is on the PR, not who put it there. The
    // issue events do; the most recent "labeled" event is the one in force.
    const addedBy = gh(
        'api',
        '--paginate',
        `repos/${repo}/issues/${prNumber}/events`,
        '--jq',
        `.[] | select(.event == "labeled" and .label.name == "${SHARED_LABEL}") | .actor.login`,
    )
        .split('\n')
        .filter(Boolean)
        .at(-1);

    if (addedBy === MAINTAINER) {
        console.log(
            `Labelled "${SHARED_LABEL}" by ${MAINTAINER} — scope check skipped.`,
        );
        process.exit(0);
    }

    console.log(
        `"${SHARED_LABEL}" was added by ${addedBy ?? 'unknown'}, not ${MAINTAINER} — removing it.`,
    );
    try {
        // A removal made with the workflow token triggers no new run, so this
        // cannot loop.
        gh(
            'api',
            '-X',
            'DELETE',
            `repos/${repo}/issues/${prNumber}/labels/${SHARED_LABEL}`,
        );
        gh(
            'pr',
            'comment',
            prNumber,
            '--repo',
            repo,
            '--body',
            `Removed \`${SHARED_LABEL}\`: only ${MAINTAINER} can apply it. ` +
                `If this PR is a general improvement, ask for the label in a comment.`,
        );
    } catch (error) {
        // Already gone (a concurrent run got there first) — nothing to undo.
        console.log(`Could not remove the label: ${error.message}`);
    }
}

const files = execFileSync(
    'git',
    ['diff', '--name-only', `${baseRef}...${headRef}`],
    {
        encoding: 'utf8',
    },
)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const problems = [];
const memberDirs = new Set();
const outside = [];

for (const file of files) {
    const match = file.match(new RegExp(`^${MEMBERS}/([^/]+)/`));
    if (match) memberDirs.add(match[1]);
    else outside.push(file);
}

if (memberDirs.size > 1) {
    problems.push(
        `Touches ${memberDirs.size} member directories: ${[...memberDirs].join(', ')}. One PR, one directory.`,
    );
}

// Everything outside members/ is shared: configs, starter, data, briefs,
// lockfile. A lockfile change means a new dependency — that needs an issue.
if (outside.length > 0) {
    problems.push(
        `Touches maintainer-owned paths:\n    ${outside.join('\n    ')}`,
    );
}

if (problems.length > 0) {
    console.error('Scope check failed:\n');
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error(
        `\nIf this is a general improvement, ask ${MAINTAINER} to add the "${SHARED_LABEL}" label.`,
    );
    process.exit(1);
}

console.log(
    `Scope OK — ${files.length} file(s) in ${MEMBERS}/${[...memberDirs][0] ?? '(none)'}`,
);
