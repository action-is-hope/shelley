import { Ref, forwardRef, ReactElement } from "react";
import { Field } from "../Field/Field";
import type { FieldProps } from "../Field/Field";

import { useRadioGroupState } from "react-stately";
import { useRadioGroup } from "react-aria";

import type { AriaRadioGroupProps } from "@react-types/radio";
import type { RadioProps } from "../Radio/Radio";
import { RadioGroupContext } from "./context";
/* = Style API. */
import { st, classes } from "./radioGroup.st.css";
import type { Orientation } from "src/typings/shared-types";

export interface RadioGroupProps
  extends Omit<AriaRadioGroupProps, "excludeFromTabOrder">,
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
  /** Class */
  className?: string;
  /**
   * The Radios contained within the RadioGroup.
   */
  children: ReactElement<RadioProps> | ReactElement<RadioProps>[];
  /**
   * The axis the radios should align with.
   * @default 'vertical'
   */
  orientation?: Orientation;
}

function RadioGroup(props: RadioGroupProps, ref?: Ref<HTMLDivElement>) {
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
    "data-id": dataId,
  } = props;

  const state = useRadioGroupState(props);
  const { labelProps, radioGroupProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <Field
      {...{
        disabled: isDisabled,
        errorMessage,
        validationState,
        errorMessageProps,
        fieldContainerProps: { ...radioGroupProps, className: classes.group },
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
      <RadioGroupContext.Provider
        value={{
          validationState,
          state,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </Field>
  );
}

const _RadioGroup = forwardRef(RadioGroup);
export { _RadioGroup as RadioGroup };
