/** Blockquote.tsx */
import React from "react";
import style from "./blockquote.st.css";
import classNames from "classnames";

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
}

const Blockquote = ({
  accent = 1,
  children,
  cite: citeContent,
  citeAttr,
  citeUrl,
  className: classNameProp,
  variant = 1,
  ...rest
}: BlockquoteProps) => {
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
      <footer className={style.footer}>
        <cite className={style.cite}>{cite}</cite>
      </footer>
    </blockquote>
  );
};

export default Blockquote;
