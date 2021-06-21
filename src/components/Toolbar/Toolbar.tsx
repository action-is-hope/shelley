import React from "react";
import classnames from "classnames";
import { st, classes } from "./toolbar.st.css";
import type { TextAlign, Variant } from "../types";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: any;
  align?: TextAlign;
  /** Variant index, defines the 'look'. */
  variant?: Variant;
}
const Toolbar = React.forwardRef(
  (
    {
      align = "end",
      as: Component = "div",
      className: classNameProp,
      children,
      variant = false,
      ...rest
    }: ToolbarProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Component
        className={st(classnames(classes.root, classNameProp), {
          variant,
          align
        })}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Toolbar.displayName = "Toolbar";

export default Toolbar;
