import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ViteDevServer, createServer as createViteServer } from 'vite';
import ReactDOMServer from 'react-dom/server';
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import fetch from 'cross-fetch';
global.fetch = fetch;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = 5173;

async function createServer() {
  const app = express();
  let vite: ViteDevServer;

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

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let indexHtmlPath: string,
        render: () => Promise<
          [
            ToolkitStore,
            (
              url: string,
              options: ReactDOMServer.RenderToPipeableStreamOptions
            ) => ReactDOMServer.PipeableStream
          ]
        >;

      if (!isProd) {
        indexHtmlPath = 'index.html';
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        indexHtmlPath = 'dist/client/index.html';
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render;
      }

      fs.readFile(path.resolve(__dirname, indexHtmlPath), 'utf8', async (error, data) => {
        if (error) {
          return res.status(500).send('Failed to load the app.');
        }
        const [store, handleRender] = await render();
        const template = !isProd ? await vite.transformIndexHtml(url, data) : data;
        const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
        const templateWithState = template.replace(
          '<!--preloadedState-->',
          `<script>window.__PRELOADED_STATE__=${preloadedState}</script>`
        );
        const [beginHTML, endHTML] = templateWithState.split('<!--ssr-outlet-->');

        const appStream = handleRender(url, {
          onAllReady: async () => {
            res.status(200).setHeader('content-type', 'text/html').write(beginHTML);
            appStream.pipe(res).end(endHTML);
          },
        });
      });
    } catch (error) {
      !isProd && vite.ssrFixStacktrace(error as Error);
      next(error as Error);
    }
  });

  return app;
}

createServer().then((app) => app.listen(PORT));
