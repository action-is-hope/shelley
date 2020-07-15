/** Logo.tsx */
import React from "react";
import style from "./logo.st.css";
import classNames from "classnames";

const Logo = ({
  className: classNameProp,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...style(classNames(style.root, classNameProp), {}, rest)}>
      <span className={style.logoInner}></span>
    </div>
  );
};

export default Logo;
