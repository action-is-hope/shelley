/** hintText.tsx */
import React from "react";
import style from "./hintText.st.css";
import classnames from "classnames";

const HintText = ({
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

export default HintText;
