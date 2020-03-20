/** Label.tsx */
import React from "react";
import { AlignPos } from "../types";
import style from "./label.st.css";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import HintText from "../HintText/HintText";

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
    <span className={style.labelTextContainer}>
      <span className={style.labelText}>{children}</span>
      {hint && <HintText>{hint}</HintText>}
    </span>
  );

  return (
    <label
      {...style(
        classNames(
          style.root,
          { [style.hasInput]: inputControl },
          classNameProp
        ),
        { inputPos },
        attrs
      )}
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
