"use client";
import React, {
  // Ref,
  // ReactElement,
  useRef,
  forwardRef,
  // ElementType,
} from "react";
import { useButton } from "react-aria";
import type { AriaButtonProps } from "@react-types/button";
import type {
  Accent,
  AlignPos,
  Volume,
  ButtonVariants,
} from "../typings/shared-types";
import type { MergeElementProps } from "../typings/utils";
import { useFocusRing } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
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

export type ButtonProps<P extends React.ElementType = "a" | "button" | any> = {
  /** Custom element to render such as an anchor "a" or a router "Link" component. */
  as?: P;
  // Dynamically apply element props types based on the input (P).
} & MergeElementProps<P, Omit<ButtonCustomProps, "as">>;

function Button<P extends React.ElementType = "button">(
  {
    as: As,
    children,
    className: classNameProp,
    icon,
    iconPos,
    fullWidth = false,
    tone = 1,
    variant = "primary",
    vol = 3,
    // Pull off known inputs for @react-aria -> useButton minus 'elementType'
    excludeFromTabOrder,
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
  }: ButtonProps<P>,
  ref: React.Ref<HTMLElement>
) {
  const localRef = useRef(null);

  const { buttonProps, isPressed } = useButton(
    {
      excludeFromTabOrder,
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
      elementType: (As as React.JSXElementConstructor<HTMLElement>) || "button",
    },
    localRef as React.RefObject<HTMLElement>
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  const className = st(
    classes.root,
    {
      iconPos: icon ? iconPos : undefined,
      fullWidth,
      tone: tone !== false ? tone : undefined,
      variant: variant !== false ? variant : undefined,
      vol: vol !== false ? vol : undefined,
      isFocusVisible,
      isPressed,
      isDisabled,
    },
    classNameProp
  );

  const internal = (
    <>
      {children && <span className={classes.inner}>{children}</span>}
      {icon && (
        <>
          {children && <span className={classes.divider}></span>} {icon}
        </>
      )}
    </>
  );
  return React.createElement(
    As || "button",
    {
      ref: mergeRefs(localRef, ref),
      ...mergeProps(buttonProps, focusProps),
      className,
      ...rest,
    },
    internal
  );
}
Button.displayName = "Button";

/**
 * Buttons allow users to perform an action.
 */

const _Button = forwardRef(Button);
_Button.toString = () => "ShelleyButton";
export { _Button as Button };
