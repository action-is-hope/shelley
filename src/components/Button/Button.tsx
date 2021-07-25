import React from "react";
import type { Accent, AlignPos, Volume, Variant } from "../types";
import type { MergeElementProps } from "../utils";
/* = Style API. */
import { st, classes } from "./button.st.css";

/**
 * Props
 */

export interface ButtonBaseProps {
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  /** Tone index, defines the color palette. */
  tone?: Accent;
  /** Variant index, defines the 'look'. */
  variant?: Variant;
  /** Defines how 'loud' the Button should be in term of it's size. */
  vol?: Volume;
  /** Applies width of 100%. */
  fullWidth?: boolean;
}

export type ButtonProps<P extends React.ElementType = "button"> = {
  /** Custom element to render such as an anchor "a" or a router "Link" component. */
  as?: P;
} & MergeElementProps<P, ButtonBaseProps>;

function ButtonBase<T extends React.ElementType = "button">(
  {
    children,
    className: classNameProp,
    as,
    icon,
    iconPos = "end",
    fullWidth = false,
    tone = 1,
    variant = 1,
    vol = 3,
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<T>
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
  return React.createElement(
    as || "button",
    {
      ref,
      ...rest,
      className,
    },
    internal
  );
}

const Button = React.forwardRef(ButtonBase) as typeof ButtonBase;

export default Button;
