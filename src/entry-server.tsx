import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '@components/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import FlickrService from './api/images/flickr-service';
import { setCurrentSearchValue, setImages } from './pages/Homepage/store';

export async function render(): Promise<
  [
    ToolkitStore,
    (
      url: string,
      options: ReactDOMServer.RenderToPipeableStreamOptions
    ) => ReactDOMServer.PipeableStream
  ]
> {
  const text = 'nature';
  const images = await new FlickrService().findImages({ text });
  store.dispatch(setImages(images.photo));
  store.dispatch(setCurrentSearchValue(text));

  return [
    store,
    (url: string, options: ReactDOMServer.RenderToPipeableStreamOptions) =>
      ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={url}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>,
        options
      ),
  ];
}
