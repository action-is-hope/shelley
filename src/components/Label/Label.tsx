/** Label.tsx */
import type React from "react";
import type { VFC, ReactNode } from "react";
import type { AlignPos } from "../types";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
/* = Style API. */
import { st, classes } from "./label.st.css";

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: ReactNode;
  /** The position of the label relative to the input. */
  inputPosition?: AlignPos;
  /** Wraps the label text in VisuallyHidden container. */
  visuallyHidden?: boolean;
  /** An optional input to shove inside the label. */
  inputControl?: ReactNode;
}

export const Label: VFC<LabelProps> = ({
  className: classNameProp,
  inputControl,
  children,
  inputPosition = undefined,
  visuallyHidden,
  ...rest
}) => {
  const hasInput: boolean = inputControl ? true : false;
  const labelText = <span className={classes.labelText}>{children}</span>;
  return (
    <label
      className={st(classes.root, { inputPosition, hasInput }, classNameProp)}
      {...rest}
    >
      {visuallyHidden ? (
        <VisuallyHidden>{labelText}</VisuallyHidden>
      ) : (
        labelText
      )}
      {inputControl && inputControl}
    </label>
  );
};

export default Label;
