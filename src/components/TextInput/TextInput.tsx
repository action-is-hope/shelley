import React from "react";
import classnames from "classnames";
import style from "./textInput.st.css";
import Textarea from "react-expanding-textarea";
import { TextVolume, InputTypes } from "../types";

interface TextInputRef extends React.HTMLProps<HTMLInputElement> {
  cols?: number;
  rows?: number;
  textLength?: number;
  wrap?: string;
}

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  /** Triggers the Inputs stylable error state. */
  error?: boolean;
  /** Provides an expanding textarea instead on an input. */
  // multiline?: boolean;
  /** Use in conjustion with multiline to pre-set the rows rendered. */
  rows?: number;
  cols?: number;
  textLength?: number;
  wrap?: string;
  /** Place a component so as to appear inside the TextInput start. */
  startAdornment?: React.ReactNode;
  /** Place a component so as to appear inside the TextInput end. */
  endAdornment?: React.ReactNode;
  variant?: number;
  // vol?: TextVolume;
  type?: InputTypes | "textarea";
}

// Demo using this https://www.npmjs.com/package/react-number-format ?
const InputAdornment = ({
  children,
  ...rest
}: React.HTMLProps<HTMLInputElement>) => {
  return (
    <span className={style.adornment} {...rest}>
      {children}
    </span>
  );
};

const TextInput = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "NOID",
      // multiline,
      disabled = false,
      error = false,
      rows = 1,
      type = "text",
      startAdornment,
      endAdornment,
      variant = 1,
      ...rest
    }: TextInputProps,
    // @todo: Cannot figure a way around not using any here, conditional refs seem a headache.
    ref?: React.Ref<any>
  ) => {
    id === "NOID" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nShelley has applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
      );

    const Input: React.ReactNode =
      type === "textarea" ? (
        /* Its a bit span'tastic as we want to an 'input (inline) but a textarea...? It's valid, Shelley checked. */
        <span className={style.textAreaWrap}>
          <Textarea
            aria-invalid={error ? true : false}
            className={style.input}
            disabled={disabled}
            id={id}
            rows={rows}
            ref={ref}
            {...rest}
          />
        </span>
      ) : (
        <input
          aria-invalid={error ? true : false}
          className={style.input}
          disabled={disabled}
          id={id}
          type={type}
          // pattern="\d*"
          ref={ref}
          {...rest}
        />
      );

    return (
      <span
        {...style(
          classnames(
            style.root,
            style["variant" + variant],
            style[type],
            classNameProp
          ),
          { error, disabled },
          rest
        )}
      >
        {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
        {Input}
        {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
      </span>
    );
  }
);

export default TextInput;

TextInput.displayName = "TextInput";
