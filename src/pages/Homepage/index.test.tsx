import React from 'react';
import '@src/__mocks__/page-wrap-mock';
import '@src/__mocks__/images-service-context-mock';
import { screen, render } from '@testing-library/react';
import Homepage from '.';
import { Loading } from '@common/types/loading';
import * as reactRedux from 'react-redux';
import { findImages as mockFindImages } from './store';

const mockReactRedux = reactRedux as {
  useSelector: (fn: (state: unknown) => void) => void;
  useDispatch: () => void;
};

jest.mock('./store', () => ({
  findImages: jest.fn(() => 'test-image-action'),
}));

const mockDispatch = jest.fn();
const mockImagesList = {
  data: ['test'],
  loading: Loading.SUCCESS,
  error: null,
};
jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn((fn) => {
    return fn({
      imagesList: mockImagesList,
      search: { value: '' },
    });
  }),
}));

jest.mock('./SearchBar', () => ({ onSubmit }: { onSubmit: () => void }) => (
  <div data-testid="search-bar-testid">
    <button onClick={onSubmit}>Submit</button>
  </div>
));
jest.mock('@components/LoadingResult', () => ({ children }: React.PropsWithChildren) => (
  <div data-testid="loading-result-testid">{children}</div>
));
jest.mock('./CardsList', () => () => <div data-testid="cards-list-testid" />);

describe('<Homepage /> test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render correctly', async () => {
    const { rerender } = render(<Homepage />);
    expect(screen.getByTestId('search-bar-testid')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
    expect(screen.getByTestId('loading-result-testid')).toBeInTheDocument();
    expect(screen.getByTestId('cards-list-testid')).toBeInTheDocument();

    mockReactRedux.useSelector = (fn) =>
      fn({
        imagesList: { ...mockImagesList, data: null },
        search: { value: '' },
      });
    rerender(<Homepage />);
    expect(screen.getByText('Try to find some images using search form')).toBeInTheDocument();

    mockReactRedux.useSelector = (fn) =>
      fn({
        imagesList: { ...mockImagesList, data: [] },
        search: { value: '' },
      });
    rerender(<Homepage />);
    expect(screen.getByText('Try to find some images using search form')).toBeInTheDocument();
  });

  test('Should load data depends on searchValue', async () => {
    mockReactRedux.useSelector = (fn) =>
      fn({
        imagesList: mockImagesList,
        search: { value: '' },
      });
    const { rerender } = render(<Homepage />);
    expect(mockFindImages).toBeCalledWith('nature');
    expect(mockDispatch).toBeCalledWith('test-image-action');

    jest.clearAllMocks();
    mockReactRedux.useSelector = (fn) =>
      fn({
        imagesList: mockImagesList,
        search: { value: 'test-value' },
      });
    rerender(<Homepage />);
    expect(mockFindImages).toBeCalledWith('test-value');
    expect(mockDispatch).toBeCalledWith('test-image-action');
  });
});
