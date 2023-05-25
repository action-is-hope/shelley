import React, { forwardRef } from "react";
import { st, classes } from "./grid.st.css";

export interface GridProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML tag to render as the root for your grid. */
  tag?: string;
  /** Designed to toggle child formatting/alignment rules. */
  formatted?: boolean;
  /** Variant index. */
  variant?: string;
}

function Grid(props: GridProps, ref: React.Ref<HTMLBaseElement>) {
  const {
    children,
    className: classNameProp,
    variant = "main",
    tag: tagName = "div",
    formatted = false,
    ...rest
  } = props;

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

/**
 * Grid allows you to share common grids and allows for formatted content areas.
 */
const _Grid = forwardRef(Grid);
export { _Grid as Grid };
