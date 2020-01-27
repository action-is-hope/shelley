/** Blockquote.tsx */
import React from "react";
import style from "./blockquote.st.css";
import classNames from "classnames";
import Text from "../Text/Text";

interface LabelProps extends React.HTMLProps<HTMLQuoteElement> {
  children: React.ReactNode;
  variant?: number;
  citeUrl?: string;
}

const Blockquote = ({
  className: classNameProp,
  variant = 1,
  cite: citeText,
  citeUrl,
  children,
  ...rest
}: LabelProps) => {
  const cite = citeUrl ? (
    <a href={citeUrl} target="_blank" rel="noopener noreferrer">
      {citeText}
    </a>
  ) : (
    citeText
  );
  return (
    <blockquote
      {...style(
        classNames(style.root, style["variant" + variant], classNameProp),
        {},
        rest
      )}
      cite={citeText}
      {...rest}
    >
      <div className={style.content}>{children}</div>
      <footer className={style.footer}>
        <Text as="cite" vol={2} className={style.cite}>
          {cite}
        </Text>
      </footer>
    </blockquote>
  );
};

export default Blockquote;
