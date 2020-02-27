/** Blockquote.tsx */
import React from "react";
import style from "./blockquote.st.css";
import classNames from "classnames";
import { TextVolume } from "../types";
import Text from "../Text/Text";

interface BlockquoteProps
  extends Pick<
    React.HTMLProps<HTMLQuoteElement>,
    Exclude<keyof React.HTMLProps<HTMLQuoteElement>, "cite">
  > {
  accent?: number;
  children: React.ReactNode;
  cite?: React.ReactNode;
  citeAttr?: string;
  citeUrl?: string;
  variant?: number;
  citeVol?: TextVolume;
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
  // @todo: shuold be optional + need a 'opens in a new window' thingy.
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
