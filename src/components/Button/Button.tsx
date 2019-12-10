import React from "react";
import classnames from "classnames";
import style from "./button.st.css";
import PropTypes from "prop-types";
/**
 * Button props extending those of a regular button.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of the button default, primary..*/
  color?: string;
  /** Optional ref. */
  ref?: React.Ref<HTMLButtonElement>;
  /** Button sizes: xs, sm, md, lg */
  size?: string;
  /** Button variant. */
  variant?: string;
  tip?: string;
}

const Button = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      color = "default",
      size = "md",
      variant = "fill",
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

// const name = Component.displayName || Component.name;
// forwardRef.displayName = `logProps(${name})`;

export default Button;
export const proptype = Button.propTypes;
