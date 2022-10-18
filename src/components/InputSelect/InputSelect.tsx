import React from "react";
import InputBase from "../InputBase/InputBase";
import type { InputBaseProps } from "../InputBase/InputBase";
/* = Style API. */
import { classes } from "./inputSelect.st.css";

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
export interface InputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    InputBaseProps {
  /**
   * The `id` is required to associate fields with labels programatically for better
   * UX and a legal requirement for accessibility.
   * */
  id: string;
}

const InputSelect = React.forwardRef(
  (
    {
      className: classNameProp,
      id,
      disabled,
      error,
      touched,
      startAdornment,
      // endAdornment,
      hint,
      variant,
      label,
      visuallyHideLabel,
      vol,
      children,
      ...attrs
    }: InputSelectProps,
    ref?: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <InputBase
        {...{
          id,
          disabled,
          error,
          touched,
          label,
          visuallyHideLabel,
          hint,
          variant,
          vol,
          startAdornment,
          // endAdornment Fiddly to do a nice job, parking support for native select.
        }}
        className={`${classes.root} ${classNameProp}`}
      >
        <select
          {...{
            // InputBase applies id, disabled and sets error related aria attrs.
            ref,
            ...attrs,
          }}
        >
          {children}
        </select>
      </InputBase>
    );
  }
);

export default InputSelect;

InputSelect.displayName = "InputSelect";
