import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'p5';

const Editor = () => {
  const [state, setState] = React.useState({editor: "console.log('Hello world');"});
  const ref = React.useRef();

  const onRun = () => {
    if (state.scriptTag) {
      state.scriptTag.remove();
    }

    const scriptTag = document.createElement('script');
    setState({...state, scriptTag });
    scriptTag.text = `runUserCode = () => {${state.editor}}`;
    ref.current.append(scriptTag);

    // eslint-disable-next-line no-undef
    runUserCode();
  };

  return (
    <div ref={ref}>
      <CodeMirror
        options={{ mode: 'javascript', theme: 'material', lineNumbers: true }}
        value={state.editor}
        onBeforeChange={(_editor, _data, value) => {
          setState({...state, editor: value});
        }}
      ></CodeMirror>
      <button onClick={onRun}>Run</button>
    </div>
  );

};

export default Editor;
