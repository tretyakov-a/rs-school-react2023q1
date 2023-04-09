import '@src/__mocks__/images-service-context-mock';
import mockImagesSearch from '@src/api/images/data/dummy-image-search.json';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import InfoModal from '.';
import { Loading } from '@src/hooks/use-data-loader/types';
import * as dataLoader from '@src/hooks/use-data-loader';
import * as react from 'react';
import * as helpers from '@common/helpers';

const mockHelpers = helpers as { loadImage: (url?: string) => Promise<unknown> };
const mockPhoto = mockImagesSearch.photos.photo[0];
const dataLoaderMock = dataLoader as { useDataLoader: () => void };
const reactMock = react as { useState: () => void };

jest.mock('@common/helpers', () => ({
  __esModule: true,
  loadImage: jest.fn(() => Promise.resolve({ width: 50, height: 100 })),
}));

jest.mock('react', () => ({
  __esModule: true,
  ...jest.requireActual('react'),
  useState: jest.fn(() => [{}, jest.fn()]),
}));

jest.mock('@components/CardFull', () => (props: { imageRatio: number }) => (
  <div data-testid="card-testid">ratio={props.imageRatio}</div>
));
jest.mock('@components/LoadingResult', () => ({ children }: React.PropsWithChildren) => (
  <div data-testid="loading-result-testid">{children}</div>
));

const loadDataMock = (data: { imgUrl: string } | null = { imgUrl: '' }) =>
  jest.fn((fetchData: () => void, setData: (setData: typeof data) => void) => {
    fetchData();
    setData(data);
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

const onCloseMock = jest.fn();
const renderInfoModal = () => {
  return render(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
};

describe('InfoModal test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Close button should work correctly', () => {
    setDataLoaderMock({ loading: Loading.PENDING, error: null });
    renderInfoModal();
    waitFor(() => {
      const closeButton = screen.getByRole('button') as HTMLButtonElement;
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  test('Should handle data load correctly', () => {
    const mockLoadData = loadDataMock();
    setDataLoaderMock({ loading: Loading.PENDING, error: null }, mockLoadData);

    const { rerender } = renderInfoModal();
    expect(mockLoadData).toHaveBeenCalledTimes(1);

    setDataLoaderMock({ loading: Loading.PENDING, error: null }, loadDataMock(null));
    reactMock.useState = jest.fn(() => [{}, jest.fn()]);
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    expect(reactMock.useState).toBeCalledWith(null);
  });

  test('Should calculate image ratio correctly', () => {
    setDataLoaderMock({ loading: Loading.SUCCESS, error: null });

    mockHelpers.loadImage = () => Promise.resolve({ width: 100, height: 50 });
    const { rerender } = renderInfoModal();
    waitFor(() => {
      expect(screen.getByText('ratio=0.5')).toBeInTheDocument();
    });

    mockHelpers.loadImage = () => Promise.resolve({ width: 50, height: 100 });
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    waitFor(() => {
      expect(screen.getByText('ratio=2')).toBeInTheDocument();
    });
  });

  test('Should calculate minWidthClass correctly', () => {
    setDataLoaderMock({ loading: Loading.SUCCESS, error: null });

    reactMock.useState = jest.fn(() => [{ imgUrl: '', imageRatio: 0.5 }, jest.fn()]);
    const { rerender, container } = renderInfoModal();
    expect(container.firstChild).toHaveClass('landscape');

    reactMock.useState = jest.fn(() => [{ imgUrl: '', imageRatio: 1.5 }, jest.fn()]);
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    expect(container.firstChild).toHaveClass('portrait');

    reactMock.useState = jest.fn(() => [null, jest.fn()]);
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    expect(container.firstChild).not.toHaveClass('portrait');
    expect(container.firstChild).not.toHaveClass('landscape');
  });

  test('Should render data correctly', () => {
    reactMock.useState = jest.fn(() => [{ imgUrl: '', imageRatio: 1 }, jest.fn()]);
    setDataLoaderMock({ loading: Loading.SUCCESS, error: null });
    const { rerender } = renderInfoModal();
    waitFor(() => {
      expect(screen.getByTestId('card-testid')).toBeInTheDocument();
    });

    reactMock.useState = jest.fn(() => [null, jest.fn()]);
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    waitFor(() => {
      expect(screen.getByText('No data loaded')).toBeInTheDocument();
    });
  });
});
