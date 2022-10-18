import type React from "react";

import {
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
  Children,
  HTMLAttributes,
} from "react";
import type { Volume, FieldVariants } from "../types";
import type { Validation } from "../../typings/shared-types";
import Label from "../Label/Label";
import { HelpText } from "../HelpText/HelpText";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import InputAdornment from "../InputAdornment/InputAdornment";
/* = Style API. */
import { st, classes } from "./inputBase.st.css";

export interface InputBaseProps extends Validation {
  /** Provide an error message that triggers the stylable error state. */
  errorMessage?: ReactNode;
  /** Provide some description or hint text to the field. */
  description?: ReactNode;
  /** Place a component so as to appear inside the TextInput start. */
  startAdornment?: ReactNode;
  /** Place a component so as to appear inside the TextInput end. */
  endAdornment?: ReactNode;
  /** The label to associated with the input. */
  label: ReactNode;
  /**
   * Position of the label.
   * @default "over"
   */
  labelPosition?: "top" | "side" | "over" | "hidden";
  /**
   * Disable the label transition.
   * @default false
   */
  disableLabelTransition?: boolean;
  /** Props for the label element. */
  labelProps?: HTMLAttributes<HTMLElement>;
  /**
   * Variant index.
   * @default "outlined"
   */
  variant?: FieldVariants;
  /**
   * Defines how 'loud' the field should be.
   * @default 3
   */
  vol?: Volume;
  /** Does the containing input have a value. */
  hasValue?: boolean;
  /** Props for the help text description element. */
  descriptionProps?: HTMLAttributes<HTMLElement>;
  /** Props for the help text error message element. */
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}
// https://accessibility.blog.gov.uk/2016/07/22/using-the-fieldset-and-legend-elements/
/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
interface InputBaseInternalProps
  extends Pick<
      React.HTMLProps<HTMLBaseElement>,
      Exclude<keyof React.HTMLProps<HTMLBaseElement>, "label">
    >,
    InputBaseProps {}
// isRequired
const InputBase = ({
  className: classNameProp,
  children,
  disabled = false,
  errorMessage,
  validationState,
  startAdornment,
  endAdornment,
  description,
  label: labelProp,
  labelProps,
  labelPosition = "over",
  descriptionProps,
  errorMessageProps,
  disableLabelTransition = false,
  variant = "outlined",
  hasValue: hasValueProp,
  vol = 3,
}: InputBaseInternalProps) => {
  const hasValue =
    disableLabelTransition || startAdornment ? true : hasValueProp;

  const error = validationState === "invalid";
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        className: st(classes.fieldInput, child?.props.className),
      });
    } else return;
  });

  const label = (
    <Label className={classes.inputLabel} {...labelProps}>
      {labelProp}
    </Label>
  );
  const hideLabel = labelPosition === "hidden";
  return (
    <div
      className={st(
        classes.root,
        {
          hasValue,
          error,
          disabled,
          variant: variant || undefined,
          vol,
          labelPosition,
        },
        classNameProp
      )}
    >
      {hideLabel ? <VisuallyHidden>{label}</VisuallyHidden> : label}

      <div className={classes.fieldContainer}>
        {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
        {childrenWithProps}
        {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
        {/*  */}
        <fieldset aria-hidden="true" className={classes.fieldset}>
          <legend className={classes.legend}>{!hideLabel && labelProp}</legend>
        </fieldset>
      </div>

      <HelpText
        className={classes.helpText}
        {...{
          description,
          descriptionProps,
          errorMessage,
          errorMessageProps,
          validationState,
        }}
      />
    </div>
  );
};

export default InputBase;

// InputBase.displayName = "InputBase";
