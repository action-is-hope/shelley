import React from "react";
import classnames from "classnames";
import style from "./textInput.st.css";
import Textarea from "react-expanding-textarea";

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  /** Triggers the Inputs stylable error state. */
  error?: boolean;
  /** Provides an expanding textarea instead on an input. */
  multiline?: boolean;
  /** Use in conjustion with multiline to pre-set the rows rendered. */
  rows?: number;
  /** Place a component so as to appear inside the TextInput start. */
  startAdornment?: React.ReactNode;
  /** Place a component so as to appear inside the TextInput end. */
  endAdornment?: React.ReactNode;
  variant?: string;
  vol?: string | number;
}

const InputAdornment = ({
  children,
  ...rest
}: React.HTMLProps<HTMLInputElement>) => {
  return (
    <div className={style.adornment} {...rest}>
      {children}
    </div>
  );
};

const TextInput = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "NOID",
      multiline,
      disabled = false,
      error = false,
      rows,
      startAdornment,
      endAdornment,
      variant = "v1",
      vol = 3,
      ...rest
    }: TextInputProps,
    // Note: Currently react-expanding-textarea does not support refs.
    ref?: React.Ref<HTMLInputElement>
  ) => {
    id === "NOID" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nWe have applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
      );
    const InputType = multiline ? (
      <Textarea
        aria-invalid={error ? true : false}
        className={style.input}
        disabled={disabled}
        id={id}
        rows={rows}
        {...rest}
      />
    ) : (
      <input
        aria-invalid={error ? true : false}
        className={style.input}
        disabled={disabled}
        id={id}
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
            classNameProp
          ),
          { error, disabled },
          rest
        )}
      >
        {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
        {InputType}
        {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
      </div>
    );
  }
);

export default TextInput;

TextInput.displayName = "TextInput";
