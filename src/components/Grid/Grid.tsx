/** Grid.tsx */
import React from "react";
import style from "./grid.st.css";
import classNames from "classnames";

interface GridProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML tag to render as the root for your grid. */
  tag?: string;
  /** Designed to toggle formatting rules for children. */
  formatted?: boolean;
  /** Variant index. */
  variant?: number;
}

const Grid = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      variant = 1,
      tag: tagName = "div",
      formatted = false,
      ...rest
    }: GridProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => {
    const gridRoot = React.createElement(
      tagName,
      {
        ...style(
          classNames(style.root, style["variant" + variant], classNameProp),
          { formatted },
          rest
        ),
        ref: ref,
        ...rest
      },
      children
    );

    return gridRoot;
  }
);

export default Grid;

Grid.displayName = "Grid";
