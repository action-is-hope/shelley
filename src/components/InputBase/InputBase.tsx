import React from "react";
import { Volume, Variant } from "../types";
import classnames from "classnames";
import style from "./inputBase.st.css";
import Label from "../Label/Label";
import ErrorText from "../ErrorText/ErrorText";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

// import { ButtonProps } from "@material-ui/core/Button";

// export type OwnProps = Omit<ButtonProps, "color" | "size"> & {
//   color: "primary" | "danger" | "warning" | "transparent";
//   size: "sm" | "lg";
// }

// class MyButton extends React.Component<OwnProps> {

// }

export type InputBaseProps = {
  /** Id is required to associate fields with labels programatically for better UX and a legal requirement for accessibility. */
  //  id: string;
  /** Provide an error message that triggers the stylable error state. */
  error?: React.ReactNode;
  /** Provide some hint text to the label component. */
  hint?: React.ReactNode;
  /** Triggers the Inputs stylable error state. */
  touched?: boolean;
  /** The label to associated with the input. */
  label: React.ReactNode;
  /** Variant index. */
  variant?: Variant;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  labelVisuallyHidden?: boolean;
  /** How loud should this input row be? */
  vol?: Volume;
};
// https://accessibility.blog.gov.uk/2016/07/22/using-the-fieldset-and-legend-elements/
/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface InputBaseInternalProps
  extends Pick<
      React.HTMLProps<HTMLBaseElement>,
      Exclude<keyof React.HTMLProps<HTMLBaseElement>, "label">
    >,
    InputBaseProps {}

const InputBase = ({
  id = "NOID",
  className: classNameProp,
  children,
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
  variant = 1,
  type = "text",
  vol = 3,
  ...rest
}: InputBaseInternalProps) => {
  id === "NOID" &&
    console.warn(
      `#a11y You have an input without an id suggesting you don't have a label associated properly with it via the for attribute.\n\nShelley has applied an id of 'NOID' to these inputs should you want to check the DOM.\n`
    );
  const error = errorMessage && touched ? true : false;

  const inputAttrs = {
    id,
    className: style.fieldInput,
    disabled,
    // Implements from Example 2: https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21.html
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined
    // ...rest
  };

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child as React.ReactElement<any>, { ...inputAttrs })
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
        rest //??
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

      <div className={style.fieldContainer}>{childrenWithProps}</div>
    </div>
  );
};

export default InputBase;

InputBase.displayName = "InputBase";
