/** Blockquote.tsx */
import type React from "react";
import type { ReactNode, VFC } from "react";
import type { TextVolume } from "../types";
import Text from "../Text/Text";
/* = Style API. */
import { st, classes } from "./blockquote.st.css";

export interface BlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  /*
   * Describe the quote with inline elements like cite and/or links to the source.
   **/
  desc?: ReactNode | string;
  /**
   * Changes the volume of the description.
   **/
  descVol?: TextVolume;
  /**
   * Variant type.
   **/
  variant?: "informal" | "academic";
}

export const Blockquote: VFC<BlockquoteProps> = ({
  children,
  className: classNameProp,
  desc,
  descVol = 2,
  variant,
  ...rest
}) => (
  <blockquote
    className={st(classes.root, { variant }, classNameProp)}
    {...rest}
  >
    <div className={classes.content}>{children}</div>
    {desc && (
      <Text as="footer" vol={descVol} className={classes.desc}>
        {desc}
      </Text>
    )}
  </blockquote>
);

export default Blockquote;
