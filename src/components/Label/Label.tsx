/** Label.tsx */
import type React from "react";
import type { AlignPos } from "../types";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
/* = Style API. */
import { st, classes } from "./label.st.css";

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: React.ReactNode;
  /** Hint can take a React node which is placed inside the internal HintText.*/
  hint?: React.ReactNode;
  /** The position of the label relative to the input. */
  inputPos?: AlignPos;
  /** Visually hides the labelText container within Label. */
  visuallyHidden?: boolean;
  /** An optional input to shove inside the label. */
  inputControl?: React.ReactNode;
}

const Label: React.VFC<LabelProps> = ({
  className: classNameProp,
  inputControl,
  children,
  inputPos = undefined,
  hint,
  visuallyHidden,
  ...attrs
}) => {
  const hasInput: boolean = inputControl ? true : false;
  const labelText = <span className={classes.labelText}>{children}</span>;
  return (
    <label
      className={st(classes.root, { inputPos, hasInput }, classNameProp)}
      {...attrs}
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
