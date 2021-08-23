import * as React from 'react';
import { Controlled } from 'react-codemirror2';
import 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import useConsole from './useConsole';
import { flushSync } from 'react-dom';

const useGetSet = (initialValue) => {
  const [state, setState] = React.useState(initialValue);
  return { state, set: (value) => setState(value) };
};

const CodeMirror = (props) => (
  <Controlled
    {...props}
    value={props.hook.state}
    onBeforeChange={(_editor, _data, value) => {
      props.hook.set(value);
    }}
  ></Controlled>
);

const Editor = () => {
  const editorHook = useGetSet("console.log('Hello world');");
  const consoleHook = useConsole();

  const Code = () => (
    <CodeMirror
      options={{ mode: 'javascript', theme: 'material', lineNumbers: true }}
      hook={editorHook}
    ></CodeMirror>
  );

  const Console = () => {
    if (consoleHook.state.length) {
      return (
        <CodeMirror
          options={{ theme: 'material' }}
          hook={consoleHook}
        ></CodeMirror>
      );
    } else {
      return <></>;
    }
  };

  const onRun = () => {
    flushSync(() => consoleHook.clear());
    eval(`runUserCode = () => {${editorHook.state}}`);
    // eslint-disable-next-line no-undef
    runUserCode();
  };

  return (
    <div>
      <Code />
      <button onClick={onRun}>Run</button>
      <Console />
    </div>
  );
};

export default Editor;
