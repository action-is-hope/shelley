"use client";
import React, { useRef, forwardRef } from "react";
import { useButton } from "react-aria";
import type { AriaButtonProps } from "@react-types/button";
import type {
  AlignPos,
  Volume,
  ExtendedToneVariants,
  ExtendedButtonVariants,
  ComponentBase,
} from "../typings/shared-types";
import type { MergeElementProps } from "../typings/utils";
import { useFocusRing } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { st, classes } from "./buttonBase.st.css";
import { ProgressCircle } from "../Progress";

export interface ButtonProps<P = "button", V = "", T = "">
  extends Omit<AriaButtonProps, "elementType" | "href">,
    ComponentBase {
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
  /** isLoading */
  isLoading?: boolean;
  /** Internationalised loading text */
  loadingText?: string;
  /** ProgressCircle props */
  progressProps?: React.ComponentProps<typeof ProgressCircle>;
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
    isLoading = false,
    loadingText,
    progressProps,
    onPress,
    "data-id": dataId,
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
      variant: variant || undefined,
      tone: tone || undefined,
      vol: vol || undefined,
      isFocusVisible,
      isPressed,
      isDisabled,
      isLoading,
      fullWidth,
    },
    classNameProp
  );

  const internal = (
    <>
      {children && <span className={classes.inner}>{children}</span>}
      {icon && !isLoading && (
        <>
          {children && <span className={classes.divider}></span>} {icon}
        </>
      )}
      {isLoading && (
        <>
          {children && <span className={classes.divider}></span>}{" "}
          <ProgressCircle
            size="small"
            isIndeterminate
            className={classes.loader}
            aria-label={loadingText || "Loading"}
            variant={variant === "primary" ? "overBackground" : undefined}
            data-id={dataId ? `${dataId}--progressCircle` : undefined}
            {...progressProps}
          />
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
