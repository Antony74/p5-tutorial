// Beware - this will divert your entire console here, which is a terrible thing to do,
// unless you have a single-minded focus on writing a programming tutorial!

import * as React from 'react';
import { flushSync } from 'react-dom';

const useConsole = () => {
  const [state, setStateUnflushed] = React.useState('');
  const setState = (newState) => flushSync(() => setStateUnflushed(newState));

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
