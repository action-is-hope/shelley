import { Ref, forwardRef, ReactElement } from "react";
import Field from "../Field/Field";
import type { FieldProps } from "../Field/Field";

import { useCheckboxGroupState } from "react-stately";
import { useCheckboxGroup } from "react-aria";

import type { AriaCheckboxGroupProps } from "@react-types/checkbox";
import type { CheckboxProps } from "../Checkbox/Checkbox";
import { CheckboxGroupContext } from "./context";
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
  //  orientation?: Orientation,
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
    vol,
    children,
  } = props;

  const state = useCheckboxGroupState(props);
  const { labelProps, groupProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);
  // const localRef = useRef(null);

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
        ref,
      }}
      className={st(classes.root, classNameProp)}
    >
      <>
        <div {...groupProps}>
          <CheckboxGroupContext.Provider value={state}>
            {children}
          </CheckboxGroupContext.Provider>
        </div>
      </>
    </Field>
  );
}

/**
 * A CheckboxGroup allows users to select one or more items from a list of choices.
 */
const _CheckboxGroup = forwardRef(CheckboxGroup);
export { _CheckboxGroup as CheckboxGroup };
