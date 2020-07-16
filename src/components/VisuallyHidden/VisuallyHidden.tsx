/**
 * VisuallyHidden - VisuallyHidden.tsx
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */

import React from "react";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./visuallyHidden.st.css";

interface VisuallyHiddenProps extends React.HTMLProps<HTMLSpanElement> {
  visuallyHidden?: boolean;
  focusable?: boolean;
}

const VisuallyHidden = React.forwardRef(
  (
    { className: classNameProp, focusable, ...rest }: VisuallyHiddenProps,
    ref?: React.Ref<HTMLSpanElement>
  ) => {
    const rootClassNames = classnames(
      classes.root,
      {
        [classes.focusable]: focusable
      },
      classNameProp
    );
    return (
      <span
        className={st(rootClassNames)}
        tabIndex={focusable ? 0 : undefined}
        ref={ref}
        {...rest}
      />
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";

export default VisuallyHidden;
