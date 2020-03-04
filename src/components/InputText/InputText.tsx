import React from "react";
import classnames from "classnames";
import style from "./inputText.st.css";
import Label from "../Label/Label";
import { TextVolume, InputTypes } from "../types";
import Textarea from "react-expanding-textarea";

import InputAdornment from "../InputAdornment/InputAdornment";
import ErrorText from "../ErrorText/ErrorText";

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
  /** Use in conjustion with type="textarea" to pre-set the rows rendered. */
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

const InputText = React.forwardRef(
  (
    {
      id = "NOID",
      className: classNameProp,
      disabled = false,
      error: errorMessage,
      touched = false,
      children,
      hint,
      label = (
        <a href="https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H44">
          <code>label</code> is a Level A WCAG requirement.
        </a>
      ),
      labelVisuallyHidden = false,
      pattern,
      variant = 1,
      rows,
      startAdornment,
      endAdornment,
      type = "text",
      vol = 3,
      ...rest
    }: InputRowProps,
    // @todo: Cannot figure a way around not using any here, conditional refs seem a headache.
    ref?: React.Ref<HTMLInputElement>
    // ref?: React.Ref<any>
  ) => {
    id === "NOID" &&
      console.warn(
        `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nShelley has applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
      );
    const error = errorMessage && touched ? true : false;

    const input: React.ReactNode =
      type === "textarea" ? (
        /* Its a bit span'tastic as we want to an 'input (inline) but a textarea...? It's valid, Shelley checked. */
        <span className={style.textAreaWrap}>
          <Textarea
            aria-invalid={error ? true : false}
            className={style.fieldInput}
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
          className={style.fieldInput}
          disabled={disabled}
          id={id}
          type={type}
          // pattern="\d*"
          pattern={pattern}
          ref={ref}
          {...rest}
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
            {
              // [style.labelVisuallyHidden]: labelVisuallyHidden
            },
            classNameProp
          ),
          { error, disabled },
          rest
        )}
      >
        {error && touched && errorMessage && (
          <ErrorText>{errorMessage}</ErrorText>
        )}

        <Label htmlFor={id} hint={hint} visuallyHidden={labelVisuallyHidden}>
          {label}
        </Label>

        <div className={style.fieldContainer}>
          {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
          {input}
          {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
        </div>
      </div>
    );
  }
);

export default InputText;

InputText.displayName = "InputText";
