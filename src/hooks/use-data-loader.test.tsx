import { render, waitFor, screen } from '@testing-library/react';
import { Loading, useDataLoader } from './use-data-loader';
import { useEffect } from 'react';

const mockFetchData =
  (error = false, data: object | null = {}) =>
  async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (error) reject(new Error('test-error'));
        resolve(data);
      }, 100);
    });
  };

const mockCallback = jest.fn();

const TestComponent = ({ fetchData }: { fetchData: () => Promise<unknown> }) => {
  const {
    loadingState: { loading, error },
    loadData,
  } = useDataLoader();
  useEffect(() => {
    loadData(fetchData, mockCallback);
  }, [loadData, fetchData]);
  return (
    <div>
      {loading === Loading.PENDING ? (
        <div data-testid="loader-test-id"></div>
      ) : error ? (
        <div data-testid="error-test-id">{error.message}</div>
      ) : (
        <div data-testid="data-test-id"></div>
      )}
    </div>
  );
};

describe('useDataLoader test', () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  test('Should work correctly with successful data fetch', async () => {
    render(<TestComponent fetchData={mockFetchData()} />);

    expect(screen.getByTestId('loader-test-id')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('data-test-id')).toBeInTheDocument();
    });
  });

  test('Should work correctly with erroneous data fetch', async () => {
    render(<TestComponent fetchData={mockFetchData(true)} />);

    expect(screen.getByTestId('loader-test-id')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('error-test-id')).toBeInTheDocument();
    });
  });

  test('Should work correctly with null data recived', async () => {
    render(<TestComponent fetchData={mockFetchData(false, null)} />);

    expect(screen.getByTestId('loader-test-id')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('error-test-id')).toHaveTextContent(/No data found/i);
    });
  });
});
