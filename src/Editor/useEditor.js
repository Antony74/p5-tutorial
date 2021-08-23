import * as React from 'react';

const useEditor = (key, defaultValue) => {
  const [state, setState] = React.useState(
    localStorage.getItem(key) ?? defaultValue
  );

  const hook = {
    state,
    set: (value) => {
      setState(value);
      localStorage.setItem(key, value);
    },
    discard: () => hook.set(defaultValue),
  };

  return hook;
};

export default useEditor;
