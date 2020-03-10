import React from "react";
import classnames from "classnames";
import style from "./inputSelection.st.css";
import Label from "../Label/Label";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import { TextVolume, InputTypes } from "../types";

// interface RadioCheckInputProps extends React.HTMLProps<HTMLInputElement> {
/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface RadioCheckInputProps
  extends Pick<
    React.HTMLProps<HTMLInputElement>,
    Exclude<keyof React.HTMLProps<HTMLInputElement>, "label">
  > {
  id: string;
  /** Triggers the stylable error state. */
  error?: boolean;
  /** Provide some hint text in addition to the label. */
  hint?: React.ReactNode;
  /** Variant index. */
  variant?: number;
  /** The label to associated with the input. */
  label: React.ReactNode;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  labelVisuallyHidden?: boolean;
  /** How 'loud' should this input row be? */
  vol?: TextVolume;
  /** The type of slection control to render. */
  type?: "radio" | "checkbox" | "switch" | "toggle";
}

const InputSelection = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "NOID",
      disabled = false,
      error = false,
      defaultChecked = false,
      type = "checkbox",
      hint,
      variant = 1,
      label,
      labelVisuallyHidden,
      vol = 3,
      // onChange,
      ...rest
    }: RadioCheckInputProps,
    // Note: Currently react-expanding-textarea does not support refs.
    ref?: React.Ref<HTMLInputElement>
  ) => {
    id === "NOID" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nWe have applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
      );

    const inputField = (
      <span
        {...style(classnames(style.inputContainer), { error, disabled }, rest)}
      >
        <input
          aria-invalid={error ? true : false}
          className={classnames(style.inputField, style[type])}
          disabled={disabled}
          defaultChecked={defaultChecked}
          id={id}
          ref={ref}
          type={type === "radio" ? "radio" : "checkbox"}
          {...rest}
        />
      </span>
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
        <Label
          htmlFor={id}
          hint={hint}
          radioCheckInput={inputField}
          visuallyHidden={labelVisuallyHidden}
        >
          {label}
        </Label>
      </div>
    );
  }
);

export default InputSelection;

InputSelection.displayName = "InputSelection";
