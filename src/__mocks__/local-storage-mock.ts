export const store: Record<string, string> = {};

global.Storage.prototype.setItem = jest.fn((key, value) => {
  store[key] = value;
});
global.Storage.prototype.getItem = jest.fn((key) => store[key]);
global.Storage.prototype.removeItem = jest.fn((key) => delete store[key]);
