/** Grid.tsx */
import React from "react";
import style from "./grid.st.css";
import classNames from "classnames";

interface GridProps extends React.HTMLProps<HTMLDivElement> {
  variant?: number;
}

const Grid = ({
  // accent = 1,
  children,
  className: classNameProp,
  variant,
  ...rest
}: GridProps) => {
  return (
    <div
      {...style(
        classNames(style.root, style["variant" + variant], classNameProp),
        {},
        rest
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid;
