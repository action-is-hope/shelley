import React, { forwardRef } from "react";
import { st, classes } from "./toolbar.st.css";
import type { TextAlign, Variant } from "../typings/shared-types";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element type to render 'as'. */
  as?: React.ElementType;
  /** Alignment of the toolbar. */
  align?: TextAlign;
  /** Variant index, defines the 'look'. */
  variant?: Variant;
}

function Toolbar(props: ToolbarProps) {
  const {
    align = "end",
    as: Component = "div",
    className: classNameProp,
    children,
    variant = undefined,
    ...rest
  } = props;

  return (
    <Component
      className={st(
        classes.root,
        {
          variant,
          align,
        },
        classNameProp
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export { Toolbar };
