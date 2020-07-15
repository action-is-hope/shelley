/** InputAdornment.tsx */
import React from "react";
import style from "./inputAdornment.st.css";
import classnames from "classnames";

const InputAdornment = ({
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

export default InputAdornment;
