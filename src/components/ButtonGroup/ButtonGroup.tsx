import React, {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  // Importing from via React. stops EVERYTHING from being dumped out by doc gen.
  // HTMLAttributes,
  isValidElement,
  Ref,
} from "react";
import type { Accent, Volume, ButtonVariants } from "../types";
/* = Style API. */
import { st, classes } from "./buttonGroup.st.css";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a class to each button. */
  buttonClassName?: string;
  /** Disables all the buttons. */
  disabled?: boolean;
  /** Tone index. */
  tone?: Accent;
  /** Variant index. */
  variant?: ButtonVariants;
  /** Changes the volume of the buttons. */
  vol?: Volume;
  /** Orient around vertical or horizontal. */
  orientation?: "vertical" | "horizontal";
}

const ButtonGroup = forwardRef(
  (
    {
      buttonClassName,
      children,
      className: classNameProp,
      disabled,
      tone = 1,
      variant = "quiet",
      orientation = "horizontal",
      vol = 3,
      ...rest
    }: ButtonGroupProps,
    ref?: Ref<HTMLDivElement>
  ) => (
    <div
      className={st(classes.root, { orientation }, classNameProp)}
      {...rest}
      ref={ref}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return null;
        }

        return cloneElement(child as ReactElement, {
          className: st(buttonClassName, child.props.className),
          disabled: child.props.disabled || disabled,
          tone: child.props.tone || tone,
          vol: child.props.vol || vol,
          variant: child.props.variant || variant,
          icon: child.props.icon,
        });
      })}
    </div>
  )
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
