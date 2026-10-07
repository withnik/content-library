import { Heading, Link } from '@primer/react';
import { ContentLibrary } from '../content/useCases/viewContents/ContentLibrary';
import { ArrowLeftIcon } from '@primer/octicons-react';

// Primer builds the UI; Tailwind only spaces it out. Utilities cannot reach
// inside a Primer component's own styles — that is deliberate.
export function App() {
    return (
        <main className="flex flex-col gap-4 p-6">
            <header className="grid grid-cols-[1fr_auto_1fr] items-center rounded-md bg-(--bgColor-emphasis) px-4 py-3 text-white [--fgColor-accent:var(--fgColor-onEmphasis)] [--fgColor-default:var(--fgColor-onEmphasis)]">
                <Link
                    href="/"
                    className="flex items-center gap-1 justify-self-start"
                >
                    <ArrowLeftIcon />
                    Back
                </Link>
                <Heading as="h1" variant="medium">
                    Content Library
                </Heading>
                <span aria-hidden="true" />
            </header>
            <ContentLibrary />
        </main>
    );
}
