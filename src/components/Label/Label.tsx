/** Label.tsx */
import React from "react";
import style from "./label.st.css";
import classNames from "classnames";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import HintText from "../HintText/HintText";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: React.ReactNode;
  hint?: React.ReactNode;
  visuallyHidden?: boolean;
  radioCheckInput?: React.ReactNode;
}

const Label = ({
  className: classNameProp,
  radioCheckInput,
  children,
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
          { [style.hasInput]: radioCheckInput },
          classNameProp
        ),
        {},
        rest
      )}
      {...rest}
    >
      {visuallyHidden ? (
        <VisuallyHidden>{labelText}</VisuallyHidden>
      ) : (
        labelText
      )}
      {/* {radioCheckInput && (
        <span className={style.radioCheckInput}>{radioCheckInput}</span>
      )} */}

      {radioCheckInput && radioCheckInput}
    </label>
  );
};

export default Label;
