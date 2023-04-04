export enum Loading {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
}

export interface LoadingAction {
  type: Loading;
  payload: Error | null;
}

export interface LoadingState {
  loading: Loading;
  error: Error | null;
}
