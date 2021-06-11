import { useState } from 'react';

function useInputState(initialVal) {
  const [value, setValue] = useState(initialVal);

  const handleValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value || e.target.checked });
  };

  const reset = () => {
    setValue('');
  };
  return [value, handleValue, reset];
}

export default useInputState;
