import React from "react";
import { SelectionControlType } from "../types";
import classnames from "classnames";
/* = Style API. */
import { st, classes } from "./inputSelectionControl.st.css";

export interface InputSelectionControlProps
  extends React.HTMLProps<HTMLInputElement> {
  /** Provide an error message that triggers the stylable error state. */
  error?: boolean;
  /** The type of slection control to render. */
  type?: SelectionControlType;
}

const InputSelectionControl = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "NOID",
      disabled = false,
      error = false,
      type = "checkbox",
      defaultChecked = false,
      ...rest
    }: InputSelectionControlProps,
    ref?: React.Ref<HTMLInputElement>
  ) => (
    <span
      className={st(classnames(classes.root, classNameProp), {
        error,
        disabled,
        type
      })}
    >
      <input
        {...{
          id,
          className: classnames(classes.inputField, classes[type]),
          disabled,
          defaultChecked,
          ref,
          type: type === "radio" ? "radio" : "checkbox",
          // Implements from Example 2: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
          "aria-invalid": error ? true : undefined,
          ...rest
        }}
      />
    </span>
  )
);

export default InputSelectionControl;

InputSelectionControl.displayName = "InputSelectionControl";
