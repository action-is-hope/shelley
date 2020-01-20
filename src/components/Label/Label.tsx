/** Label.tsx */
import React from "react";
import style from "./label.st.css";
import classNames from "classnames";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  className?: string;
}

const Label = ({ className, children, ...rest }: LabelProps) => {
  const rootClassNames = classNames(style.root, className);
  return (
    <label {...style(rootClassNames, {}, rest)} {...rest}>
      {children}
    </label>
  );
};

export default Label;
