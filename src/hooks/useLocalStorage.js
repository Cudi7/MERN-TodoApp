import { useState } from 'react';

const useLocalStorage = (name, initialVal = []) => {
  const [value, setValue] = useState(() => {
    let val;
    try {
      val = window.localStorage.getItem(name)
        ? JSON.parse(window.localStorage.getItem(name))
        : [];

      return val;
    } catch (error) {
      val = initialVal;
      return val;
    }
  });
  const handleValue = (val) => {
    window.localStorage.setItem(name, JSON.stringify(val));
    setValue(val);
  };

  return [value, handleValue];
};

export default useLocalStorage;
