import { useCallback, useEffect, useReducer, useState } from 'react';

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

  const loadData = useCallback(async <T,>(request: Promise<T>, callback: (data: T) => void) => {
    dispatch({ type: Loading.PENDING, payload: null });
    try {
      const data = await request;
      callback(data);
      if (data === null) {
        throw new Error('No data found');
      }
      dispatch({ type: Loading.SUCCESS, payload: null });
    } catch (error) {
      if (!/abort/.test((error as Error).message)) {
        dispatch({ type: Loading.ERROR, payload: error as Error });
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: Loading.IDLE, payload: null });
    };
  }, []);

  return { loadingState, loadData };
};
