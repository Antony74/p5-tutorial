import * as React from 'react';
import { Controlled } from 'react-codemirror2';
import 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'p5';

const useGetSet = (initialValue) => {
  const [state, setState] = React.useState(initialValue);
  return { get: () => state, set: (value) => setState(value) };
};

const CodeMirror = (props) => (
  <Controlled
    {...props}
    value={props.hook.get()}
    onBeforeChange={(_editor, _data, value) => {
      props.hook.set(value);
    }}
  ></Controlled>
);

const Editor = () => {
  const editorHook = useGetSet("console.log('Hello world');");
  const logHook = useGetSet('');

  const Code = () => (
    <CodeMirror
      options={{ mode: 'javascript', theme: 'material', lineNumbers: true }}
      hook={editorHook}
    ></CodeMirror>
  );

  const Log = () => {
    if (logHook.get().length) {
      return (
        <CodeMirror
          options={{ theme: 'material' }}
          hook={logHook}
        ></CodeMirror>
      );
    } else {
      return <></>;
    }
  };

  const onRun = () => {
    eval(`runUserCode = () => {${editorHook.get()}}`);
    // eslint-disable-next-line no-undef
    runUserCode();
  };

  return (
    <div>
      <Code />
      <Log />
      <button onClick={onRun}>Run</button>
    </div>
  );
};

export default Editor;
