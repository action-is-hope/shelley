import { Text, TextProps } from "./Text";
import { forwardRef, Ref } from "react";

export type TextExports = Omit<TextProps, "as">;

export * from "./Text";

function H1(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="h1" ref={ref} vol={8} {...rest}>
      {children}
    </Text>
  );
}
/**
 * H1 is a page title and there should only be one on the page.
 */
const _H1 = forwardRef(H1);
H1.displayName = "H1";
export { _H1 as H1 };

function H2(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="h2" ref={ref} vol={7} {...rest}>
      {children}
    </Text>
  );
}
/**
 * H2 is a page heading level 2.
 */
const _H2 = forwardRef(H2);
H2.displayName = "H2";
export { _H2 as H2 };

function H3(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="h3" ref={ref} vol={6} {...rest}>
      {children}
    </Text>
  );
}
/**
 * H3 is a page heading level 3.
 */
const _H3 = forwardRef(H3);
H3.displayName = "H3";
export { _H3 as H3 };

function H4(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="h4" ref={ref} vol={5} {...rest}>
      {children}
    </Text>
  );
}
/**
 * H4 is a page heading level 4.
 */
const _H4 = forwardRef(H4);
H4.displayName = "H4";
export { _H4 as H4 };

function H5(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="h5" ref={ref} vol={4} {...rest}>
      {children}
    </Text>
  );
}
/**
 * H5 is a page heading level 5.
 */
const _H5 = forwardRef(H5);
H5.displayName = "H5";
export { _H5 as H5 };

function H6(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="h6" ref={ref} vol={4} {...rest}>
      {children}
    </Text>
  );
}
/**
 * H6 is a page heading level 6.
 */
const _H6 = forwardRef(H6);
H6.displayName = "H6";
export { _H6 as H6 };

function P(props: TextExports, ref: Ref<HTMLBaseElement>) {
  const { children, ...rest } = props;
  return (
    <Text as="p" ref={ref} {...rest}>
      {children}
    </Text>
  );
}
/**
 * P is a paragrapgh.
 */
const _P = forwardRef(P);
P.displayName = "P";
export { _P as P };
