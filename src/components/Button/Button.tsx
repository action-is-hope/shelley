import React from "react";
import classnames from "classnames";
import style from "./button.st.css";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
// import { ButtonProps } from "./";

/**
 * Button props extending those of a regular button.
 */

interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Exclude<keyof React.ButtonHTMLAttributes<HTMLButtonElement>, "color">
  > {
  // interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of the button default, primary..*/
  color?: false | number;
  /** Optional ref. */
  // ref?: React.Ref<HTMLButtonElement>;
  /** Button sizes: xs, sm, md, lg */

  /** Button variant. */
  variant?: false | number;
  vol?: false | number;
  /** Extra text that can be used to render a tooltip on hover/focus. */
  tip?: string;
}

const Button = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      color = 1,
      variant = 1,
      vol = 3,
      tip,
      ...rest
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const rootClassNames = classnames(
      style.root,
      style["color" + color],
      style["variant" + variant],
      style["vol" + vol],
      classNameProp
    );

    return (
      <button {...style(rootClassNames, {}, rest)} {...rest} ref={ref}>
        {/* plus */}
        <Icon>
          <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
        </Icon>
        <span className={style.divider}></span>
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
