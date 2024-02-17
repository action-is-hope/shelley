"use client";
import React, { useRef, forwardRef } from "react";
import { useButton } from "react-aria";
import type { AriaButtonProps } from "@react-types/button";
import type {
  AlignPos,
  Volume,
  ExtendedToneVariants,
  ExtendedButtonVariants,
} from "../typings/shared-types";
import type { MergeElementProps } from "../typings/utils";
import { useFocusRing } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { st, classes } from "./button.st.css";

export interface ButtonProps<P = "button", V = "", T = "">
  extends Omit<AriaButtonProps, "elementType" | "href"> {
  /** Custom `className` for overriding styles. */
  className?: string;
  /** Custom element to render such as an anchor "a" or a router "Link" component. */
  elementType?: P;
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  /** Tone index, defines the color palette. */
  tone?: ExtendedToneVariants<T>;
  /** Variant defines the 'look'. */
  variant?: ExtendedButtonVariants<V>;
  /** Defines how 'loud' the Button should be in term of it's size. */
  vol?: Volume;
  /** Applies width of 100%. */
  fullWidth?: boolean;
}

function Button<
  V extends string,
  T extends string,
  P extends React.ElementType = "button"
>(
  props: MergeElementProps<P, ButtonProps<P, V, T>>,
  ref: React.Ref<HTMLElement>
) {
  const {
    elementType: Element = "button",
    children,
    className: classNameProp,
    icon,
    iconPos,
    fullWidth = false,
    tone = "primary",
    variant = "primary",
    vol = 3,
    isDisabled,
    ...rest
  } = props;

  const internalRef = useRef(null);

  const { buttonProps, isPressed } = useButton(
    props,
    internalRef as React.RefObject<HTMLElement>
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  const className = st(
    classes.root,
    {
      iconPos: icon ? iconPos : undefined,
      fullWidth,
      tone: tone || undefined,
      variant: variant || undefined,
      vol: vol || undefined,
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
    Element,
    {
      ref: mergeRefs(internalRef, ref),
      ...mergeProps(buttonProps, focusProps),
      className,
      ...rest,
    },
    internal
  );
}
Button.displayName = "Button";

/**
 * Button component capable of adapting to various element types (e.g., "button", "a", or a router "Link").
 * Utilizes `react-aria` for accessibility features. see {@link http://example.com|Example Website}
 *
 * @template P The element type for the component, influencing the resulting DOM element or React component.
 * @param {ButtonProps<P>} props
 */
const _Button = forwardRef(Button);
_Button.toString = () => "ShelleyButton";
export { _Button as Button };
