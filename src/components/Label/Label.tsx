/** Label.tsx */
import React from "react";
import { AlignPos } from "../types";
import style from "./label.st.css";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import HintText from "../HintText/HintText";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: React.ReactNode;
  hint?: React.ReactNode;
  /** The position of the label relative to the input. */
  inputPos?: AlignPos;
  visuallyHidden?: boolean;
  inputControl?: React.ReactNode;
}

const Label = ({
  className: classNameProp,
  inputControl,
  children,
  inputPos = false,
  hint,
  visuallyHidden,
  ...rest
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
        rest
      )}
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
