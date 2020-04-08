/* Text.tsx */
import React from "react";
import { TextVolume } from "../types";
import style from "./text.st.css";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

export interface TextProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML tag to render as this Text item. */
  tag: string;
  /** Single line truncation - requires a 'known' width. */
  truncate?: boolean;
  /** Toggles uppercase styles. */
  uppercase?: boolean;
  /** Set the weight index. */
  weight?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | false;
  /** Visually hides the element, visible to screen readers. */
  visuallyHidden?: boolean;
  /** How 'loud' should this Text be? */
  vol?: TextVolume;
}

const Text = React.forwardRef(
  (
    {
      tag: tagName,
      children,
      className,
      truncate = false,
      uppercase,
      visuallyHidden,
      weight = false,
      vol = 3,
      ...rest
    }: TextProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => {
    const rootClassNames = classNames(
      style.root,
      style["vol" + vol],
      className,
      {
        uppercase
      }
    );

    const text = React.createElement(
      tagName,
      {
        ...style(rootClassNames, { truncate, weight }, rest),
        ref: ref,
        ...rest
      },
      children
    );
    return visuallyHidden ? <VisuallyHidden>{text}</VisuallyHidden> : text;
  }
);

Text.displayName = "Text";

type TextExports = Pick<TextProps, Exclude<keyof TextProps, "tag">>;

interface TestProps
  extends React.BaseHTMLAttributes<HTMLBaseElement>,
    TextExports {}

export const H1 = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="h1" vol={8} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H1.displayName = "H1";

export const H2 = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="h2" vol={7} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H2.displayName = "H2";

export const H3 = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="h3" vol={6} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H3.displayName = "H3";

export const H4 = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="h4" vol={5} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H4.displayName = "H4";

export const H5 = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="h5" vol={4} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H5.displayName = "H5";

export const H6 = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="h6" vol={4} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H6.displayName = "H6";

export const P = React.forwardRef(
  ({ children, ...rest }: TestProps, ref?: React.Ref<HTMLBaseElement>) => (
    <Text tag="p" ref={ref} {...rest}>
      {children}
    </Text>
  )
);
P.displayName = "P";

export default Text;
