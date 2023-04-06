import { useCallback, useEffect, useReducer, useRef } from 'react';
import { Loading, LoadingAction, LoadingState } from './types';

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
        dispatch({ type: Loading.SUCCESS, payload: null });
      } catch (error) {
        if (error instanceof Error && !/abort/.test(error.message)) {
          dispatch({ type: Loading.ERROR, payload: error });
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
