import { useEffect, useRef, useState } from 'react';

const useStateWithRef = <T>(initialValue: T): [T, typeof setValue, typeof searchValueRef] => {
  const searchValueRef = useRef<T>();

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    searchValueRef.current = value;
  }, [value]);

  return [value, setValue, searchValueRef];
};

export default useStateWithRef;
