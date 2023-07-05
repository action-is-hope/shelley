import React, { forwardRef } from "react";
import { st, classes } from "./visuallyHidden.st.css";

export interface VisuallyHiddenProps extends React.HTMLProps<HTMLSpanElement> {
  visuallyHidden?: boolean;
  focusable?: boolean;
}

function VisuallyHidden(
  props: VisuallyHiddenProps,
  ref: React.Ref<HTMLSpanElement>
) {
  const { className: classNameProp, focusable = false, ...rest } = props;

  return (
    <span
      className={st(classes.root, { focusable }, classNameProp)}
      tabIndex={focusable ? 0 : undefined}
      ref={ref}
      {...rest}
    />
  );
}

/**
 * VisuallyHidden provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */
const _VisuallyHidden = forwardRef(VisuallyHidden);
export { _VisuallyHidden as VisuallyHidden };
