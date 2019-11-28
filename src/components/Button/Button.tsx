import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./button.st.css";

/**
 * Button props extending those of a regualr button.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;

  /** Type of the button default, primary..*/
  colour: string;

  /** Button sizes: xs, sm, md, lg */
  size: string;

  /** Button variant: heavy, default, light */
  variant: string;
}

const defaultProps = {
  colour: "default",
  size: "md",
  variant: "default"
};

const Button = ({
  children,
  colour,
  size,
  className: classNameProp,
  variant,
  ...rest
}: ButtonProps) => {
  const rootClassNames = classNames(
    style.root,
    style[colour],
    style[size],
    style[variant],
    classNameProp
  );

  return (
    <button {...style(rootClassNames, {}, rest)} {...rest}>
      <span className={style.inner}>{children}</span>
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
