/** Grid.tsx */
import React from "react";
import style from "./grid.st.css";
import classNames from "classnames";

interface GridProps extends React.HTMLProps<HTMLDivElement> {
  variant?: number;
  typographic?: boolean;
}

const Grid = ({
  children,
  className: classNameProp,
  variant = 1,
  typographic = true,
  ...rest
}: GridProps) => {
  return (
    <div
      {...style(
        classNames(style.root, style["variant" + variant], classNameProp),
        { typographic },
        rest
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid;
