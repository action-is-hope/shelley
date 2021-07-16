/** Blockquote.tsx */
import type React from "react";
import type { Volume, Variant } from "../types";
import Text from "../Text/Text";
/* = Style API. */
import { st, classes } from "./blockquote.st.css";

export interface BlockquoteProps
  extends Pick<
    React.HTMLProps<HTMLQuoteElement>,
    Exclude<keyof React.HTMLProps<HTMLQuoteElement>, "cite">
  > {
  children: React.ReactNode;
  /** Chuck in a citation node rendered within a Text component. */
  cite?: React.ReactNode;
  /* = The text volume to use for the citation if provided. */
  citeAttr?: string;
  /* = The native, visually cite attr value. */
  citeVol?: Volume;
  /** Variant index. */
  variant?: Variant;
}

const Blockquote: React.VFC<BlockquoteProps> = ({
  children,
  cite,
  citeAttr,
  citeVol = 2,
  className: classNameProp,
  variant,
  ...rest
}) => (
  <blockquote
    className={st(classes.root, { variant }, classNameProp)}
    cite={citeAttr}
    {...rest}
  >
    <div className={classes.content}>{children}</div>
    {cite && (
      <footer className={classes.footer}>
        <Text as="cite" vol={citeVol} className={classes.cite}>
          {cite}
        </Text>
      </footer>
    )}
  </blockquote>
);

export default Blockquote;
