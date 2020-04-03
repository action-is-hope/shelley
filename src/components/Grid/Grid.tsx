/** Grid.tsx */
import React from "react";
import style from "./grid.st.css";
import classNames from "classnames";

interface GridProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML tag to render as the root for your grid. */
  tag?: string;
  /** Designed to toggle typographic alignment rules. */
  typographic?: boolean;
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
      typographic = true,
      ...rest
    }: GridProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => {
    const gridRoot = React.createElement(
      tagName,
      {
        ...style(
          classNames(style.root, style["variant" + variant], classNameProp),
          { typographic },
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
