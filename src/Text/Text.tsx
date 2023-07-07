import React, { Ref, forwardRef } from "react";
import type { TextVolume } from "../typings/shared-types";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
import { st, classes } from "./text.st.css";

export interface TextProps extends React.HTMLAttributes<HTMLBaseElement> {
  /**
   * HTML as to render as this Text item.
   * @default span
   */
  as: string;
  /** Truncate text to specified line number. */
  truncate?: boolean | number;
  /** Toggles uppercase. */
  uppercase?: boolean;
  /** Set the weight. */
  weight?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
  /** Visually hides the element, visible to screen readers. */
  visuallyHidden?: boolean;
  /**
   * How 'loud' should this Text be?
   * @default 3
   */
  vol?: TextVolume;
  displayName?: string;
}

export const Text = forwardRef(
  (
    {
      as: tagName = "span",
      children,
      className: classNameProp,
      truncate = false,
      uppercase = false,
      visuallyHidden,
      weight = undefined,
      vol = 3,
      ...rest
    }: TextProps,
    ref?: Ref<HTMLBaseElement>
  ) => {
    const text = React.createElement(
      tagName,
      {
        className: st(
          classes.root,
          {
            truncate: truncate !== false,
            weight,
            uppercase,
            vol: vol !== false ? vol : undefined,
            lineClamp: typeof truncate === "number" ? truncate : undefined,
          },
          classNameProp
        ),
        ref: ref,
        ...rest,
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

export const H1 = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="h1" vol={8} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H1.displayName = "H1";

export const H2 = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="h2" vol={7} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H2.displayName = "H2";

export const H3 = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="h3" vol={6} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H3.displayName = "H3";

export const H4 = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="h4" vol={5} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H4.displayName = "H4";

export const H5 = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="h5" vol={4} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H5.displayName = "H5";

export const H6 = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="h6" vol={4} ref={ref} {...rest}>
      {children}
    </Text>
  )
);
H6.displayName = "H6";

export const P = forwardRef(
  ({ children, ...rest }: TextExportsProps, ref?: Ref<HTMLBaseElement>) => (
    <Text as="p" ref={ref} {...rest}>
      {children}
    </Text>
  )
);
P.displayName = "P";
