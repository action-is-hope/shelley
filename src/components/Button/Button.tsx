import React, { ReactNode } from "react";
import classnames from "classnames";
import style from "./button.st.css";

/**
 * Button props extending those of a regualr button.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;

  /** Type of the button default, primary..*/
  color: string;

  /** Button sizes: xs, sm, md, lg */
  size: string;

  /** Button variant: heavy, default, light */
  variant: string;
}

const defaultProps = {
  color: "default",
  size: "md",
  variant: "default"
};

const Button = ({
  children,
  color,
  size,
  className: classNameProp,
  variant,
  ...rest
}: ButtonProps) => {
  const rootClassNames = classnames(
    style.root,
    style[color],
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
