import '@src/__mocks__/page-wrap-mock';
import '@src/__mocks__/loader-mock';
import '@src/__mocks__/books-service-context-mock';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import Homepage from '.';
import { Loading } from '@src/hooks/use-data-loader';
import * as dataLoader from '@src/hooks/use-data-loader';

const dataLoaderMock = dataLoader as { Loading: object; useDataLoader: () => void };

const loadDataMock = jest.fn(async (fetchData: () => Promise<unknown>, setData: () => void) => {
  await fetchData();
  setData();
});

jest.mock('@src/hooks/use-data-loader', () => ({
  __esModule: true,
  Loading: { IDLE: 0, PENDING: 1, SUCCESS: 2, ERROR: 3 },
  useDataLoader: jest.fn(),
}));

const setDataLoaderMock = (state: { loading: Loading; error: Error | null }) => {
  dataLoaderMock.useDataLoader = jest.fn(() => ({
    loadingState: state,
    loadData: loadDataMock,
  }));
};

jest.mock('@components/SearchBar', () => ({ onSubmit }: { onSubmit: () => void }) => (
  <div data-testid="search-bar-testid">
    <button onClick={onSubmit}>Submit</button>
  </div>
));

jest.mock('@components/CardsList', () => () => <div data-testid="cards-list-testid" />);

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
    expect(loadDataMock).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByTestId('cards-list-testid')).toBeInTheDocument();
    });
  });

  test('Should render loader on PENDING state', () => {
    setDataLoaderMock({ loading: Loading.PENDING, error: null });
    render(<Homepage />);
    expect(screen.getByTestId('loader-testid')).toBeInTheDocument();
  });

  test('Should render error on ERROR state', () => {
    setDataLoaderMock({ loading: Loading.ERROR, error: new Error('test-error') });
    render(<Homepage />);
    expect(screen.getByText('test-error')).toBeInTheDocument();
  });
});
