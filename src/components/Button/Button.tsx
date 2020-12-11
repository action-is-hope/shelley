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
  /** Define an Icon, postion via iconPos. */
  icon?: React.ReactNode;
  /** The position of the label relative to the input. */
  iconPos?: AlignPos;
  /** Provide a url path for a custom component via 'as' prop. */
  to?: string;
  /** Tone index, defines the color palette. */
  tone?: Accent;
  /** Variant index, defines the 'look'. */
  variant?: Variant;
  /** Defines how 'loud' the Button should be in term of it's size. */
  vol?: Volume;
  /** Applies width of 100%. */
  fullWidth?: boolean;
  /** Custom element to render as an anchor, 'a' for basic link or provide a component that supports 'to'. */
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
      ...rest
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    to &&
      !Component &&
      console.warn(`No anchor element defined, do this via the 'as' prop `);

    const rootClassNames = classnames(classes.root, classNameProp);
    const className = st(rootClassNames, {
      iconPos: icon ? iconPos : false,
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
