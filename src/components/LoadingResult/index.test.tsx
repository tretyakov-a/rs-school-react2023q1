import '@src/__mocks__/loader-mock';
import { screen, render } from '@testing-library/react';
import LoadingResult from '.';
import { Loading } from '@common/types/loading';

jest.mock('@components/RssLogo', () => () => <div data-testid="rsslogo-testid"></div>);

describe('<LoadingResult /> test', () => {
  test('Should render correctly on PENDING state', () => {
    render(
      <LoadingResult loadingState={{ loading: Loading.PENDING, error: null }}></LoadingResult>
    );
    expect(screen.getByTestId('loader-testid')).toBeInTheDocument();
  });

  test('Should render error on ERROR state', () => {
    render(
      <LoadingResult loadingState={{ loading: Loading.ERROR, error: 'test-error' }}></LoadingResult>
    );
    expect(screen.getByText('test-error')).toBeInTheDocument();
  });

  test('Should render error on SUCCESS state', () => {
    render(
      <LoadingResult loadingState={{ loading: Loading.SUCCESS, error: null }}>
        <div data-testid="test-data"></div>
      </LoadingResult>
    );
    expect(screen.getByTestId('test-data')).toBeInTheDocument();
  });
});
