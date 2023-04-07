type FlickrSort =
  | 'relevance'
  | 'date-posted-asc'
  | 'date-posted-desc'
  | 'date-taken-asc'
  | 'date-taken-desc'
  | 'interestingness-asc'
  | 'interestingness-desc';

export type SearchQueryParams = {
  method?: string;
  api_key?: string;
  page?: number;
  per_page?: number;
  format?: string;
  nojsoncallback?: string;
  extras?: string;
  text?: string;
  sort?: FlickrSort;
  privacy_filter?: number;
  photo_id?: string;
};

export type FlickrResponse = {
  stats: 'fail' | 'ok';
  code?: number;
  message?: string;
};

type PhotoBase = {
  id: string;
  secret: string;
  server: string;
};

export type Photo = PhotoBase & {
  owner: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  url_q?: string;
  height_q?: number;
  width_q?: number;
  url_c?: string;
  height_c?: number;
  width_c?: number;
  ownername: string;
  views: string;
};

export type Photos = {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
};

export type ImagesSearchResponse = FlickrResponse & {
  photos: Photos;
};

export type Owner = {
  nsid: string;
  username: string;
  realname: string;
  location: string;
  iconserver: string;
  iconfarm: number;
  path_alias: string;
};

type ContentProp = {
  _content: string;
};

export type Tag = ContentProp & {
  raw: string;
};

export type PhotoInfo = PhotoBase & {
  owner: Owner;
  title: ContentProp;
  description: ContentProp;
  comments: ContentProp;
  originalformat: string;
  imageUrl: string;
  ownerIconUrl: string;
  dates: {
    posted: string;
    taken: string;
    lastupdate: string;
  };
  views: string;
  tags: {
    tag: Tag[];
  };
};

export type ImageInfoResponse = FlickrResponse & {
  photo: PhotoInfo;
};

export interface ImagesService {
  findImages: (queryParams: SearchQueryParams, abortSignal?: AbortSignal) => Promise<Photos | null>;
  getImageInfo: (id: string, abortSignal?: AbortSignal) => Promise<PhotoInfo | null>;
}
