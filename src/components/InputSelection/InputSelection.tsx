import React from "react";
import { Volume, SelectionControlType, AlignPos, Variant } from "../types";
import classnames from "classnames";
import style from "./inputSelection.st.css";
import Label from "../Label/Label";
import ErrorText from "../ErrorText/ErrorText";
import InputSelectionControl from "../InputSelectionControl/InputSelectionControl";

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface RadioCheckInputProps
  extends Pick<
    React.HTMLProps<HTMLInputElement>,
    Exclude<keyof React.HTMLProps<HTMLInputElement>, "label">
  > {
  /** Id is required to associate fields with labels programatically for better UX and a legal requirement for accessibility*/
  id: string;
  /** Provide an error message that triggers the stylable error state. */
  error?: React.ReactNode;
  /** Provide some hint text to the label component. */
  hint?: React.ReactNode;
  /** Triggers the Inputs stylable error state. */
  touched?: boolean;
  /** Variant index. */
  variant?: Variant;
  /** The label to associated with the input. */
  label: React.ReactNode;
  /** The position of the label relative to the label. */
  inputPos?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  labelVisuallyHidden?: boolean;
  /** How 'loud' should this input row be? */
  vol?: Volume;
  /** The type of slection control to render. */
  type?: SelectionControlType;
}

const InputSelection = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "NOID",
      disabled = false,
      error: errorMessage,
      touched = false,
      defaultChecked = false,
      type = "checkbox",
      hint,
      variant = 1,
      label,
      labelVisuallyHidden,
      inputPos = "end",
      vol = 3,
      ref: refProp, // Fix: compatability issue. Investigate.
      ...rest
    }: RadioCheckInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    id === "NOID" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nWe have applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
      );
    const error = errorMessage && touched ? true : false;

    const inputControl = (
      <InputSelectionControl
        {...{
          id,
          disabled,
          defaultChecked,
          error,
          ref,
          type,
          // Implements from Example 2: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
          "aria-describedby": error ? `${id}-error` : undefined,
          ...rest
        }}
      />
    );
    return (
      <div
        {...style(
          classnames(
            style.root,
            style[type],
            style["variant" + variant],
            style["vol" + vol],
            classNameProp
          ),
          { error, disabled },
          rest
        )}
      >
        {error && <ErrorText id={`${id}-error`}>{errorMessage}</ErrorText>}

        <Label
          htmlFor={id}
          hint={hint}
          inputControl={inputControl}
          visuallyHidden={labelVisuallyHidden}
          inputPos={inputPos}
        >
          {label}
        </Label>
      </div>
    );
  }
);

export default InputSelection;

InputSelection.displayName = "InputSelection";
