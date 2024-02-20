import React, { forwardRef } from "react";
import { st, classes } from "./grid.st.css";

export interface GridProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** Element type to render 'as'. */
  elementType?: React.ElementType;
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
    elementType: Component = "div",
    formatted = false,
    ...rest
  } = props;

  return (
    <Component
      className={st(classes.root, { formatted, variant }, classNameProp)}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  );
}
Grid.displayName = "Grid";

/**
 * Grid allows you to share common grids and allows for formatted content areas.
 */
const _Grid = forwardRef(Grid);
export { _Grid as Grid };
