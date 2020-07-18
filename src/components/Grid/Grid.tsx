/** Grid.tsx */
import React from "react";
import classNames from "classnames";
/* = Style API. */
import { st, classes } from "./grid.st.css";

interface GridProps extends React.HTMLAttributes<HTMLBaseElement> {
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
    const rootClassNames = classNames(classes.root, classNameProp);

    const gridRoot = React.createElement(
      tagName,
      {
        className: st(rootClassNames, { formatted, variant }),
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
