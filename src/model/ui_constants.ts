// See full list of code mirror options: https://codemirror.net/doc/manual.html
export const CM_EXERCISE_OPTIONS = {
    theme: "base16-light",
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers"
    ],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  export const CM_VIEWONLY_OPTIONS = {
    theme: "base16-light",
    mode: "javascript",
    lineNumbers: false,
    lineWrapping: true,
    foldGutter: true,
    gutters: [
      "CodeMirror-lint-markers"
    ],
    lint: true,
    readOnly: 'nocursor',
  };