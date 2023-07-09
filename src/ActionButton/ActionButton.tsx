"use client";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import React, { useRef, RefObject, forwardRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "react-aria";
import type { AriaButtonProps } from "@react-types/button";
import type { AlignPos } from "../typings/shared-types";
import { st, classes } from "./actionButton.st.css";

export interface ActionButtonProps
  extends Omit<AriaButtonProps, "elementType"> {
  /** Classname  */
  className?: string;
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  isQuiet?: boolean;
}

function ActionButton(
  props: ActionButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const {
    isQuiet,
    isDisabled,
    children,
    // autoFocus,
    className: classNameProp,
    icon,
    iconPos,
  } = props;

  const localRef = useRef(null);

  const { buttonProps, isPressed } = useButton(
    props,
    localRef as RefObject<HTMLButtonElement>
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={mergeRefs(localRef, ref)}
      className={st(
        classes.root,
        {
          iconPos: icon ? iconPos : undefined,
          isQuiet,
          isFocusVisible,
          isPressed,
          isDisabled,
        },
        classNameProp
      )}
    >
      {icon && (
        <>
          {icon}
          {children && <span className={classes.divider}></span>}
        </>
      )}
      {children && <span className={classes.inner}>{children}</span>}
    </button>
  );
}
ActionButton.displayName = "ActionButton";

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _ActionButton = forwardRef(ActionButton);
export { _ActionButton as ActionButton };
