import React, { forwardRef } from "react";
import { st, classes } from "./inputAdornment.st.css";

function InputAdornment(
  props: React.HTMLAttributes<HTMLSpanElement>,
  ref?: React.Ref<HTMLDivElement>
) {
  const { children, className: classNameProp, ...rest } = props;

  return (
    <span className={st(classes.root, classNameProp)} ref={ref} {...rest}>
      {children}
    </span>
  );
}
const _InputAdornment = forwardRef(InputAdornment);
export { _InputAdornment as InputAdornment };
