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
import { st, classes } from "./field.st.css";

export interface FieldProps extends Validation {
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
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  /**
   * Variant index.
   * @default "outlined"
   */
  variant?: FieldVariants;
  /**
   * Defines how 'loud' the field should be.
   * @default 1
   */
  vol?: Volume;
  /** Does the containing input have a value. */
  hasValue?: boolean;
  /** Add predefined data-id to ease testing or analytics. */
  includeDataIds?: boolean;
  /** Props for the help text description element. */
  descriptionProps?: HTMLAttributes<HTMLElement>;
  /** Props for the help text error message element. */
  errorMessageProps?: HTMLAttributes<HTMLElement>;
  /** Props for the field container. */
  fieldContainerProps?: HTMLAttributes<HTMLElement>;
  /** Enable disabled state. */
  isDisabled?: boolean;
}

interface FieldInternalProps
  extends Pick<
      React.HTMLProps<HTMLDivElement>,
      Exclude<keyof React.HTMLProps<HTMLDivElement>, "label">
    >,
    FieldProps {}
const Field = ({
  className: classNameProp,
  children,
  errorMessage,
  validationState,
  startAdornment,
  endAdornment,
  description,
  label: labelStringProp,
  labelProps,
  labelPosition = "over",
  descriptionProps,
  errorMessageProps,
  disableLabelTransition = false,
  includeDataIds = false,
  variant = "outlined",
  hasValue: hasValueProp,
  fieldContainerProps,
  isRequired,
  isDisabled,
  vol = 1,
  ...rest
}: FieldInternalProps) => {
  const hasValue =
    disableLabelTransition || startAdornment ? true : hasValueProp;

  const error = validationState === "invalid";
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        className: st(
          classes.fieldInput,
          (child?.props as React.HTMLProps<HTMLElement>)?.className
        ),
      });
    } else return;
  });
  // @todo empty labelStringProp should not render label
  const label = (
    <Label
      className={classes.inputLabel}
      data-id={includeDataIds ? "field--label" : undefined}
      {...labelProps}
    >
      {labelStringProp}
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
          isDisabled,
          isRequired,
          variant: variant || undefined,
          vol: vol !== false ? vol : undefined,
          labelPosition,
        },
        classNameProp
      )}
      {...rest}
    >
      {hideLabel ? <VisuallyHidden>{label}</VisuallyHidden> : label}

      <div
        {...fieldContainerProps}
        className={st(classes.fieldContainer, fieldContainerProps?.className)}
      >
        {startAdornment && (
          <InputAdornment
            data-id={includeDataIds ? "field--start-adornment" : undefined}
          >
            {startAdornment}
          </InputAdornment>
        )}
        {childrenWithProps}
        {endAdornment && (
          <InputAdornment
            data-id={includeDataIds ? "field--end-adornment" : undefined}
          >
            {endAdornment}
          </InputAdornment>
        )}
        {/*  */}
        {variant && (
          <fieldset aria-hidden="true" className={classes.fieldset}>
            <legend className={classes.legend}>
              {!hideLabel && labelStringProp}
            </legend>
          </fieldset>
        )}
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
        includeDataIds={includeDataIds}
      />
    </div>
  );
};

export default Field;
