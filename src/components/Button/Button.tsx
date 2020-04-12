import React from "react";
import { Accent, Volume, Variant } from "../types";
import classnames from "classnames";
import style from "./button.st.css";
import PropTypes from "prop-types";

/**
 * Button props extending those of a regular button, we are overriding tone.
 */
interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Exclude<keyof React.ButtonHTMLAttributes<HTMLButtonElement>, "tone">
  > {
  /** Chuck in an Icon if you please, ours or yours. */
  icon?: React.ReactNode;
  /** Extra text that can be used to render a infotip / tooltip on hover/focus. */
  tip?: string;
  /** tone index. */
  tone?: Accent;
  /** Variant index. */
  variant?: Variant;
  /** How 'loud' should this Button be? */
  vol?: Volume;
}

const Button = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      tone = 1,
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
      style["tone" + tone],
      style["vol" + vol],
      style["variant" + variant],
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
