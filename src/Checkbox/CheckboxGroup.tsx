"use client";
import { Ref, forwardRef, ReactElement } from "react";
import type { AriaCheckboxGroupProps } from "@react-types/checkbox";
import type { CheckboxProps } from ".";
import { CheckboxGroupContext } from ".";
import type { Orientation } from "src/typings/shared-types";
import { useCheckboxGroupState } from "react-stately";
import { useCheckboxGroup } from "react-aria";
import { Field, FieldProps } from "../Field";
import { st, classes } from "./checkboxGroup.st.css";

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "excludeFromTabOrder" | "errorMessage">,
    Omit<
      FieldProps,
      | "label"
      | "startAdornment"
      | "endAdornment"
      | "disableLabelTransition"
      | "hasValue"
      | "variant"
    > {
  /** Custom className */
  className?: string;
  /**
   * Position of the label.
   * @default "over"
   */
  labelPosition?: "top" | "side" | "hidden";
  /**
   * The Checkboxes contained within the CheckboxGroup.
   */
  children: ReactElement<CheckboxProps> | ReactElement<CheckboxProps>[];
  /**
   * The axis the checkboxes should align with.
   * @default 'vertical'
   */
  orientation?: Orientation;
}

function CheckboxGroup(props: CheckboxGroupProps, ref?: Ref<HTMLDivElement>) {
  const {
    className: classNameProp,
    description,
    isDisabled,
    errorMessage,
    isInvalid,
    label,
    labelPosition = "top",
    orientation = "vertical",
    vol,
    children,
    "data-id": dataId,
  } = props;

  const state = useCheckboxGroupState(props);
  const { labelProps, groupProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  return (
    <Field
      {...{
        isDisabled,
        errorMessage,
        isInvalid,
        errorMessageProps,
        inputContainerProps: { ...groupProps, className: classes.group },
        description,
        descriptionProps,
        label,
        labelPosition,
        labelProps,
        vol,
        variant: false,
        ref,
        "data-id": dataId,
      }}
      className={st(classes.root, { orientation }, classNameProp)}
    >
      <>
        <CheckboxGroupContext.Provider value={state}>
          {children}
        </CheckboxGroupContext.Provider>
      </>
    </Field>
  );
}
CheckboxGroup.displayName = "CheckboxGroup";

const _CheckboxGroup = forwardRef(CheckboxGroup);
export { _CheckboxGroup as CheckboxGroup };
