/** CodeSample.tsx */
import React from "react";
import style from "./codeSample.st.css";
import classNames from "classnames";

import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps
} from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSample = ({
  className: classNameProp,
  children,
  language = "jsx",
  ...rest
}: SyntaxHighlighterProps) => {
  return (
    <div {...style(classNames(style.root, classNameProp), {}, rest)}>
      <SyntaxHighlighter
        language={language}
        style={false}
        useInlineStyles={false}
        CodeTag="code"
        {...rest}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSample;
