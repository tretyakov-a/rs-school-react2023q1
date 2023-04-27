import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export type SSRRender = () => Promise<
  [
    ToolkitStore,
    (
      url: string,
      options: ReactDOMServer.RenderToPipeableStreamOptions
    ) => ReactDOMServer.PipeableStream
  ]
>;
