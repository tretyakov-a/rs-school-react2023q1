import '@src/__mocks__/books-service-context-mock';
import { screen, render, fireEvent } from '@testing-library/react';
import InfoModal from '.';
import { Loading } from '@src/hooks/use-data-loader/types';
import * as dataLoader from '@src/hooks/use-data-loader';
import * as react from 'react';

const dataLoaderMock = dataLoader as { useDataLoader: () => void };
const reactMock = react as { useState: () => void };

jest.mock('react', () => ({
  __esModule: true,
  ...jest.requireActual('react'),
  useState: jest.fn(() => [{}, jest.fn()]),
}));

jest.mock('@components/Card', () => () => <div data-testid="card-testid"></div>);
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
  return render(<InfoModal onClose={onCloseMock} isOpen={true} id={'test-id'} />);
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

  test('Should render data correctly', () => {
    setDataLoaderMock({ loading: Loading.SUCCESS, error: null });
    const { rerender } = renderInfoModal();

    expect(screen.getByTestId('card-testid')).toBeInTheDocument();

    reactMock.useState = jest.fn(() => [null, jest.fn()]);
    rerender(<InfoModal onClose={onCloseMock} isOpen={true} id={'test-id'} />);

    expect(screen.getByText('No data loaded')).toBeInTheDocument();
  });
});
