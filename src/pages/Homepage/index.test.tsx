import React from 'react';
import '@src/__mocks__/page-wrap-mock';
import '@src/__mocks__/images-service-context-mock';
import { screen, render, fireEvent } from '@testing-library/react';
import Homepage from '.';
import { Loading } from '@common/types/loading';
import * as reactRedux from 'react-redux';
import { findImages as mockFindImages } from './store';

const mockReactRedux = reactRedux as {
  useSelector: (fn: () => void) => void;
  useDispatch: () => void;
};

jest.mock('./store', () => ({
  findImages: jest.fn(() => 'test-image-action'),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn((fn) => {
    return fn({
      imagesList: {
        data: ['test'],
        loading: Loading.SUCCESS,
        error: null,
      },
      search: { value: 'test-value' },
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
    expect(screen.getByTestId('cards-list-testid')).toBeInTheDocument();

    mockReactRedux.useSelector = () => ({ data: null });
    rerender(<Homepage />);
    expect(screen.getByText('Try to find some images using search form')).toBeInTheDocument();

    mockReactRedux.useSelector = () => ({ data: [] });
    rerender(<Homepage />);
    expect(screen.getByText('Try to find some images using search form')).toBeInTheDocument();
  });

  test('Should call dispatch on submit ', async () => {
    mockReactRedux.useSelector = () => ({ data: null, loading: Loading.IDLE, error: null });
    render(<Homepage />);

    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);
    expect(mockFindImages).toBeCalled();
    expect(mockDispatch).toBeCalledWith('test-image-action');
  });

  test('Should call dispatch on mount', async () => {
    render(<Homepage />);
    expect(mockFindImages).toBeCalled();
    expect(mockDispatch).toBeCalledWith('test-image-action');
  });
});
