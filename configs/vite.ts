import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, normalizePath, type Plugin } from 'vite';

const GALLERY_PATH = '/playwright/gallery/index.html';
// normalizePath + leading-slash strip: on Windows fileURLToPath gives
// `C:\...\main.tsx`, which must become `/@fs/C:/.../main.tsx`.
const galleryEntry = normalizePath(
    fileURLToPath(new URL('./gallery/main.tsx', import.meta.url)),
).replace(/^\//, '');

// Serves the integration-testing gallery from the member's dev server without
// the member owning any file for it. Dev-only: `vite build` never sees it.
function playwrightGallery(): Plugin {
    const html = `<!doctype html>
<html lang="en" data-color-mode="light" data-light-theme="light" data-dark-theme="dark">
  <head><meta charset="UTF-8" /><title>Story gallery</title></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/@fs/${encodeURI(galleryEntry)}"></script>
  </body>
</html>`;

    return {
        name: 'withnik:playwright-gallery',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const path = req.url?.split('?')[0];
                if (path !== GALLERY_PATH && path !== '/playwright/gallery/')
                    return next();
                res.setHeader('Content-Type', 'text/html');
                res.end(await server.transformIndexHtml(req.url!, html));
            });
        },
    };
}

export default defineConfig({
    plugins: [react(), tailwindcss(), playwrightGallery()],
    server: {
        port: 5173,
        // Fail loudly instead of drifting to 5174 — Playwright's webServer
        // waits on 5173 and would otherwise test someone else's running app.
        strictPort: true,
    },
});
