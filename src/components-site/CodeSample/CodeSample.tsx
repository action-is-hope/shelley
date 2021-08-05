/** CodeSample.tsx */
import type React from "react";
/* = Style API. */
import { st, classes } from "./codeSample.st.css";

import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";

const CodeSample: React.VFC<SyntaxHighlighterProps> = ({
  className: classNameProp,
  children,
  language = "tsx",
  fixedHeight,
  ...rest
}) => {
  return (
    <div className={st(classes.root, { fixedHeight }, classNameProp)}>
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
