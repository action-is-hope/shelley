import React, { forwardRef } from "react";
import classnames from "classnames";
import style from "./inputRow.st.css";
import TextInput from "../TextInput/TextInput";
import Label from "../Label/Label";
import { TextVolume, InputTypes } from "../types";
import RadioCheckInput from "../RadioCheckInput/RadioCheckInput";

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface InputRowProps
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
  /** Provides an expanding textarea instead on an input. */
  multiline?: boolean;
  /** Use in conjustion with multiline to pre-set the rows rendered. */
  rows?: number;
  /** Place a component so as to appear inside the TextInput start. */
  startAdornment?: React.ReactNode;
  /** Place a component so as to appear inside the TextInput end. */
  endAdornment?: React.ReactNode;
  /** Place a component so as to appear inside the TextInput end. */
  label: React.ReactNode;
  variant?: number;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  labelVisuallyHidden?: boolean;
  /** How loud should this input row be? */
  vol?: TextVolume;
  /** Takes a ref, always handy as and when you need it. */
  ref?: React.Ref<HTMLInputElement>;
  type?: InputTypes;
}

// forwardRef<Ref, Props>((props, ref) => (

// ))

const InputRow = React.forwardRef(
  (
    {
      id = "NOID",
      className: classNameProp,
      disabled = false,
      error: errorMessage,
      touched = false,
      hint,
      label = (
        <span>
          Label is a required value.
          <br />
          <a href="https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H44">
            It is a legal requirement in many countries as a Level A WCAG
            requirement.
          </a>
          <br />
          Not that you would know it looking at the state of a lot of forms on
          the web!
          <br />
          Use in conjuntion with <code>labelVisuallyHidden</code>
        </span>
      ),
      labelVisuallyHidden = false,
      variant = 1,
      type = "text",
      vol = 3,
      ...rest
    }: InputRowProps,
    // Note: Currently react-expanding-textarea does not support refs.
    // @todo fix it!
    ref?: React.Ref<HTMLInputElement>
  ) => {
    id === "NOID" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nShelley has applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
      );
    const error = errorMessage && touched ? true : false;

    const inputType =
      type === "checkbox" || type === "radio" || type === "switch"
        ? "radioCheckInput"
        : "TextInput";
    const input =
      inputType === "radioCheckInput" ? (
        <RadioCheckInput
          id={id || "NOID"}
          error={error}
          ref={ref}
          type={
            type === "checkbox" || type === "radio" || type === "switch"
              ? type
              : undefined
          }
          {...rest}
        />
      ) : (
        <TextInput
          /**
           * InputRow can be used with RadioCheckbox so id is not required
           * however if you omit and id when using as a text input a NOID is
           * applied and picked up as a warning within that field. This will
           * probably change.
           */
          id={id || "NOID"}
          error={error}
          ref={ref}
          type={type}
          {...rest}
        />
      );

    return (
      <div
        {...style(
          classnames(
            style.root,
            style["variant" + variant],
            style["vol" + vol],
            style[type],
            {
              // [style[type]]: type,
              [style.labelVisuallyHidden]: labelVisuallyHidden
            },
            classNameProp
          ),
          { error, disabled },
          rest
        )}
      >
        {error && touched && errorMessage && (
          <div className={style.errorMessage}>{errorMessage}</div>
        )}

        <Label
          htmlFor={id}
          hint={hint}
          // visuallyHidden={labelVisuallyHidden}
          className={style.label}
          radioCheckInput={inputType === "radioCheckInput" && input}
        >
          {label}
        </Label>

        {inputType !== "radioCheckInput" && input}
        {/* {hint && <div className={style.hint}>{hint}</div>} */}
        {/* {error && touched && <div className={style.error}>{error}</div>} */}
      </div>
    );
  }
);

export default InputRow;

InputRow.displayName = "InputRow";
