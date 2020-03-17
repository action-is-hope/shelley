import React from "react";
import { Color, Volume, Variant } from "../types";
import classnames from "classnames";
import style from "./button.st.css";
import PropTypes from "prop-types";

/**
 * Button props extending those of a regular button, we are overriding color.
 */
interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Exclude<keyof React.ButtonHTMLAttributes<HTMLButtonElement>, "color">
  > {
  /** Color index. */
  color?: Color;
  /** Variant index. */
  variant?: Variant;
  /** How 'loud' should this Button be? */
  vol?: Volume;
  /** Extra text that can be used to render a tooltip on hover/focus. */
  tip?: string;
  /** Chuck in an Icon if you please, ours or yours. */
  icon?: React.ReactNode;
}

const Button = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      color = 1,
      variant = 1,
      vol = 3,
      icon,
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
        {icon && (
          <>
            {icon}
            <span className={style.divider}></span>
          </>
        )}
        {children && <span className={style.inner}>{children}</span>}
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
