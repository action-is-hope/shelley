import React from "react";
import classnames from "classnames";
import style from "./inputRow.st.css";
import TextInput from "../TextInput/TextInput";
import Label from "../Label/Label";

interface InputRowProps extends React.HTMLProps<HTMLInputElement> {
  /** Triggers the Inputs stylable error state. */
  error?: boolean;
  touched?: boolean;
  /** Provides an expanding textarea instead on an input. */
  multiline?: boolean;
  /** Use in conjustion with multiline to pre-set the rows rendered. */
  rows?: number;
  /** Place a component so as to appear inside the TextInput start. */
  startAdornment?: React.ReactNode;
  /** Place a component so as to appear inside the TextInput end. */
  endAdornment?: React.ReactNode;
  hint?: React.ReactNode;
  // label: React.ReactNode;
  variant?: string;
  labelHidden?: boolean;
  vol?: string | number;
  inputLabel: React.ReactNode | string;
  errorMessage?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

const InputRow = React.forwardRef(
  (
    {
      id,
      className: classNameProp,
      // multiline,
      disabled = false,
      error = false,
      errorMessage,
      children,
      touched = false,
      hint,
      // rows,
      inputLabel,
      // startAdornment,
      // endAdornment,
      variant = "v1",
      labelHidden = false,
      vol = 3,

      ...rest
    }: InputRowProps,
    // Note: Currently react-expanding-textarea does not support refs.
    ref?: React.Ref<HTMLInputElement>
  ) => {
    console.log("we", error && !errorMessage);
    error &&
      !errorMessage &&
      console.warn(
        "You are setting an error state on a field without an error message."
      );
    const input = children ? (
      children
    ) : (
      <TextInput
        id={id || "NOID"}
        error={error && touched}
        ref={ref}
        {...rest}
      />
    );

    return (
      <div
        {...style(
          classnames(
            style.root,
            style[variant],
            style["vol" + vol],
            classNameProp,
            {
              [style.labelHidden]: labelHidden
            }
          ),
          { error, disabled },
          rest
        )}
      >
        {error && touched && errorMessage && (
          <div className={style.errorMessage}>{errorMessage}</div>
        )}
        <Label htmlFor={id} className={style.label}>
          <span className={style.labelText}>{inputLabel}</span>
          <span className={style.hintText}>{hint}</span>
        </Label>
        {input}
        {/* {hint && <div className={style.hint}>{hint}</div>} */}
        {/* {error && touched && <div className={style.error}>{error}</div>} */}
      </div>
    );
  }
);

export default InputRow;

InputRow.displayName = "InputRow";
