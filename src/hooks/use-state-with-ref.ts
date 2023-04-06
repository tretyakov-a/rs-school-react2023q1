import { useEffect, useRef, useState } from 'react';
import useLocalStorage from './use-local-storage';

const useStateWithRef = (storageKey: string): [string, typeof setValue, typeof storageSet] => {
  const searchValueRef = useRef<string>();
  const [storageSet, storageGet] = useLocalStorage(storageKey);
  const [value, setValue] = useState<string>(storageGet());

  useEffect(() => {
    return () => {
      const { current } = searchValueRef;
      if (current) storageSet(current);
    };
  }, [storageSet]);

  useEffect(() => {
    searchValueRef.current = value;
  }, [value]);

  return [value, setValue, storageSet];
};

export default useStateWithRef;
