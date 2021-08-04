/** Blockquote.tsx */
import type React from "react";
import type { Volume, Variant } from "../types";
import Text from "../Text/Text";
/* = Style API. */
import { st, classes } from "./blockquote.st.css";

export interface BlockquoteCustomProps {
  children: React.ReactNode;
  /** Describe the quote with inline elemnts like cite and/or links to the source. */
  desc?: React.ReactNode;
  /** Changes the volume of the description. */
  descVol?: Volume;
  /** Variant index. */
  variant?: Variant;
}

export type BlockquoteProps = BlockquoteCustomProps &
  React.HTMLAttributes<HTMLQuoteElement>;

const Blockquote: React.VFC<BlockquoteProps> = ({
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
