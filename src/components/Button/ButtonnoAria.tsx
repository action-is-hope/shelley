// import * as React from "react";
import type { ElementType, ReactNode, Ref } from "react";
import { createElement, forwardRef } from "react";
import type { Accent, AlignPos, Volume, ButtonVariants } from "../types";
import type { MergeElementProps } from "../utils";
/* = Style API. */
import { st, classes } from "./button.st.css";

/**
 * Props
 */

export interface ButtonBaseProps {
  /**
   * Define an Icon node; position the icon via #iconPos.
   **/
  icon?: ReactNode;
  /**
   * The position of the icon relative to the label.
   **/
  iconPos?: AlignPos;
  /**
   * Tone index, changes color of button if required.
   **/
  tone?: Accent;
  /**
   * Variant index, defines the 'look'.
   **/
  variant?: ButtonVariants;
  /**
   * Defines how 'loud' the Button should be in term of it's size.
   **/
  vol?: Volume;
  /**
   * Applies width of 100%.
   **/
  fullWidth?: boolean;
}

export type ButtonProps<P extends ElementType = "button"> = {
  /**
   * Custom element to render such as an anchor "a" or a router "Link" component.
   **/
  as?: P;
} & MergeElementProps<P, ButtonBaseProps>;

export function ButtonBase<T extends ElementType = "button">(
  {
    children,
    className: classNameProp,
    as,
    icon,
    iconPos = "end",
    fullWidth = false,
    tone = 1,
    variant = "primary",
    // onPress,
    // onPressStart,
    vol = 3,
    role,
    ...rest
  }: ButtonProps<T>,
  ref: Ref<T>
) {
  const className = st(
    classes.root,
    {
      iconPos: icon ? iconPos : undefined,
      fullWidth,
      tone,
      variant,
      vol,
    },
    classNameProp
  );
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
  return createElement(
    as || "button",
    {
      ref,
      ...rest,
      // role: as === "a" ? undefined : role,
      role,
      className,
    },
    internal
  );
}

// const Button = forwardRef(ButtonBase) as typeof ButtonBase;
const Button = forwardRef(ButtonBase);

Button.displayName = "Button";

export default Button;
