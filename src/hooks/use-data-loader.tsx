import { useCallback, useEffect, useReducer, useRef } from 'react';

export enum Loading {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
}

interface LoadingAction {
  type: Loading;
  payload: Error | null;
}

interface LoadingState {
  loading: Loading;
  error: Error | null;
}

const loadingReducer = (state: LoadingState, action: LoadingAction) => {
  const { type, payload: error } = action;
  switch (type) {
    case Loading.PENDING:
      return { ...state, loading: Loading.PENDING, error };
    case Loading.SUCCESS:
      return { ...state, loading: Loading.SUCCESS, error };
    case Loading.ERROR:
      return { ...state, loading: Loading.ERROR, error };
    default:
      return state;
  }
};

const loadingDefault: LoadingState = {
  loading: Loading.IDLE,
  error: null,
};

export const useDataLoader = () => {
  const [loadingState, dispatch] = useReducer(loadingReducer, loadingDefault);
  const controller = useRef<AbortController | null>();

  const loadData = useCallback(
    async <T,>(
      fetchData: (abortSignal?: AbortSignal) => Promise<T>,
      callback: (data: T) => void
    ) => {
      controller.current = new AbortController();
      dispatch({ type: Loading.PENDING, payload: null });
      try {
        const data = await fetchData(controller.current.signal);
        callback(data);
        if (data === null) {
          throw new Error('No data found');
        }
        dispatch({ type: Loading.SUCCESS, payload: null });
      } catch (error) {
        if (!/abort/.test((error as Error).message)) {
          dispatch({ type: Loading.ERROR, payload: error as Error });
        }
      } finally {
        controller.current = null;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      dispatch({ type: Loading.IDLE, payload: null });
      controller.current?.abort();
    };
  }, []);

  return { loadingState, loadData };
};
