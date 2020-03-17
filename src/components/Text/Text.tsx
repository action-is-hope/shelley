/* Text.tsx */
import React from "react";
import { TextVolume } from "../types";
import style from "./text.st.css";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

export interface TextProps extends React.HTMLAttributes<HTMLBaseElement> {
  as: string;
  bold?: boolean;
  htmlFor?: string;
  dangerouslySetInnerHTML?: { __html: string };
  truncate?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  visuallyHidden?: boolean;
  vol?: TextVolume;
}

const Text = ({
  as: tagName,
  bold,
  children,
  className,
  dangerouslySetInnerHTML,
  truncate = false,
  uppercase,
  underline,
  visuallyHidden,

  vol = 3,
  ...rest
}: TextProps) => {
  const rootClassNames = classNames(style.root, style["vol" + vol], className, {
    bold,
    uppercase,
    underline
  });
  // eslint-disable-next-line react/no-danger-with-children
  const text = React.createElement(
    tagName,
    {
      ...style(rootClassNames, { truncate }, rest),
      dangerouslySetInnerHTML,
      ...rest
    },
    children
  );
  return visuallyHidden ? <VisuallyHidden>{text}</VisuallyHidden> : text;
};

type TextExports = Pick<TextProps, Exclude<keyof TextProps, "as">>;

export const H1 = ({ children, ...rest }: TextExports) => (
  <Text as="h1" vol={8} {...rest}>
    {children}
  </Text>
);
export const H2 = ({ children, ...rest }: TextExports) => (
  <Text as="h2" vol={7} {...rest}>
    {children}
  </Text>
);
export const H3 = ({ children, ...rest }: TextExports) => (
  <Text as="h3" vol={6} {...rest}>
    {children}
  </Text>
);
export const H4 = ({ children, ...rest }: TextExports) => (
  <Text as="h4" vol={5} {...rest}>
    {children}
  </Text>
);
export const H5 = ({ children, ...rest }: TextExports) => (
  <Text as="h5" vol={4} {...rest}>
    {children}
  </Text>
);
export const H6 = ({ children, ...rest }: TextExports) => (
  <Text as="h6" vol={4} {...rest}>
    {children}
  </Text>
);
export const P = ({ children, ...rest }: TextExports) => (
  <Text as="p" {...rest}>
    {children}
  </Text>
);

export default Text;
