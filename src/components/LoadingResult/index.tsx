import Loader from '@components/Loader';
import { Loading, LoadingState } from '@src/hooks/use-data-loader/types';
import React from 'react';

interface LoadingResultProps extends React.PropsWithChildren {
  loadingState: LoadingState;
}

const LoadingResult = (props: LoadingResultProps) => {
  const {
    loadingState: { loading, error },
    children,
  } = props;

  const renderError = (error: Error) => {
    return <div>{error.message}</div>;
  };

  return <>{loading === Loading.PENDING ? <Loader /> : error ? renderError(error) : children}</>;
};

export default LoadingResult;
