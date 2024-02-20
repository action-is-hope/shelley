import React, { forwardRef } from "react";
import type { ReactNode } from "react";
import type { AlignPos } from "../typings/shared-types";
import { VisuallyHidden } from "../VisuallyHidden";
import { st, classes } from "./label.st.css";

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children?: ReactNode;
  /** The position of the label relative to the input. */
  inputPosition?: AlignPos;
  /** Wraps the label text in VisuallyHidden container. */
  visuallyHidden?: boolean;
  /** An optional input to shove inside the label. */
  inputControl?: ReactNode;
}

function Label(props: LabelProps, ref: React.Ref<HTMLLabelElement>) {
  const {
    className: classNameProp,
    inputControl,
    children,
    inputPosition = undefined,
    visuallyHidden,
    ...rest
  } = props;
  const hasInput: boolean = inputControl ? true : false;
  const text = children && <span className={classes.text}>{children}</span>;
  return (
    <label
      className={st(classes.root, { inputPosition, hasInput }, classNameProp)}
      ref={ref}
      {...rest}
    >
      {visuallyHidden ? <VisuallyHidden>{children}</VisuallyHidden> : text}
      {inputControl && inputControl}
    </label>
  );
}
Label.displayName = "Label";

/**
 * Label is for labeling form elements, mostly it should be styled by parents.
 */
const _Label = forwardRef(Label);
export { _Label as Label };
