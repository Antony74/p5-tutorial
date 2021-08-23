import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

import useConsole from './useConsole';
import useEditor from './useEditor';

const Editor = () => {
  const codeHook = useEditor('test', "console.log('Hello world');");
  const consoleHook = useConsole();

  const Console = () => {
    if (consoleHook.state.length) {
      return (
        <CodeMirror
          options={{ theme: 'material' }}
          value={consoleHook.state}
        ></CodeMirror>
      );
    } else {
      return <></>;
    }
  };

  const onRun = () => {
    consoleHook.clear();
    eval(`runUserCode = () => {${codeHook.state}}`);
    // eslint-disable-next-line no-undef
    runUserCode();
  };

  return (
    <div>
      <CodeMirror
        options={{ mode: 'javascript', theme: 'material', lineNumbers: true }}
        value={codeHook.state}
        onBeforeChange={(_editor, _data, value) => {
          codeHook.set(value);
        }}
      ></CodeMirror>
      <button onClick={onRun}>Run</button>
      <button onClick={codeHook.discard}>Discard</button>
      <Console />
    </div>
  );
};

export default Editor;
