import React, { forwardRef } from "react";
import { st, classes } from "./appBar.st.css";
import type { TextAlign } from "../typings/shared-types";

export interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element type to render 'as'. */
  elementType?: React.ElementType;
  /** Alignment of the appbar. */
  align?: TextAlign;
  /** Variant. */
  variant?: string;
}

function AppBar(props: AppBarProps, ref: React.Ref<HTMLDivElement>) {
  const {
    align = "end",
    elementType: Component = "div",
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
          variant: variant || undefined,
          align,
        },
        classNameProp
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  );
}
AppBar.displayName = "AppBar";

/**
 * AppBar housing buttons and slogans for use in headers and footers.
 */
const _AppBar = forwardRef(AppBar);
export { _AppBar as AppBar };
