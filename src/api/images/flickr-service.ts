import {
  SearchQueryParams,
  ImagesService,
  ImagesSearchResponse,
  ImageInfoResponse,
  FlickrResponse,
  Owner,
} from './types';
import { QueryParams, fetchData } from '../http';
import { PhotoInfo } from '@src/api/images/types';

const baseUrl = 'https://api.flickr.com/services/rest/';
const imageBaseUrl = 'https://live.staticflickr.com/';

const baseQueryParams: SearchQueryParams = {
  api_key: 'd96e8119140ade98718a9e4d927fbb61',
  format: 'json',
  nojsoncallback: '?',
};

const searchQueryParams: SearchQueryParams = {
  ...baseQueryParams,
  page: 1,
  per_page: 10,
  extras: 'url_q,url_h,views,owner_name',
  sort: 'relevance',
  privacy_filter: 1, // public only
};

class FlickrService implements ImagesService {
  private sendRequest = async <T extends FlickrResponse>(
    queryParams: QueryParams,
    abortSignal?: AbortSignal
  ) => {
    const data: T = await fetchData(baseUrl, queryParams, { signal: abortSignal });

    if (data.stats === 'fail') throw new Error(data.message);
    return data;
  };

  private getImageUrl = (photo: PhotoInfo, suffix = 'c') => {
    const { id, secret, server } = photo;
    return `${imageBaseUrl}${server}/${id}_${secret}_${suffix}.jpg`;
  };

  private getOwnerIconUrl = (owner: Owner) => {
    const { iconserver, iconfarm, nsid } = owner;
    if (Number(iconserver) > 0) {
      return `http://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`;
    }
    return 'https://www.flickr.com/images/buddyicon.gif';
  };

  findImages = async (queryParams: SearchQueryParams, abortSignal?: AbortSignal) => {
    if (queryParams.text === '') throw new Error('Search query is empty');
    const data = await this.sendRequest<ImagesSearchResponse>(
      { method: 'flickr.photos.search', ...searchQueryParams, ...queryParams },
      abortSignal
    );
    return data.photos;
  };

  getImageInfo = async (id: string, abortSignal?: AbortSignal) => {
    if (id === '') throw new Error('Image id is invalid');
    const data = await this.sendRequest<ImageInfoResponse>(
      { method: 'flickr.photos.getInfo', ...baseQueryParams, photo_id: id },
      abortSignal
    );
    console.log(data);
    return {
      ...data.photo,
      imageUrl: this.getImageUrl(data.photo),
      ownerIconUrl: this.getOwnerIconUrl(data.photo.owner),
    };
  };
}

export default FlickrService;
