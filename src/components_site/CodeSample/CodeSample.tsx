/** CodeSample.tsx */
import type React from "react";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./codeSample.st.css";

import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps
} from "react-syntax-highlighter";

const CodeSample: React.VFC<SyntaxHighlighterProps> = ({
  className: classNameProp,
  children,
  language = "tsx",
  fixedHeight,
  ...rest
}) => {
  const rootClassNames = classnames(classes.root, classNameProp);
  return (
    <div className={st(rootClassNames, { fixedHeight })}>
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
