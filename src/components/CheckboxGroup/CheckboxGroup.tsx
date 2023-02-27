import { Ref, forwardRef, ReactElement } from "react";
import type { FieldProps } from "../Field/Field";
import type { AriaCheckboxGroupProps } from "@react-types/checkbox";
import type { CheckboxProps } from "../Checkbox/Checkbox";
import type { Orientation } from "src/typings/shared-types";
import { useCheckboxGroupState } from "react-stately";
import { useCheckboxGroup } from "react-aria";
import { CheckboxGroupContext } from "./context";
import Field from "../Field/Field";
/* = Style API. */
import { st, classes } from "./checkboxGroup.st.css";

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "excludeFromTabOrder">,
    Omit<
      FieldProps,
      | "label"
      | "startAdornment"
      | "endAdornment"
      | "disableLabelTransition"
      | "hasValue"
      | "variant"
    > {
  /**
   * Position of the label.
   * @default "over"
   */
  labelPosition?: "top" | "side" | "hidden";
  className?: string;
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
    validationState,
    label,
    labelPosition = "top",
    orientation = "vertical",
    vol,
    children,
  } = props;

  const state = useCheckboxGroupState(props);
  const { labelProps, groupProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  return (
    <Field
      {...{
        disabled: isDisabled,
        errorMessage,
        validationState,
        errorMessageProps,
        description,
        descriptionProps,
        label,
        labelPosition,
        labelProps,
        vol,
        variant: false,
        fieldContainerProps: { ...groupProps, className: classes.group },
        ref,
      }}
      className={st(
        classes.root,
        {
          orientation,
        },
        classNameProp
      )}
    >
      <>
        <CheckboxGroupContext.Provider value={state}>
          {children}
        </CheckboxGroupContext.Provider>
      </>
    </Field>
  );
}

/**
 * A CheckboxGroup allows users to select one or more items from a list of choices.
 */
const _CheckboxGroup = forwardRef(CheckboxGroup);
export { _CheckboxGroup as CheckboxGroup };
