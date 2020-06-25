/** Blockquote.tsx */
import React from "react";
import { Volume, Variant } from "../types";
import style from "./blockquote.st.css";
import classNames from "classnames";

import Text from "../Text/Text";

interface BlockquoteProps
  extends Pick<
    React.HTMLProps<HTMLQuoteElement>,
    Exclude<keyof React.HTMLProps<HTMLQuoteElement>, "cite">
  > {
  children: React.ReactNode;
  cite?: React.ReactNode;
  citeAttr?: string;
  variant?: Variant;
  citeVol?: Volume;
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
  return (
    <blockquote
      {...style(
        classNames(style.root, style["variant" + variant], classNameProp),
        {},
        rest
      )}
      cite={citeAttr}
      {...rest}
    >
      <div className={style.content}>{children}</div>
      {cite && (
        <footer className={style.footer}>
          <Text tag="cite" vol={citeVol} className={style.cite}>
            {cite}
          </Text>
        </footer>
      )}
    </blockquote>
  );
};

export default Blockquote;
