/** CodeSample.tsx */
import React from "react";
import style from "./codeSample.st.css";
import classNames from "classnames";

import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps
} from "react-syntax-highlighter";

const CodeSample = ({
  className: classNameProp,
  children,
  language = "jsx",
  fixedHeight,
  ...rest
}: SyntaxHighlighterProps) => {
  return (
    <div
      {...style(
        classNames(style.root, classNameProp, {
          [style.fixedHeight]: fixedHeight
        }),
        {},
        rest
      )}
    >
      <SyntaxHighlighter
        language={language}
        style={false}
        useInlineStyles={false}
        CodeTag="code"
        wrapLines
        {...rest}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSample;
