import React from "react";
import classnames from "classnames";
import style from "./inputRow.st.css";
import TextInput from "../TextInput/TextInput";
import Label from "../Label/Label";
import { TextVolume, InputTypes } from "../types";
import RadioCheckInput from "../RadioCheckInput/RadioCheckInput";

// https://accessibility.blog.gov.uk/2016/07/22/using-the-fieldset-and-legend-elements/
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
        <a href="https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H44">
          label is a Level A WCAG requirement.
        </a>
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

        {/* 
        Debating this one... It is legal to have multiple labels for the same input
        and this feels like a nice way to present error messages, Ideally we would render
        inside of the same label but this is too limiting. 

        Reports like this are interesting...
        https://stackoverflow.com/questions/2829936/can-an-input-field-have-two-labels

        "It's not a "common" approach, and because of that at least one common screen 
        reader (I tested with NVDA) only reads the first label when you shift focus 
        into the field -- it ignores any additional labels for the same field."
        - Rob Whelan

        Sounds like Rob knows his stuff

        Should write this into the label docs, at least a ref too:
        https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute

         {error && touched && errorMessage && (
          <label htmlFor={id} className={style.errorMessage}>
            {errorMessage}
          </label>
        )} */}

        <Label
          htmlFor={id}
          hint={hint}
          // visuallyHidden={labelVisuallyHidden}
          radioCheckInput={inputType === "radioCheckInput" && input}
        >
          {label}
        </Label>

        {inputType !== "radioCheckInput" && input}
        {/* {hint && <div className={style.hint}>{hint}</div>} */}
      </div>
    );
  }
);

export default InputRow;

InputRow.displayName = "InputRow";
