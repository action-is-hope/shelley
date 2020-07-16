/** ErrorText.tsx */
import React from "react";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./errorText.st.css";
const ErrorText = ({
  children,
  className: classNameProp,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={st(classnames(classes.root, classNameProp))} {...rest}>
      {children}
    </span>
  );
};

export default ErrorText;
