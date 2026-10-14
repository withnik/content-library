import { Heading } from '@primer/react';

// Primer builds the UI; Tailwind only spaces it out. Utilities cannot reach
// inside a Primer component's own styles — that is deliberate.
export function App() {
    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
        </main>
    );
}
