import FlickrService from './flickr-service';
import mockImageSearchResult from './data/dummy-image-search.json';
import mockImageInfoResult from './data/dummy-image-info.json';
import * as http from '../http';

const mockHttp = http as { fetchData: (url: string, init: object) => Promise<unknown> };
const mockFailResult = { stats: 'fail', message: 'test-error-message' };

jest.mock('../http', () => ({
  __esModule: true,
  fetchData: jest.fn(),
}));

const service = new FlickrService();

describe('Flickr service test', () => {
  test('findImages() test', async () => {
    mockHttp.fetchData = () => Promise.resolve(mockImageSearchResult);
    const data = await service.findImages({ text: 'test' });
    expect(data).toEqual(mockImageSearchResult.photos);

    expect(async () => {
      await service.findImages({ text: '' });
    }).rejects.toThrow('Search query is empty');
  });

  test('getImageInfo() test', async () => {
    mockHttp.fetchData = () => Promise.resolve(mockImageInfoResult);
    const data = await service.getImageInfo('test-id');
    expect(data).toEqual({
      ...mockImageInfoResult.photo,
      ownerIconUrl: 'http://farm3.staticflickr.com/2336/buddyicons/21692577@N02.jpg',
      imageUrl: 'https://live.staticflickr.com/5603/15317528089_b124ffd236_c.jpg',
    });

    expect(async () => {
      await service.getImageInfo('');
    }).rejects.toThrow('Image id is invalid');
  });

  test('getImageInfo() generate correct ownerIconUrl if iconserver = 0', async () => {
    const mockCopy = JSON.parse(JSON.stringify(mockImageInfoResult));
    mockCopy.photo.owner.iconserver = '0';
    mockHttp.fetchData = () => Promise.resolve(mockCopy);
    const data = await service.getImageInfo('test-id');
    expect(data.ownerIconUrl).toEqual('https://www.flickr.com/images/buddyicon.gif');
  });

  test('throws error if server responds with stats.fail', async () => {
    mockHttp.fetchData = () => Promise.resolve(mockFailResult);

    expect(async () => {
      await service.findImages({ text: 'test' });
    }).rejects.toThrow(mockFailResult.message);
  });
});
