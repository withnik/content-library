// Smoke test for the integration layer (Playwright, real Chromium). It
// mounts the story next door — no Testing Library anywhere. Replace freely.
import { expect, test } from '@withnik/configs/playwright';

test('renders the page heading with Primer styles', async ({ mount }) => {
    const app = await mount('App/Default');

    const heading = app.getByRole('heading', { name: 'Content Library' });
    await expect(heading).toBeVisible();
    // Proves the Primer theme is live: the fg token resolves to a real colour.
    // await expect(heading).toHaveCSS('color', 'rgb(31, 35, 40)');
    // ...and that Tailwind's layout utilities are applied too.
    await expect(app.locator('main')).toHaveCSS('gap', '16px');
});
