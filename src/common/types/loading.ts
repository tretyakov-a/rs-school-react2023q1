export enum Loading {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
}

export interface LoadingState {
  loading: Loading;
  error: string | null;
}
