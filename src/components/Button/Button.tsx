import React from "react";
/* Adobe libs */
// Version dependancy issue: https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658
import { useButton } from "@react-aria/button";
// import { mergeProps } from "@react-aria/utils";
import type { AriaButtonProps } from "@react-types/button";
/* Internal */
import type { Accent, AlignPos, Volume, Variant } from "../types";
import type { MergeElementProps } from "../utils";
/* Style API */
import { st, classes } from "./button.st.css";

/**
 * Leveraging Adobes 'useButton' for the lions share of features.
 * N.B: Omitting 'elementType' as preference is to use existing 'as'.
 *
 * Adobe docs: https://react-spectrum.adobe.com/react-aria/useButton.html
 */

export interface ButtonBaseProps extends Omit<AriaButtonProps, "elementType"> {
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
    as: As,
    children,
    className: classNameProp,
    icon,
    iconPos = "end",
    fullWidth = false,
    tone = 1,
    variant = 1,
    vol = 3,
    // Pull off known inputs of useButton
    isDisabled,
    // children,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    autoFocus,
    onFocus,
    onBlur,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    href,
    target,
    rel,
    // elementType,
    ariaExpanded,
    ariaHaspopup,
    ariaControls,
    ariaPressed,
    type,
    id,
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaDetails,
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<HTMLElement>
) {
  const { buttonProps, isPressed } = useButton(
    {
      isDisabled,
      // children,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      autoFocus,
      onFocus,
      onBlur,
      onFocusChange,
      onKeyDown,
      onKeyUp,
      href,
      target,
      rel,
      // elementType,
      "aria-expanded": ariaExpanded,
      "aria-haspopup": ariaHaspopup,
      "aria-controls": ariaControls,
      "aria-pressed": ariaPressed,
      type,
      id,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-details": ariaDetails,
      // Castings to use adobe libs...
      elementType: (As as React.JSXElementConstructor<HTMLElement>) || "button",
    },
    ref as React.RefObject<HTMLElement>
  );

  const className = st(
    classes.root,
    {
      iconPos: icon ? iconPos : undefined,
      fullWidth,
      tone,
      variant,
      vol,
      isPressed,
      isDisabled,
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
    As || "button",
    {
      ref,
      ...buttonProps,
      className,
      ...rest,
    },
    internal
  );
}

const Button = React.forwardRef(ButtonBase) as typeof ButtonBase;

export default Button;
