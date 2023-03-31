import { useEffect, useState } from 'react';

const useDataLoader = (isLoadingInitial: boolean = true) => {
  const [isLoading, setIsLoading] = useState(isLoadingInitial);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const loadData = async <T,>(request: Promise<T>, callback: (data: T) => void) => {
    setIsLoading(true);
    setLoadingError(null);
    try {
      const data = await request;
      if (data !== null) {
        callback(data);
        setIsLoading(false);
      }
    } catch (error) {
      if (!/abort/.test((error as Error).message)) setLoadingError(error as Error);
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(isLoadingInitial);
      setLoadingError(null);
    };
  }, []);

  return { isLoading, loadingError, loadData };
};

export default useDataLoader;
