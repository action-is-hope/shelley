/** CodeSample.tsx */
import React from "react";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./codeSample.st.css";

import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps
} from "react-syntax-highlighter";

const CodeSample = ({
  className: classNameProp,
  children,
  language = "tsx",
  fixedHeight,
  ...rest
}: SyntaxHighlighterProps) => {
  const rootClassNames = classnames(classes.root, classNameProp, {
    [classes.fixedHeight]: fixedHeight
  });
  return (
    <div
      className={st(rootClassNames)}
      // {...style(
      //   classnames(style.root, classNameProp, {
      //     [style.fixedHeight]: fixedHeight
      //   }),
      //   {},
      //   rest
      // )}
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
