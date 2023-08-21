"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { mergeProps } from "react-aria";
import type { ButtonProps } from "../Button";
import type { Accent, Volume, ButtonVariants } from "../typings/shared-types";
import { st, classes } from "./buttonGroup.st.css";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a class to each button. */
  buttonClassName?: string;
  /** Disables all the buttons. */
  isDisabled?: boolean;
  /** Tone index. */
  tone?: Accent;
  /** Variant index. */
  variant?: ButtonVariants;
  /** Changes the volume of the buttons. */
  vol?: Volume;
  /** Orient around vertical or horizontal. */
  orientation?: "vertical" | "horizontal";
  /** Use a split button style. */
  splitButton?: boolean;
}

function ButtonGroup(props: ButtonGroupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    buttonClassName,
    children,
    className: classNameProp,
    isDisabled,
    tone = 1,
    variant = "quiet",
    orientation = "horizontal",
    vol = 3,
    splitButton,
    ...rest
  } = props;
  return (
    <div
      data-id="button-group"
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

/**
 * ButtonGroup can be used to group related buttons in various orientations.
 */
const _ButtonGroup = forwardRef(ButtonGroup);
export { _ButtonGroup as ButtonGroup };
