/** Logo.tsx */
import React from "react";
import classNames from "classnames";
/* = Style API. */
import { st, classes } from "./logo.st.css";

const Logo = ({
  className: classNameProp,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={st(classNames(classes.root, classNameProp))} {...rest}>
      <span className={classes.logoInner}></span>
    </div>
  );
};

export default Logo;
