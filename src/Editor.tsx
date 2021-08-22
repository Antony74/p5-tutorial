import * as React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "react-codemirror2";
import "codemirror/mode/javascript/javascript";

const Editor = () => {
  const [value, setValue] = React.useState("console.log('Hello world');");

  return (
    <CodeMirror
      options={{ mode: "javascript", theme: "material", lineNumbers: true }}
      value={value}
      onBeforeChange={(_editor, _data, value) => {
        setValue(value);
      }}
    ></CodeMirror>
  );
};

export default Editor;
