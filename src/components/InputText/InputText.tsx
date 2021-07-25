import React from "react";
import type { TextInputType } from "../types";
// import Textarea, { TextareaProps } from "react-expanding-textarea";
import InputBase, { InputBaseProps } from "../InputBase/InputBase";
/* = Style API. */
import { classes } from "./inputText.st.css";

// export interface InputTextProps
//   extends Pick<
//       React.HTMLProps<HTMLInputElement>,
//       Exclude<keyof React.HTMLProps<HTMLInputElement>, "label">
//     >,
//     InputBaseProps {

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
export interface InputTextProps
  extends Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "onChange">
    >,
    InputBaseProps {
  /**
   * The `id` is required to associate fields with labels programatically for better
   * UX and a legal requirement for accessibility.
   * */
  id: string;
  /** Use in conjustion with type="textarea" to pre-set the rows rendered. */
  rows?: number;
  /** The type of input control to render. */
  type?: TextInputType;
  onChange?: (e: React.ChangeEvent) => void;
}

const InputText = React.forwardRef(
  (
    {
      // className: classNameProp,
      id,
      disabled,
      error,
      touched,
      hint,
      variant,
      label,
      onChange,
      labelVisuallyHidden,
      startAdornment,
      // endAdornment,
      vol,
      rows = 0,
      type = "text",
    }: // ...rest
    InputTextProps,
    ref?: React.Ref<any>
  ) => {
    // Set the type to textarea if rows is above 0.
    const input: React.ReactNode =
      type === "textarea" || rows > 0 ? (
        // span > textarea is valid mark up -as we want to mimic an inline input.
        <textarea {...{ onChange, rows }} />
      ) : (
        // InputBase applies id, disabled and sets error related aria attrs.
        <input {...{ id, disabled, onChange, ref }} type={type} />
      );

    return (
      <InputBase
        {...{
          id,
          disabled,
          error,
          touched,
          label,
          labelVisuallyHidden,
          startAdornment,
          // endAdornment,
          hint,
          variant,
          vol,
        }}
        className={`${classes.root} ${classes[type]}`}
      >
        {input}
      </InputBase>
    );
  }
);

export default InputText;

InputText.displayName = "InputText";
