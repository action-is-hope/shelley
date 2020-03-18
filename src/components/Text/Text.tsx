/* Text.tsx */
import React from "react";
import { TextVolume } from "../types";
import style from "./text.st.css";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

export interface TextProps extends React.HTMLAttributes<HTMLBaseElement> {
  tag: string;
  bold?: boolean;
  htmlFor?: string;
  truncate?: boolean;
  uppercase?: boolean;
  weight?: 1 | 2 | 3 | 5;
  visuallyHidden?: boolean;
  vol?: TextVolume;
}

const Text = ({
  tag: tagName,
  children,
  className,
  truncate = false,
  uppercase,
  visuallyHidden,
  weight,
  vol = 3,
  ...rest
}: TextProps) => {
  const rootClassNames = classNames(style.root, style["vol" + vol], className, {
    uppercase,
    weight
  });
  // eslint-disable-next-line react/no-danger-with-children
  const text = React.createElement(
    tagName,
    {
      ...style(rootClassNames, { truncate }, rest),
      ...rest
    },
    children
  );
  return visuallyHidden ? <VisuallyHidden>{text}</VisuallyHidden> : text;
};

type TextExports = Pick<TextProps, Exclude<keyof TextProps, "tag">>;

export const H1 = ({ children, ...rest }: TextExports) => (
  <Text tag="h1" vol={8} {...rest}>
    {children}
  </Text>
);
export const H2 = ({ children, ...rest }: TextExports) => (
  <Text tag="h2" vol={7} {...rest}>
    {children}
  </Text>
);
export const H3 = ({ children, ...rest }: TextExports) => (
  <Text tag="h3" vol={6} {...rest}>
    {children}
  </Text>
);
export const H4 = ({ children, ...rest }: TextExports) => (
  <Text tag="h4" vol={5} {...rest}>
    {children}
  </Text>
);
export const H5 = ({ children, ...rest }: TextExports) => (
  <Text tag="h5" vol={4} {...rest}>
    {children}
  </Text>
);
export const H6 = ({ children, ...rest }: TextExports) => (
  <Text tag="h6" vol={4} {...rest}>
    {children}
  </Text>
);
export const P = ({ children, ...rest }: TextExports) => (
  <Text tag="p" {...rest}>
    {children}
  </Text>
);

export default Text;
