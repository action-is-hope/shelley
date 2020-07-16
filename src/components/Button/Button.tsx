import React from "react";
import { Accent, Volume, Variant } from "../types";
import classnames from "classnames";
import PropTypes from "prop-types";
import { AlignPos } from "../types";
/* = Style API. */
import { st, classes } from "./button.st.css";

/**
 * Button props extending those of a regular button, we are overriding tone.
 */
export interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Exclude<keyof React.ButtonHTMLAttributes<HTMLButtonElement>, "tone">
  > {
  /** Chuck in an Icon if you please, ours or yours. */
  icon?: React.ReactNode;
  /** The position of the label relative to the input. */
  iconPos?: AlignPos;
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
      iconPos = "end",
      vol = 3,
      icon,
      tip,
      ...rest
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const rootClassNames = classnames(
      classes.root,
      classes["tone" + tone],
      classes["vol" + vol],
      classes["variant" + variant],
      classNameProp
    );

    return (
      <button
        className={st(rootClassNames, { iconPos })}
        // {...style(
        //   rootClassNames,
        //   {
        //     iconPos
        //   },
        //   rest
        // )}
        {...rest}
        ref={ref}
      >
        {icon && (
          <>
            {icon}
            <span className={classes.divider}></span>
          </>
        )}
        {children && <span className={classes.inner}>{children}</span>}
        {tip && <span className={classes.tip}>{tip}</span>}
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
