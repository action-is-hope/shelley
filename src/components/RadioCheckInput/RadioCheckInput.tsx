import React from "react";
import classnames from "classnames";
import style from "./radioCheckInput.st.css";
import Label from "../Label/Label";
import { SPAN } from "../Text/Text";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

// interface RadioCheckInputProps extends React.HTMLProps<HTMLInputElement> {
/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface RadioCheckInputProps
  extends Pick<
    React.HTMLProps<HTMLInputElement>,
    Exclude<keyof React.HTMLProps<HTMLInputElement>, "label">
  > {
  id: string;
  /** Triggers the Inputs stylable error state. */
  error?: boolean;
  /** Provides an expanding textarea instead on an input. */
  variant?: string;
  // vol?: string | number;
  // label?: React.ReactNode;
  // labelVisuallyHidden?: boolean;
  type?: "radio" | "checkbox" | "switch";
}

const RadioCheckInput = React.forwardRef(
  (
    {
      className: classNameProp,
      id = "NOID",
      disabled = false,
      error = false,
      defaultChecked = false,
      type = "checkbox",
      variant = "v1",
      // label,
      // labelVisuallyHidden,
      // vol = 3,
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

    // const checkedState =
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
        <input
          aria-invalid={error ? true : false}
          className={style.input}
          disabled={disabled}
          defaultChecked={defaultChecked}
          id={id}
          ref={ref}
          type={type === "radio" ? "radio" : "checkbox"}
          {...rest}
        />
        <span className={style.controlContainer}>
          <span className={style.control}></span>
        </span>
      </span>
    );
  }
);

export default RadioCheckInput;

RadioCheckInput.displayName = "RadioCheckInput";
