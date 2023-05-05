import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ViteDevServer, createServer as createViteServer } from 'vite';
import type { SSRRender } from './src/server-types';
import fetch from 'cross-fetch';
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
global.fetch = fetch;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5173;
const SSR_OUTLET = '<!--ssr-outlet-->';
const PRELOADED_STATE_OUTLET = '<!--preloaded-state-outlet-->';

const setPreloadedState = (store: ToolkitStore, template: string) => {
  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  return template.replace(
    PRELOADED_STATE_OUTLET,
    `<script>window.__PRELOADED_STATE__=${preloadedState}</script>`
  );
};

const getIndexHtml = async (isProd: boolean) => {
  const indexHtmlPath = path.resolve(__dirname, isProd ? 'dist/client/index.html' : 'index.html');
  return fs.readFile(indexHtmlPath, 'utf8');
};

const initServer = async (isProd: boolean): Promise<[typeof app, typeof vite]> => {
  const app = express();
  let vite: ViteDevServer | null = null;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(path.resolve(__dirname, 'dist/client'), {
        index: false,
      })
    );
  }
  return [app, vite];
};

async function createServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const [expressApp, vite] = await initServer(isProd);

  expressApp.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const render: SSRRender = (
        isProd
          ? // @ts-ignore
            await import('./dist/server/entry-server.js')
          : await vite!.ssrLoadModule('/src/entry-server.tsx')
      ).render;

      const html = await getIndexHtml(isProd);
      const [store, handleRender] = await render();
      const template = !isProd ? await vite!.transformIndexHtml(url, html) : html;
      const templateWithState = setPreloadedState(store, template);
      const [beginHTML, endHTML] = templateWithState.split(SSR_OUTLET);

      const appStream = handleRender(url, {
        onShellReady() {
          res.status(200).setHeader('content-type', 'text/html').write(beginHTML);
          appStream.pipe(res);
        },
        onAllReady() {
          res.end(endHTML);
        },
      });
    } catch (error) {
      !isProd && vite!.ssrFixStacktrace(error as Error);
      next(error as Error);
    }
  });

  return expressApp;
}

createServer().then((app) => app.listen(PORT));
