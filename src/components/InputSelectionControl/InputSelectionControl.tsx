import React from "react";
import type { SelectionControlType } from "../types";
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
      disabled = false,
      error = false,
      type = "checkbox",
      ...rest
    }: InputSelectionControlProps,
    ref?: React.Ref<HTMLInputElement>
  ) => (
    <span
      className={st(
        classes.root,
        {
          error,
          disabled,
          type,
        },
        classNameProp
      )}
    >
      <input
        {...{
          className: classes.inputField,
          disabled,
          ref,
          type: type === "radio" ? "radio" : "checkbox",
          // Implements from Example 2: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
          "aria-invalid": error ? true : undefined,
          ...rest,
        }}
      />
    </span>
  )
);

export default InputSelectionControl;

InputSelectionControl.displayName = "InputSelectionControl";
