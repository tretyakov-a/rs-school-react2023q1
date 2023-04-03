import { useCallback } from 'react';

const useLocalStorage = (key: string): [typeof set, typeof get] => {
  const set = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
    },
    [key]
  );

  const get = () => {
    return localStorage.getItem(key) || '';
  };

  return [set, get];
};

export default useLocalStorage;
