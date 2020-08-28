import React from "react";
import { Accent, Volume, Variant } from "../types";
import classnames from "classnames";

/* = Style API. */
import { st, classes } from "./buttonGroup.st.css";

/**
 * ButtonGroup props extending those of a regular button, we are overriding tone.
 */
export interface ButtonGroupProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    Exclude<keyof React.HTMLAttributes<HTMLDivElement>, "tone">
  > {
  /** Adds a class to each button. */
  buttonClassName?: string;
  /** Disables all the buttons. */
  disabled?: boolean;
  /** Tone index. */
  tone?: Accent;
  /** Variant index. */
  variant?: Variant;
  /** How 'loud' should this ButtonGroup be? */
  vol?: Volume;
  /** Orient around vertical or horizontal. */
  orientation?: "vertical" | "horizontal";
}

const ButtonGroup = React.forwardRef(
  (
    {
      buttonClassName,
      children,
      className: classNameProp,
      disabled,
      tone = 1,
      variant = 1,
      orientation = "horizontal",
      vol = 3,
      ...rest
    }: ButtonGroupProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const rootClassNames = classnames(classes.root, classNameProp);

    return (
      <div className={st(rootClassNames, { orientation })} {...rest} ref={ref}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            className: classnames(buttonClassName, child.props.className),
            disabled: child.props.disabled || disabled,
            tone: child.props.tone || tone,
            vol: child.props.vol || vol,
            variant: child.props.variant || variant,
            icon: child.props.icon
          });
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
