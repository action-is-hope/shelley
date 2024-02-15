"use client";
import React, { useRef, forwardRef } from "react";
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

export type ExtendedButtonVariants<V> = ButtonVariants | V;

export interface ButtonProps<P, V>
  extends Omit<AriaButtonProps, "elementType" | "href"> {
  /** Custom `className`. */
  className?: string;
  /** Custom element to render such as an anchor "a" or a router "Link" component. */
  elementType?: P;
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  /** Tone index, defines the color palette. */
  tone?: Accent;
  /** Variant index, defines the 'look'. */
  // variant?: ButtonVariants;
  variant?: ExtendedButtonVariants<V>;
  /** Defines how 'loud' the Button should be in term of it's size. */
  vol?: Volume;
  /** Applies width of 100%. */
  fullWidth?: boolean;
}

function Button<V extends string, P extends React.ElementType = "button">(
  props: MergeElementProps<P, ButtonProps<P, V>>,
  ref: React.Ref<HTMLElement>
) {
  const {
    elementType: Element = "button",
    children,
    className: classNameProp,
    icon,
    iconPos,
    fullWidth = false,
    tone = 1,
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
