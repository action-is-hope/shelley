/** Blockquote.tsx */
import React from "react";
import { Volume, Variant } from "../types";
import classnames from "classnames";
import Text from "../Text/Text";
/* = Style API. */
import { st, classes } from "./blockquote.st.css";

interface BlockquoteProps
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

const Blockquote = ({
  children,
  cite,
  citeAttr,
  citeVol = 2,
  className: classNameProp,
  variant,
  ...rest
}: BlockquoteProps) => {
  const rootClassNames = classnames(
    classes.root,
    classes["variant" + variant],
    classNameProp
  );
  return (
    <blockquote
      className={st(rootClassNames)}
      // {...style(
      //   classNames(style.root, style["variant" + variant], classNameProp),
      //   {},
      //   rest
      // )}
      cite={citeAttr}
      {...rest}
    >
      <div className={classes.content}>{children}</div>
      {cite && (
        <footer className={classes.footer}>
          <Text tag="cite" vol={citeVol} className={classes.cite}>
            {cite}
          </Text>
        </footer>
      )}
    </blockquote>
  );
};

export default Blockquote;
