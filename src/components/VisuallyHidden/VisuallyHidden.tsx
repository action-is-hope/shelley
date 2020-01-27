/**
 * VisuallyHidden
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */

import React from "react";
import classnames from "classnames";
import style from "./visuallyHidden.st.css";

interface VisuallyHiddenProps extends React.HTMLProps<HTMLSpanElement> {
  visuallyHidden?: boolean;
  focusable?: boolean;
}

const VisuallyHidden = React.forwardRef(
  (
    { className, focusable, ...rest }: VisuallyHiddenProps,
    ref?: React.Ref<HTMLSpanElement>
  ) => (
    <span
      {...style(
        classnames(
          style.root,
          {
            [style.focusable]: focusable
          },
          className
        ),
        {},
        rest
      )}
      tabIndex={focusable ? 0 : undefined}
      ref={ref}
      {...rest}
    />
  )
);

VisuallyHidden.displayName = "VisuallyHidden";

export default VisuallyHidden;
