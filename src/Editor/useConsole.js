// Beware - this will divert your entire console here, which is a terrible thing to do,
// unless you have a single-minded focus on writing a programming tutorial!

import * as React from 'react';

const useConsole = () => {
  const [state, setState] = React.useState('');

  const log = (...params) => {
    const newState = state + '\n' + params.join(', ');
    setState(newState.trim());
  };

  console.log = log;
  console.warn = log;
  console.info = log;
  console.error = log;

  return { state, clear: () => setState('') };
};

export default useConsole;
