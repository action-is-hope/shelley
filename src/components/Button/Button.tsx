import React from "react";
/* Adobe libs */
// Version dependancy issue: https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658
import { useButton } from "react-aria";
import type { AriaButtonProps } from "@react-types/button";
/* Internal */
import type { Accent, AlignPos, Volume, ButtonVariants } from "../types";
import type { MergeElementProps } from "../utils";
/* Style API */
import { st, classes } from "./button.st.css";

/**
 * Leveraging Adobes 'useButton' to enable use with their hooks.
 * N.B: Omitting 'elementType' as preference is to use existing 'as'.
 *
 * Adobe docs: https://react-spectrum.adobe.com/react-aria/useButton.html
 */

export interface ButtonCustomProps
  extends Omit<AriaButtonProps, "elementType"> {
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  /** Tone index, defines the color palette. */
  tone?: Accent;
  /** Variant index, defines the 'look'. */
  variant?: ButtonVariants;
  /** Defines how 'loud' the Button should be in term of it's size. */
  vol?: Volume;
  /** Applies width of 100%. */
  fullWidth?: boolean;
}

export type ButtonProps<P extends React.ElementType = "button"> = {
  /** Custom element to render such as an anchor "a" or a router "Link" component. */
  as?: P;
  // Dynamically apply element props types based on the input (P).
} & MergeElementProps<P, Omit<ButtonCustomProps, "as">>;

function ButtonBase<T extends React.ElementType = "button">(
  {
    as: As,
    children,
    className: classNameProp,
    icon,
    iconPos = "end",
    fullWidth = false,
    tone = 1,
    variant = "primary",
    vol = 3,
    // Pull off known inputs for @react-aria -> useButton minus 'elementType'
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    // autoFocus,
    onFocus,
    onBlur,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    href,
    target,
    rel,
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
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      // autoFocus,
      onFocus,
      onBlur,
      onFocusChange,
      onKeyDown,
      onKeyUp,
      href,
      target,
      rel,
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
      // Map 'as' to elementType for adobe-aria...
      // ...rest,
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
      variant: variant !== false ? variant : undefined,
      vol: vol !== false ? vol : undefined,
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

// See:
// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/listbox/src/ListBox.tsx

// const Button = React.forwardRef(ButtonBase);
const Button = React.forwardRef(ButtonBase) as typeof ButtonBase;

// Button.displayName = "Button";

export default Button;
