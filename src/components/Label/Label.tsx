/** Label.tsx */
import React from "react";
import { AlignPos } from "../types";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import HintText from "../HintText/HintText";
/* = Style API. */
import { st, classes } from "./label.st.css";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
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

const Label = ({
  className: classNameProp,
  inputControl,
  children,
  inputPos = false,
  hint,
  visuallyHidden,
  ...attrs
}: LabelProps) => {
  const labelText = (
    <span className={classes.textContainer}>
      <span className={classes.labelText}>{children}</span>
      {hint && <HintText>{hint}</HintText>}
    </span>
  );

  const rootClassNames = classNames(
    classes.root,
    // { [classes.hasInput]: inputControl },
    classNameProp
  );

  const hasInput = inputControl ? true : false;

  return (
    <label className={st(rootClassNames, { inputPos, hasInput })} {...attrs}>
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
