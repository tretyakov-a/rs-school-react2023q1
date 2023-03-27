const useLocalStorage = (key: string): [typeof set, typeof get] => {
  const set = (value: string) => {
    localStorage.setItem(key, value);
  };

  const get = () => {
    return localStorage.getItem(key) || '';
  };

  return [set, get];
};

export default useLocalStorage;
