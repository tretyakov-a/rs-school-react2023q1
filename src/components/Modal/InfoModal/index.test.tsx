import '@src/__mocks__/images-service-context-mock';
import mockImagesSearch from '@src/api/images/data/dummy-image-search.json';
import { screen, render, fireEvent } from '@testing-library/react';
import InfoModal from '.';
import { Loading } from '@src/hooks/use-data-loader/types';
import * as dataLoader from '@src/hooks/use-data-loader';
import * as react from 'react';

const mockPhoto = mockImagesSearch.photos.photo[0];
const dataLoaderMock = dataLoader as { useDataLoader: () => void };
const reactMock = react as { useState: () => void };

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

const loadDataMock = jest.fn((fetchData: () => void, setData: () => void) => {
  fetchData();
  setData();
});

jest.mock('@src/hooks/use-data-loader', () => ({
  __esModule: true,
  useDataLoader: jest.fn(),
}));

const setDataLoaderMock = (state: { loading: Loading; error: Error | null }) => {
  dataLoaderMock.useDataLoader = jest.fn(() => ({
    loadingState: state,
    loadData: loadDataMock,
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

    const closeButton = screen.getByRole('button') as HTMLButtonElement;
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('Should call loadData() after mount', () => {
    setDataLoaderMock({ loading: Loading.PENDING, error: null });
    renderInfoModal();
    expect(loadDataMock).toHaveBeenCalledTimes(1);
  });

  test('Should calculate image ratio correctly', () => {
    setDataLoaderMock({ loading: Loading.SUCCESS, error: null });
    const { rerender, container } = renderInfoModal();
    expect(screen.getByText('ratio=1')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('landscape');

    mockPhoto.height_c = 800;
    mockPhoto.width_c = 400;
    const r = rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    expect(screen.getByText('ratio=2')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('portrait');

    mockPhoto.height_c = NaN;
    mockPhoto.width_c = NaN;
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);
    expect(screen.getByText('ratio=1')).toBeInTheDocument();
  });

  test('Should render data correctly', () => {
    setDataLoaderMock({ loading: Loading.SUCCESS, error: null });
    const { rerender } = renderInfoModal();

    expect(screen.getByTestId('card-testid')).toBeInTheDocument();

    reactMock.useState = jest.fn(() => [null, jest.fn()]);
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} photo={mockPhoto} />);

    expect(screen.getByText('No data loaded')).toBeInTheDocument();
  });
});
