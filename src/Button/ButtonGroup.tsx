"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { mergeProps } from "react-aria";
import type { ButtonProps } from "./";
import type {
  ExtendedToneVariants,
  ExtendedButtonVariants,
  Volume,
} from "../typings/shared-types";
import { st, classes } from "./buttonGroup.st.css";

export interface ButtonGroupProps<V = "", T = "">
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a class to each button. */
  buttonClassName?: string;
  /** Disables all the buttons. */
  isDisabled?: boolean;
  /** Tone index. */
  tone?: ExtendedToneVariants<T>;
  /** Variant index. */
  variant?: ExtendedButtonVariants<V>;
  /** Changes the volume of the buttons. */
  vol?: Volume;
  /** Orient around vertical or horizontal. */
  orientation?: "vertical" | "horizontal";
  /** Use a split button style. */
  splitButton?: boolean;
}

function ButtonGroup<V extends string, T extends string>(
  props: ButtonGroupProps<T, V>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    buttonClassName,
    children,
    className: classNameProp,
    isDisabled,
    tone = "lead",
    variant = "quiet",
    orientation = "horizontal",
    vol = 3,
    splitButton,
    ...rest
  } = props;
  return (
    <div
      className={st(
        classes.root,
        { orientation, splitButton, isDisabled },
        classNameProp
      )}
      {...rest}
      ref={ref}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return null;
        }
        // Check if Child is a Shelley Button
        return child.type?.toString() === "ShelleyButton"
          ? cloneElement(child, {
              ...mergeProps(
                { isDisabled, tone, variant, vol },
                { ...(child.props as ButtonProps) }
              ),
            })
          : child;
      })}
    </div>
  );
}
ButtonGroup.displayName = "ButtonGroup";

/**
 * ButtonGroup can be used to group related buttons in various orientations.
 */
const _ButtonGroup = forwardRef(ButtonGroup);
export { _ButtonGroup as ButtonGroup };
