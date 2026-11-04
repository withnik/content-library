#!/usr/bin/env node
// Removes a member's app folder (the opposite of new-member).
//
//   npm run remove-member <github-handle> [season]
//
// Deletes seasons/<season>/members/<handle>, drops the handle's line from
// .github/CODEOWNERS, and installs so the workspace links and lockfile are
// updated. Commit the result together with package-lock.json and
// .github/CODEOWNERS.

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const [handle, season = '1'] = process.argv.slice(2);

if (!handle || !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(handle)) {
    console.error('Usage: npm run remove-member <github-handle> [season]');
    process.exit(1);
}

const target = join('seasons', season, 'members', handle);

if (!existsSync(target)) {
    console.error(`${target} does not exist`);
    process.exit(1);
}

rmSync(target, { recursive: true, force: true });

const CODEOWNERS = join('.github', 'CODEOWNERS');
// CODEOWNERS patterns use forward slashes regardless of the OS.
const ownerLine = `/seasons/${season}/members/${handle}/ @${handle}`;
if (existsSync(CODEOWNERS)) {
    const lines = readFileSync(CODEOWNERS, 'utf8').split('\n');
    const kept = lines.filter((line) => line.trim() !== ownerLine);
    if (kept.length !== lines.length) {
        writeFileSync(CODEOWNERS, kept.join('\n'));
    }
}

execFileSync('npm', ['install'], { stdio: 'inherit' });

console.log(
    `\nRemoved ${target}. Commit the deletion with package-lock.json and ${CODEOWNERS}.`,
);
