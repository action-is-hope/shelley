import type React from "react";
import {
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
  Children,
  forwardRef,
  HTMLProps,
} from "react";
import type {
  Volume,
  FieldVariants,
  ComponentBase,
  LabelPosition,
} from "../typings/shared-types";
import type { Validation } from "../typings/shared-types";
import { Label } from "../Label";
import { HelpText } from "../HelpText";
import { VisuallyHidden } from "../VisuallyHidden";
import { InputAdornment } from "../InputAdornment";
import { st, classes } from "./field.st.css";

export interface FieldContainerProps
  extends HTMLProps<HTMLDivElement>,
    ComponentBase {}
export interface FieldProps extends Validation, ComponentBase {
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
  labelPosition?: LabelPosition;
  /**
   * Disable the label transition.
   * @default false
   */
  disableLabelTransition?: boolean;
  /** Props for the label element. */
  labelProps?: Omit<React.HTMLProps<HTMLLabelElement>, "ref">;
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
  /** Props for the help text description element. */
  descriptionProps?: HTMLProps<HTMLDivElement>;
  /** Props for the help text error message element. */
  errorMessageProps?: HTMLProps<HTMLDivElement>;
  /** Props for the field container. */
  fieldContainerProps?: FieldContainerProps;
  /** Enable disabled state. */
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

interface FieldInternalProps
  extends Pick<
      React.HTMLProps<HTMLDivElement>,
      Exclude<keyof React.HTMLProps<HTMLDivElement>, "label">
    >,
    FieldProps {}

function Field(props: FieldInternalProps, ref?: React.Ref<HTMLDivElement>) {
  const {
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
    variant = "outlined",
    hasValue: hasValueProp,
    fieldContainerProps,
    isReadOnly,
    isRequired,
    isDisabled,
    vol = 1,
    "data-id": dataId,
    ...rest
  } = props;

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

  const label = labelStringProp && (
    <Label
      className={classes.inputLabel}
      data-id={dataId ? `${dataId}--label` : undefined}
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
          isReadOnly,
          variant: variant || undefined,
          vol: vol !== false ? vol : undefined,
          labelPosition,
        },
        classNameProp
      )}
      data-id={dataId}
      ref={ref}
      {...rest}
    >
      {hideLabel && label ? <VisuallyHidden>{label}</VisuallyHidden> : label}

      <div
        {...fieldContainerProps}
        className={st(classes.fieldContainer, fieldContainerProps?.className)}
      >
        {typeof startAdornment === "string" ? (
          <InputAdornment
            className={classes.startAdornment}
            data-id={dataId ? `${dataId}--start-adornment` : undefined}
          >
            {startAdornment}
          </InputAdornment>
        ) : (
          startAdornment
        )}
        {childrenWithProps}
        {typeof endAdornment === "string"
          ? endAdornment && (
              <InputAdornment
                className={classes.endAdornment}
                data-id={dataId ? `${dataId}--end-adornment` : undefined}
              >
                {endAdornment}
              </InputAdornment>
            )
          : endAdornment}
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
        data-id={dataId ? `${dataId}--helpText` : undefined}
      />
    </div>
  );
}

const _Field = forwardRef(Field);
export { _Field as Field };
