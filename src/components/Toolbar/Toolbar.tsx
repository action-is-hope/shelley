import React from "react";
import classnames from "classnames";
import { st, classes } from "./toolbar.st.css";
import { TextAlign, Variant } from "../types";

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
      as = "div",
      className: classNameProp,
      children,
      variant = false,
      ...rest
    }: ToolbarProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const Component = as;
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
