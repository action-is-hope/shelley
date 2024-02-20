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
import {
  st as stButtonBase,
  classes as classesButtonBase,
} from "./buttonBase.st.css";

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
  /** Is the button a Call To Action */
  isCta?: boolean;
}

function ButtonBase<
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
    tone,
    variant,
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

  const className = stButtonBase(
    classesButtonBase.root,
    {
      iconPos: icon ? iconPos : undefined,
      variant: variant || undefined,
      tone: tone || undefined,
      vol: vol || undefined,
      isFocusVisible,
      isPressed,
      isDisabled,
      fullWidth,
    },
    classNameProp
  );

  const internal = (
    <>
      {children && <span className={classesButtonBase.inner}>{children}</span>}
      {icon && (
        <>
          {children && <span className={classesButtonBase.divider}></span>}{" "}
          {icon}
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
ButtonBase.displayName = "Button";

/**
 * Button component capable of adapting to various element types (e.g., "button", "a", or a router "Link").
 * Utilizes `react-aria` for accessibility features. see {@link http://example.com|Example Website}
 */
const _ButtonBase = forwardRef(ButtonBase);
_ButtonBase.toString = () => "ShelleyButton";
export { _ButtonBase as ButtonBase };
