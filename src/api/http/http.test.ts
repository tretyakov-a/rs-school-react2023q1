import { fetchData } from '.';

const testData = 'test-data';
const responseInit = {
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
  json: () => Promise.resolve(testData),
};

global.fetch = jest.fn(() => Promise.resolve(responseInit as Response));

describe('Http module test', () => {
  test('fetchData() works correctly', async () => {
    const res = await fetchData('test-url', { id: 'test-id' });
    expect(res).toBe(testData);
  });

  test('fetchData() handle errors correctly', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ...responseInit, ok: false } as Response)
    );

    await expect(fetchData('test-url', { id: 'test-id' })).rejects.toThrow(
      'Loading error occured (code: 200)'
    );

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ...responseInit,
        headers: new Headers({
          'Content-Type': 'text/html',
        }),
      } as Response)
    );

    await expect(fetchData('test-url', { id: 'test-id' })).rejects.toThrow(
      'Invalid content-type in response'
    );
  });
});
