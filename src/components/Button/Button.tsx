import React from "react";
import { Accent, Volume, Variant } from "../types";
import classnames from "classnames";
import { AlignPos } from "../types";
/* = Style API. */
import { st, classes } from "./button.st.css";

/**
 * Button props extending those of a regular button, we are overriding tone.
 */
export interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Exclude<keyof React.ButtonHTMLAttributes<HTMLButtonElement>, "tone">
  > {
  /** Chuck in an Icon if you please, ours or yours. */
  icon?: React.ReactNode;
  /** The position of the label relative to the input. */
  iconPos?: AlignPos;
  /** Extra text that can be used to render a infotip / tooltip on hover/focus. */
  tip?: string;
  /** Provide a url path for a custom component via 'as' prop. */
  to?: string;
  /** tone index. */
  tone?: Accent;
  /** Variant index. */
  variant?: Variant;
  /** How 'loud' should this Button be? */
  vol?: Volume;
  /** Applies width of 100%; */
  fullWidth?: boolean;
  /** Custom element to render. */
  as?: any;
}

const Button = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      as: Component,
      icon,
      iconPos = "end",
      fullWidth = false,
      tone = 1,
      to,
      variant = 1,
      vol = 3,
      tip,
      ...rest
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const rootClassNames = classnames(classes.root, classNameProp);
    const className = st(rootClassNames, {
      iconPos,
      fullWidth,
      tone,
      variant,
      vol
    });
    const internal = (
      <>
        {icon && (
          <>
            {icon}
            {children && <span className={classes.divider}></span>}
          </>
        )}
        {children && <span className={classes.inner}>{children}</span>}
        {tip && <span className={classes.tip}>{tip}</span>}
      </>
    );
    return Component ? (
      Component === "a" ? (
        <Component {...{ className, ...rest, ref }} href={to}>
          {internal}
        </Component>
      ) : (
        <Component {...{ className, to, ...rest, ref }}>{internal}</Component>
      )
    ) : (
      <button {...{ className, ...rest, ref }}>{internal}</button>
    );
  }
);

Button.displayName = "Button";

export default Button;
