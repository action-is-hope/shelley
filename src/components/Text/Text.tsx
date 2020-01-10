/* Text.tsx */
import React, { ReactNode } from "react";
import style from "./text.st.css";
import classNames from "classnames";

import { TextVolume } from "./";

interface TextProps {
  as: string;
  bold?: boolean;
  children?: ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  truncate?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  vol?: TextVolume;
  id?: string | undefined;
}

const Text = ({
  as: tagName,
  bold = false,
  children,
  dangerouslySetInnerHTML,
  id = undefined,
  truncate = false,
  uppercase = false,
  underline = false,
  vol = 3,
  className,
  ...rest
}: TextProps) => {
  const rootClassNames = classNames(style.root, style["v" + vol], className, {
    bold,
    uppercase,
    underline
  });
  // eslint-disable-next-line react/no-danger-with-children
  return React.createElement(
    tagName,
    {
      id,
      ...style(rootClassNames, { truncate }, rest),
      dangerouslySetInnerHTML
    },
    children
  );
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
export const PRE = ({ children, ...rest }: TextExports) => (
  <Text as="pre" {...rest}>
    {children}
  </Text>
);
export const SPAN = ({ children, ...rest }: TextExports) => (
  <Text as="span" {...rest}>
    {children}
  </Text>
);
export const Code = ({ children, ...rest }: TextExports) => (
  <Text as="code" {...rest}>
    {children}
  </Text>
);
export const Quote = ({ children, ...rest }: TextExports) => (
  <Text as="quote" {...rest}>
    {children}
  </Text>
);

export default Text;
