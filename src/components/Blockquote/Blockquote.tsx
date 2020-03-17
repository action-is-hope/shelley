/** Blockquote.tsx */
import React from "react";
import { Accent, Volume, Variant } from "../types";
import style from "./blockquote.st.css";
import classNames from "classnames";

import Text from "../Text/Text";

interface BlockquoteProps
  extends Pick<
    React.HTMLProps<HTMLQuoteElement>,
    Exclude<keyof React.HTMLProps<HTMLQuoteElement>, "cite">
  > {
  accent?: Accent;
  children: React.ReactNode;
  cite?: React.ReactNode;
  citeAttr?: string;
  citeUrl?: string;
  variant?: Variant;
  citeVol?: Volume;
}

const Blockquote = ({
  accent,
  children,
  cite: citeContent,
  citeAttr,
  citeUrl,
  citeVol,
  className: classNameProp,
  variant,
  ...rest
}: BlockquoteProps) => {
  // @todo: should be optional + need a 'opens in a new window' thingy which we need to make.
  const cite = citeUrl ? (
    <a href={citeUrl} target="_blank" rel="noopener noreferrer">
      {citeContent}
    </a>
  ) : (
    citeContent
  );
  return (
    <blockquote
      {...style(
        classNames(
          style.root,
          style["variant" + variant],
          style["accent" + accent],
          classNameProp
        ),
        {},
        rest
      )}
      cite={citeAttr}
      {...rest}
    >
      <div className={style.content}>{children}</div>
      {cite && (
        <footer className={style.footer}>
          <Text as="cite" vol={citeVol} className={style.cite}>
            {cite}
          </Text>
        </footer>
      )}
    </blockquote>
  );
};

export default Blockquote;
