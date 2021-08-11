/**
 * VisuallyHidden - VisuallyHidden.tsx
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */

import React from "react";
/* = Style API. */
import { st, classes } from "./visuallyHidden.st.css";

export interface VisuallyHiddenProps extends React.HTMLProps<HTMLSpanElement> {
  visuallyHidden?: boolean;
  focusable?: boolean;
}

const VisuallyHidden = React.forwardRef(
  (
    {
      className: classNameProp,
      focusable = false,
      ...rest
    }: VisuallyHiddenProps,
    ref?: React.Ref<HTMLSpanElement>
  ) => {
    return (
      <span
        className={st(classes.root, { focusable }, classNameProp)}
        tabIndex={focusable ? 0 : undefined}
        ref={ref}
        {...rest}
      />
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";

export default VisuallyHidden;
