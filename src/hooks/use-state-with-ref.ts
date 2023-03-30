import { useEffect, useRef, useState } from 'react';
import useLocalStorage from './use-local-storage';

const useStateWithRef = (storageKey: string): [string, typeof setValue, typeof searchValueRef] => {
  const searchValueRef = useRef<string>();
  const [storageSet, storageGet] = useLocalStorage(storageKey);
  const [value, setValue] = useState<string>(storageGet());

  useEffect(() => {
    const valueRef = searchValueRef.current; // this fixes eslint warning
    return () => {
      storageSet(valueRef || '');
    };
  }, [searchValueRef, storageSet]);

  useEffect(() => {
    searchValueRef.current = value;
  }, [value]);

  return [value, setValue, searchValueRef];
};

export default useStateWithRef;
