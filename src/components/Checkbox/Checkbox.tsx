import React, { forwardRef, useRef, useContext } from "react";
import { useToggleState } from "react-stately";
import { useCheckbox, useCheckboxGroupItem } from "react-aria";
import type { AriaCheckboxProps } from "@react-types/checkbox";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { Volume, AlignPos } from "../types";
import Label from "../Label/Label";
import { CheckboxGroupContext } from "../CheckboxGroup/context";
/* = Style API. */
import { st, classes } from "./checkbox.st.css";

export interface CheckboxProps extends AriaCheckboxProps {
  className?: string;
  /** The position of the label relative to the label. */
  inputPosition?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** How 'loud' should this input be? */
  vol?: Volume;
}

const Checkbox = forwardRef(
  (props: CheckboxProps, ref?: React.Ref<HTMLInputElement>) => {
    const {
      className: classNameProp,
      children,
      validationState,
      visuallyHideLabel,
      inputPosition,
      isIndeterminate,
      vol = 1,
      isDisabled,
    } = props;
    const localRef = useRef(null);
    const groupState = useContext(CheckboxGroupContext);

    const { inputProps } = groupState
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useCheckboxGroupItem(
          {
            ...props,
            // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
            // it's passed explicitly here to avoid typescript error (requires ignore).
            value: props.value as string,
            // Only pass isRequired and validationState to react-aria if they came from
            // the props for this individual checkbox, and not from the group via context.
            // isRequired: originalProps.isRequired,
            // validationState: originalProps.validationState
          },
          groupState,
          localRef
        )
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useCheckbox(props, useToggleState(props), localRef);
    const { isFocusVisible, focusProps } = useFocusRing();

    const inputControl = (
      <span className={classes.inputContainer}>
        <input
          className={classes.input}
          {...mergeProps(inputProps, focusProps)}
          ref={ref ? mergeRefs(ref, localRef) : localRef}
        />
      </span>
    );

    if (groupState) {
      // for (let key of ['isSelected', 'defaultSelected', 'isEmphasized']) {
      //   if (originalProps[key] != null) {
      //     console.warn(`${key} is unsupported on individual <Checkbox> elements within a <CheckboxGroup>. Please apply these props to the group instead.`);
      //   }
      // }
      if (props.value == null) {
        console.warn(
          "A <Checkbox> element within a <CheckboxGroup> requires a `value` property."
        );
      }
    }

    return (
      <div
        className={st(
          classes.root,
          {
            disabled: isDisabled,
            isFocusVisible,
            isIndeterminate,
            // isSelected,
            validationState,
            vol: vol ? vol : undefined,
          },
          classNameProp
        )}
      >
        {children ? (
          <Label
            className={classes.inputLabel}
            {...{ inputControl, inputPosition }}
            visuallyHidden={visuallyHideLabel}
          >
            {children}
          </Label>
        ) : (
          inputControl
        )}
      </div>
    );
  }
);

export default Checkbox;

Checkbox.displayName = "Checkbox";
