/** Grid.tsx */
import React from "react";
/* = Style API. */
import { st, classes } from "./grid.st.css";

export interface GridProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML tag to render as the root for your grid. */
  tag?: string;
  /** Designed to toggle child formatting/alignment rules. */
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
    const GridRoot = React.createElement(
      tagName,
      {
        className: st(classes.root, { formatted, variant }, classNameProp),
        ref: ref,
        ...rest,
      },
      children
    );

    return GridRoot;
  }
);

export default Grid;

Grid.displayName = "Grid";
