import React from "react";
import { Volume, TextInputType, Variant } from "../types";
import classnames from "classnames";
import style from "./inputText.st.css";
import Label from "../Label/Label";
import Textarea from "react-expanding-textarea";
import InputAdornment from "../InputAdornment/InputAdornment";
import ErrorText from "../ErrorText/ErrorText";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

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
  /** The label to associated with the input. */
  label: React.ReactNode;
  /** Variant index. */
  variant?: Variant;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  labelVisuallyHidden?: boolean;
  /** How loud should this input row be? */
  vol?: Volume;
  /** Takes a ref, always handy as and when you need it. */
  ref?: React.Ref<HTMLInputElement>;
  /** The type of input control to render. */
  type?: TextInputType;
}

const InputText = React.forwardRef(
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

    const inputAttrs = {
      id,
      className: style.fieldInput,
      disabled,
      pattern,
      ref,
      // Implements from Example 2: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
      ...rest
    };

    const input: React.ReactNode =
      type === "textarea" ? (
        /* span > -textarea is valid markup - Shelley checked as we eant to mimic an inline input. */
        <span className={style.textAreaWrap}>
          <Textarea {...inputAttrs} rows={rows} />
        </span>
      ) : (
        <input {...inputAttrs} type={type} />
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
        {error && <ErrorText id={`${id}-error`}>{errorMessage}</ErrorText>}

        {labelVisuallyHidden ? (
          <VisuallyHidden>
            <Label htmlFor={id} hint={hint}>
              {label}
            </Label>
          </VisuallyHidden>
        ) : (
          <Label htmlFor={id} hint={hint}>
            {label}
          </Label>
        )}

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
