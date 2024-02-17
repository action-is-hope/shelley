import React from "react";
import type { ReactNode } from "react";
import type { TextVolume } from "../typings/shared-types";
import { Text } from "../Text";
import { st, classes } from "./blockquote.st.css";

export interface BlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  /* Describe the quote with inline elements like cite and/or links to the source. **/
  desc?: ReactNode | string;
  /** Changes the volume of the description. **/
  descVol?: TextVolume;
  /** Variant type. **/
  variant?: "informal" | "academic";
}

function Blockquote(props: BlockquoteProps, ref: React.Ref<HTMLQuoteElement>) {
  const {
    children,
    className: classNameProp,
    desc,
    descVol = 2,
    variant,
    ...rest
  } = props;

  return (
    <blockquote
      ref={ref}
      className={st(classes.root, { variant }, classNameProp)}
      {...rest}
    >
      <div className={classes.content}>{children}</div>
      {desc && (
        <Text elementType="footer" vol={descVol} className={classes.desc}>
          {desc}
        </Text>
      )}
    </blockquote>
  );
}

/**
 * Blockquote... */
const _Blockquote = React.forwardRef(Blockquote);
export { _Blockquote as Blockquote };
