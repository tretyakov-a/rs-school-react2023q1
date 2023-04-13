import '@src/__mocks__/images-service-context-mock';
import React from 'react';
import CardsList from '.';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import mockImagesSearch from '@src/api/images/data/dummy-image-search.json';
import { ModalContext } from '@components/Modal/context';
import * as dataLoader from '@src/hooks/use-data-loader';
import * as helpers from '@common/helpers';
import { Loading } from '@src/hooks/use-data-loader/types';

const mockHelpers = helpers as { loadImage: (url?: string) => Promise<unknown> };
const dataLoaderMock = dataLoader as { useDataLoader: () => void };

jest.mock('@common/helpers', () => ({
  __esModule: true,
  loadImage: jest.fn(() => Promise.resolve({ width: 50, height: 100 })),
}));

const cardsDataMock = mockImagesSearch.photos.photo;
const mockOpenModal = jest.fn();
const mockSetModalState = jest.fn();

jest.mock('@components/Card', () => ({ onClick }: { onClick: () => void }) => (
  <div data-testid="card-testid" onClick={onClick}></div>
));

jest.mock('@components/CardFull', () => (props: { imageRatio: number }) => (
  <div data-testid="card-full-testid">ratio={props.imageRatio}</div>
));

jest.mock('@components/Modal/context', () => ({
  ModalContext: React.createContext(null),
}));

const loadDataMock = (data: { imgUrl: string } | null = { imgUrl: '' }) =>
  jest.fn(async (fetchData: () => void, setData: (setData: typeof data) => Promise<void>) => {
    fetchData();
    await setData(data);
  });

jest.mock('@src/hooks/use-data-loader', () => ({
  __esModule: true,
  useDataLoader: jest.fn(),
}));

const setDataLoaderMock = (
  state: { loading: Loading; error: Error | null },
  loadData = loadDataMock()
) => {
  dataLoaderMock.useDataLoader = jest.fn(() => ({
    loadingState: state,
    loadData,
  }));
};

const TestComponent = (modalState: { isOpen: boolean } = { isOpen: false }) => (
  <ModalContext.Provider
    value={{
      setModalState: mockSetModalState,
      openModal: mockOpenModal,
      modal: modalState,
    }}
  >
    <CardsList data={cardsDataMock} />
  </ModalContext.Provider>
);

describe('<CardsList /> test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render correctly', () => {
    setDataLoaderMock({ loading: Loading.PENDING, error: null });
    render(TestComponent());

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(cardsDataMock.length);

    const cards = screen.getAllByTestId('card-testid');
    expect(cards.length).toBe(cardsDataMock.length);
  });

  test('Should handle card click correctly', () => {
    setDataLoaderMock({ loading: Loading.PENDING, error: null });
    render(TestComponent());

    fireEvent.click(screen.getAllByTestId('card-testid')[0]);
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Should correctly handle data load', async () => {
    setDataLoaderMock({ loading: Loading.PENDING, error: null }, loadDataMock(null));
    const { rerender } = render(TestComponent());
    fireEvent.click(screen.getAllByTestId('card-testid')[0]);
    expect(mockSetModalState).toBeCalledWith({ content: 'No data loaded' });

    mockSetModalState.mockClear();
    mockHelpers.loadImage = jest.fn(() => Promise.resolve({ width: 50, height: 100 }));
    setDataLoaderMock(
      { loading: Loading.PENDING, error: null },
      loadDataMock({ imgUrl: 'test-url' })
    );
    rerender(TestComponent());

    fireEvent.click(screen.getAllByTestId('card-testid')[0]);

    expect(mockHelpers.loadImage).toBeCalled();
    await waitFor(() => {
      expect(mockSetModalState).toBeCalledWith({ imageRatio: 2, content: expect.any(Object) });
    });
  });

  test('Should change opened modal state in useEffect', async () => {
    const mockLoadingState = { loading: Loading.IDLE, error: null };
    setDataLoaderMock(mockLoadingState);

    render(TestComponent({ isOpen: true }));
    await waitFor(() => {
      expect(mockSetModalState).toBeCalledWith({ loadingState: mockLoadingState });
    });
  });
});
