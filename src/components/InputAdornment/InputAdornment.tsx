/** InputAdornment.tsx */
import React from "react";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./inputAdornment.st.css";

const InputAdornment = ({
  children,
  className: classNameProp,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={st(classnames(classes.root, classNameProp))}
      // {...style(classnames(style.root, className), {}, rest)}
      {...rest}
    >
      {children}
    </span>
  );
};

export default InputAdornment;
