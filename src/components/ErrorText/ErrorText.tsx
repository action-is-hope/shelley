/** ErrorText.tsx */
import type React from "react";
/* = Style API. */
import { st, classes } from "./errorText.st.css";
const ErrorText: React.VFC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className: classNameProp,
  ...rest
}) => {
  return (
    <span className={st(classes.root, classNameProp)} {...rest}>
      {children}
    </span>
  );
};

export default ErrorText;
