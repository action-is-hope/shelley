import React from "react";
import type { Volume, SelectionControlType, AlignPos, Variant } from "../types";
import Label from "../Label/Label";
import { HelpText } from "../HelpText/HelpText";
import InputSelectionControl from "../InputSelectionControl/InputSelectionControl";
/* = Style API. */
import { st, classes } from "./inputSelection.st.css";

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
export interface InputSelectionProps
  extends Pick<
    React.HTMLProps<HTMLInputElement>,
    Exclude<keyof React.HTMLProps<HTMLInputElement>, "label">
  > {
  /** Provide an error message that triggers the stylable error state. */
  error?: React.ReactNode;
  /** Provide some hint text to the label component. */
  hint?: React.ReactNode;
  /** Triggers the Inputs stylable error state. */
  touched?: boolean;
  /** Variant index. */
  variant?: Variant;
  /** The label to associated with the input. */
  label?: React.ReactNode;
  /** The position of the label relative to the label. */
  inputPos?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** How 'loud' should this input be? */
  vol?: Volume;
  /** The type of slection control to render. */
  type?: SelectionControlType;
  /** Not entirely sure why this needs to ne defined... Investigate. */
  ref?: React.Ref<HTMLInputElement>;
}

const InputSelection = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "no-id",
      disabled = false,
      error: errorMessage,
      touched = false,
      // defaultChecked = undefined,
      type = "checkbox",
      hint,
      variant = 1,
      label,
      visuallyHideLabel,
      inputPos = "end",
      vol = 3,
      ...rest
    }: InputSelectionProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    id === "no-id" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nWe have applied an id of 'no-id' to these inputs should you want to check the DOM.\n`
      );
    const error = errorMessage && touched ? true : false;

    const inputControl = (
      <InputSelectionControl
        {...{
          id,
          disabled,
          // defaultChecked,
          error,
          ref,
          type,
          // Implements from Example 2: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
          "aria-describedby": error ? `${id}-error` : undefined,
          ...rest,
        }}
      />
    );

    return (
      <div
        className={st(
          classes.root,
          { variant, type, disabled, vol },
          classNameProp
        )}
      >
        {error && <HelpText description={"errorMessage"} />}

        {label ? (
          <Label
            htmlFor={id}
            {...{ hint, inputControl, inputPos }}
            visuallyHidden={visuallyHideLabel}
          >
            {label}
          </Label>
        ) : (
          inputControl
        )}
      </div>
    );
  }
);

export default InputSelection;

InputSelection.displayName = "InputSelection";
