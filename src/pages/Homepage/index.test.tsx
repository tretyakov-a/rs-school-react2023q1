import React from 'react';
import '@src/__mocks__/page-wrap-mock';
import '@src/__mocks__/books-service-context-mock';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import Homepage from '.';
import { Loading } from '@src/hooks/use-data-loader/types';
import * as dataLoader from '@src/hooks/use-data-loader';
import * as useLocalStorage from '@src/hooks/use-local-storage';

const dataLoaderMock = dataLoader as { useDataLoader: () => void };
const mockUseLocalStorage = useLocalStorage as {
  default: () => [(value: string) => void, () => string];
};

const setStorageValueMock = jest.fn();
jest.mock('@src/hooks/use-local-storage', () => ({
  __esModule: true,
  default: () => [setStorageValueMock, () => ''],
}));

const loadDataMock = jest.fn(
  async (fetchData: () => Promise<unknown>, setData: (data: unknown[]) => void) => {
    await fetchData();
    setData([]);
  }
);

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
  test('Should render correctly', () => {
    setDataLoaderMock({ loading: Loading.IDLE, error: null });
    render(<Homepage />);

    expect(screen.getByTestId('search-bar-testid')).toBeInTheDocument();
    expect(screen.getByTestId('page-wrap-testid')).toBeInTheDocument();
    expect(screen.getByText('Try to find some books using search form')).toBeInTheDocument();
  });

  test('Should call loadData on submit ', async () => {
    setDataLoaderMock({ loading: Loading.IDLE, error: null });
    render(<Homepage />);

    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);
    expect(loadDataMock).toBeCalled();
    expect(setStorageValueMock).toBeCalled();
    await waitFor(() => {
      expect(screen.getByTestId('cards-list-testid')).toBeInTheDocument();
    });
  });

  test('Should call loadData on mount, if storage has saved search value ', async () => {
    const testStoredValue = 'test-stored-value';
    setDataLoaderMock({ loading: Loading.IDLE, error: null });
    mockUseLocalStorage.default = () => [setStorageValueMock, () => testStoredValue];

    render(<Homepage />);
    expect(loadDataMock).toBeCalled();
    await waitFor(() => {
      expect(screen.getByTestId('cards-list-testid')).toBeInTheDocument();
    });
  });
});
