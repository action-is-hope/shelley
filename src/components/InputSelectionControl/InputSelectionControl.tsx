import React from "react";
import { SelectionControlType } from "../types";
import classnames from "classnames";
import style from "./inputSelectionControl.st.css";

interface RadioCheckInputProps extends React.HTMLProps<HTMLInputElement> {
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
    }: RadioCheckInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => (
    <span
      {...style(
        classnames(style.root, classNameProp),
        { error, disabled },
        rest
      )}
    >
      <input
        {...{
          id,
          className: classnames(style.inputField, style[type]),
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
