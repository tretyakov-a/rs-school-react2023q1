const dataBase64 = `/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUA
AAABAAAARgEoAAMAAAABAAIAAAExAAIAAAAQAAAATgAAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQu
bmV0IDUuMC4yAP/bAEMACgcHCAcGCggICAsKCgsOGBAODQ0OHRUWERgjHyUkIh8iISYrNy8mKTQp
ISIwQTE0OTs+Pj4lLkRJQzxINz0+O//bAEMBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7
Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAAEAAQMBEgACEQEDEQH/xAAf
AAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEF
EiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJ
SlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3
uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEB
AAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIy
gQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNk
ZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfI
ycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APZqKAP/2Q==`;
const arrayBuffer = Uint8Array.from(window.atob(dataBase64), (c) => c.charCodeAt(0));
const textFileMock = new File([arrayBuffer], 'testfile.jpg', { type: 'text/txt' });
const imageFileMock = new File([arrayBuffer], 'testfile.jpg', { type: 'image/jpg' });

const getFileListMock = (type = 'image') => {
  const fileList: FileList = {
    0: type === 'image' ? imageFileMock : textFileMock,
    length: 1,
    item: (index: number) => fileList[index],

    *[Symbol.iterator]() {
      for (const i of this) {
        yield i;
      }
    },
  };
  Object.setPrototypeOf(fileList, FileList.prototype);
  return fileList;
};

const getEmptyFileListMock = () => {
  const fileList: FileList = {
    length: 0,
    item: (index: number) => fileList[index],

    *[Symbol.iterator]() {
      for (const i of this) {
        yield i;
      }
    },
  };
  Object.setPrototypeOf(fileList, FileList.prototype);
  return fileList;
};

export { textFileMock, imageFileMock, getFileListMock, getEmptyFileListMock };
