/** Logo.tsx */
import type React from "react";
import classNames from "classnames";
/* = Style API. */
import { st, classes } from "./logo.st.css";

const Logo: React.VFC<React.HTMLAttributes<HTMLDivElement>> = ({
  className: classNameProp,
  ...rest
}) => {
  return (
    <div className={st(classNames(classes.root, classNameProp))} {...rest}>
      <span className={classes.logoInner}></span>
    </div>
  );
};

export default Logo;
