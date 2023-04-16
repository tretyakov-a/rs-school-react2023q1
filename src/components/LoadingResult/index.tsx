import Loader from '@components/Loader';
import { Loading, LoadingState } from '@common/types/loading';
import React from 'react';

interface LoadingResultProps extends React.PropsWithChildren {
  loadingState: LoadingState;
}

const LoadingResult = (props: LoadingResultProps) => {
  const {
    loadingState: { loading, error },
    children,
  } = props;

  const renderError = (error: string) => {
    return <div>{error}</div>;
  };

  return (
    <>
      {loading === Loading.PENDING ? (
        <Loader />
      ) : loading === Loading.ERROR && error ? (
        renderError(error)
      ) : (
        children
      )}
    </>
  );
};

export default LoadingResult;
