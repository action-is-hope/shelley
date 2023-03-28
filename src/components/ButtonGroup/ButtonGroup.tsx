import React, {
  Children,
  cloneElement,
  forwardRef,
  // Importing from via React. stops EVERYTHING from being dumped out by doc gen.
  // HTMLAttributes,
  isValidElement,
  Ref,
} from "react";
import { mergeProps } from "react-aria";
import type { Accent, Volume, ButtonVariants } from "../types";
/* = Style API. */
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

const ButtonGroup = forwardRef(
  (
    {
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
    }: ButtonGroupProps,
    ref?: Ref<HTMLDivElement>
  ) => (
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
                { ...child.props }
              ),
            })
          : child;
      })}
    </div>
  )
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
