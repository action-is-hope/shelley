/* Text.tsx */
import React from "react";
import { TextVolume } from "../types";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
/* = Style API. */
import { st, classes } from "./text.st.css";

export interface TextProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML as to render as this Text item. */
  as: string;
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
      as: tagName,
      children,
      className: classNameProp,
      truncate = false,
      uppercase = false,
      visuallyHidden,
      weight = false,
      vol = 3,
      ...rest
    }: TextProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => {
    const rootClassNames = classNames(classes.root, classNameProp);

    const text = React.createElement(
      tagName,
      {
        className: st(rootClassNames, { truncate, weight, uppercase, vol }),
        ref: ref,
        ...rest
      },
      children
    );
    return visuallyHidden ? <VisuallyHidden>{text}</VisuallyHidden> : text;
  }
);

Text.displayName = "Text";

type TextExports = Pick<TextProps, Exclude<keyof TextProps, "as">>;

interface TextExportsProps
  extends React.BaseHTMLAttributes<HTMLBaseElement>,
    TextExports {}

export const H1 = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="h1" vol={8} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H1.displayName = "H1";

export const H2 = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="h2" vol={7} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H2.displayName = "H2";

export const H3 = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="h3" vol={6} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H3.displayName = "H3";

export const H4 = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="h4" vol={5} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H4.displayName = "H4";

export const H5 = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="h5" vol={4} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H5.displayName = "H5";

export const H6 = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="h6" vol={4} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H6.displayName = "H6";

export const P = React.forwardRef(
  (
    { children, ...rest }: TextExportsProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => (
    <Text as="p" ref={ref} {...rest}>
      {children}
    </Text>
  )
);
P.displayName = "P";

export default Text;
