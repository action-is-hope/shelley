import React, { ReactNode } from "react";
import { Volume, SelectionControlType, AlignPos, Variant } from "../types";
import classnames from "classnames";
import style from "./inputSelect.st.css";
import InputBase from "../InputBase/InputBase";
import { InputBaseProps } from "../InputBase/InputBase";

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface InputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    InputBaseProps {
  // children: ReactNode;
  // options: string;
  /** Id is required to associate fields with labels programatically for better UX and a legal requirement for accessibility*/
  id: string;
  // options: {
  //   value: string;
  //   name: string;
  // }[];
  // /** Provide an error message that triggers the stylable error state. */
  // error?: React.ReactNode;
  // /** Provide some hint text to the label component. */
  // hint?: React.ReactNode;
  // /** Triggers the Inputs stylable error state. */
  // touched?: boolean;
  // /** Variant index. */
  // variant?: Variant;
  // /** The label to associated with the input. */
  // label: React.ReactNode;
  // /** The position of the label relative to the label. */
  // inputPos?: AlignPos;
  // /** Visually hide the label so it is still accessible to assistive technologies. */
  // labelVisuallyHidden?: boolean;
  // /** How 'loud' should this input row be? */
  // vol?: Volume;
  // /** The type of slection control to render. */
  // type?: SelectionControlType;
}

const InputSelect = React.forwardRef(
  (
    {
      className: classNameProp,
      id,
      disabled,
      error,
      touched,
      hint,
      variant,
      label,
      labelVisuallyHidden,
      vol,
      children,
      // ref: refProp, // Fix: compatability issue. Investigate.
      ...rest
    }: InputSelectProps,
    ref?: React.Ref<HTMLSelectElement>
  ) => {
    // const error = errorMessage && touched ? true : false;

    return (
      <InputBase
        {...{
          id,
          disabled,
          error,
          touched,
          label,
          labelVisuallyHidden,
          hint,
          variant,
          vol
        }}
        className={classnames(style.root, classNameProp)}
        // {...style(
        //   classnames(style.select, classNameProp),
        //   // { error, disabled },{}
        //   {},
        //   rest
        // )}
      >
        <select
          {...{
            id,
            ref,
            disabled,
            ...rest
          }}
        >
          {children}
          {/* {options.map(
            (
              item: {
                value: string;
                name: string;
              },
              index: number
            ) => {
              return (
                <option key={item.id} value={item}>
                  {item}
                </option>
              );
            }
          )} */}
        </select>
      </InputBase>
    );
  }
);

export default InputSelect;

InputSelect.displayName = "InputSelect";
