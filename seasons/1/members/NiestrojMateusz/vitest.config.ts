import { defineConfig, mergeConfig } from 'vitest/config';
import shared from '@withnik/configs/vitest';

// Unit tests sit next to the module they test. The shared config only looks
// in __tests__/, so add src/ — the merge keeps its glob and appends ours.
export default mergeConfig(
    shared,
    defineConfig({
        test: { include: ['src/**/*.test.ts'] },
    }),
);
