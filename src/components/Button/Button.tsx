import React from "react";
import classnames from "classnames";
import style from "./button.st.css";
import PropTypes from "prop-types";
// import { ButtonProps } from "./";

/**
 * Button props extending those of a regular button.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of the button default, primary..*/
  color?: string;
  /** Optional ref. */
  ref?: React.Ref<HTMLButtonElement>;
  /** Button sizes: xs, sm, md, lg */
  size?: string;
  /** Button variant. */
  variant?: string;
  /** Extra text that can be used to render a tooltip on hover/focus. */
  tip?: string;
}

const Button = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      color = "c1",
      size = "md",
      variant = "v1",
      tip,
      ...rest
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const rootClassNames = classnames(
      style.root,
      style[color],
      style[size],
      style[variant],
      classNameProp
    );

    return (
      <button {...style(rootClassNames, {}, rest)} {...rest} ref={ref}>
        <span className={style.inner}>{children}</span>
        {tip && <span className={style.tip}>{tip}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
Button.propTypes = {
  style: PropTypes.object
};

export default Button;
export const proptype = Button.propTypes;
