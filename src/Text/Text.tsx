import React, { forwardRef } from "react";
import type { TextVolume } from "../typings/shared-types";
import { VisuallyHidden } from "../VisuallyHidden";
import { st, classes } from "./text.st.css";

export interface TextProps extends React.HTMLAttributes<HTMLBaseElement> {
  /**
   * Element type to render as
   * @default span
   */
  elementType: string;
  /** Truncate text to specified line number. */
  truncate?: boolean | number;
  /** Toggles uppercase. */
  uppercase?: boolean;
  /** Set the weight. */
  weight?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
  /** Visually hides the element, visible to screen readers. */
  visuallyHidden?: boolean;
  /**
   * How 'loud' should this Text be?
   * @default 3
   */
  vol?: TextVolume;
  displayName?: string;
}

function Text(props: TextProps, ref: React.Ref<HTMLBaseElement>) {
  const {
    elementType = "span",
    children,
    className: classNameProp,
    truncate = false,
    uppercase = false,
    visuallyHidden,
    weight = undefined,
    vol = 3,
    ...rest
  } = props;
  const text = React.createElement(
    elementType,
    {
      className: st(
        classes.root,
        {
          truncate: truncate !== false,
          weight,
          uppercase,
          vol: vol !== false ? vol : undefined,
          lineClamp: typeof truncate === "number" ? truncate : undefined,
        },
        classNameProp
      ),
      ref: ref,
      ...rest,
    },
    children
  );
  return visuallyHidden ? <VisuallyHidden>{text}</VisuallyHidden> : text;
}
Text.displayName = "Text";

const _Text = forwardRef(Text);
export { _Text as Text };
