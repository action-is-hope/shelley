/** ErrorText.tsx */
import React from "react";
import style from "./errorText.st.css";
import classnames from "classnames";

const ErrorText = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...style(classnames(style.root, className), {}, rest)} {...rest}>
      {children}
    </span>
  );
};

export default ErrorText;
