/** hintText.tsx */
import type React from "react";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./hintText.st.css";

const HintText: React.VFC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className: classNameProp,
  ...rest
}) => {
  return (
    <span className={st(classnames(classes.root, classNameProp))} {...rest}>
      {children}
    </span>
  );
};

export default HintText;
