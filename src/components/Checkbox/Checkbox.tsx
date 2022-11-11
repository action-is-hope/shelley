import React, { forwardRef, useRef } from "react";
import { useToggleState } from "react-stately";
import { useCheckbox } from "react-aria";
import type { CheckboxProps as AriaCheckBoxProps } from "@react-types/checkbox";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { Volume, AlignPos, Variant } from "../types";
import Label from "../Label/Label";
/* = Style API. */
import { st, classes } from "./checkbox.st.css";

/** HTMLInputElement has a 'label' attribute apparently; so replacing it. */
export interface CheckboxProps extends Omit<AriaCheckBoxProps, "isDisabled"> {
  className?: string;
  disabled?: boolean;
  /** Variant index. */
  variant?: Variant;
  /** The position of the label relative to the label. */
  inputPos?: AlignPos;
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
      disabled = false,
      validationState,
      variant = 1,
      visuallyHideLabel,
      inputPos,
      isIndeterminate,
      vol = 1,
    } = props;

    const state = useToggleState(props);
    const localRef = useRef(null);
    const { inputProps } = useCheckbox(
      { ...props, isDisabled: disabled },
      state,
      localRef
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const isSelected = state.isSelected && !isIndeterminate;

    const inputControl = (
      <span className={classes.inputContainer}>
        <input
          className={classes.input}
          {...mergeProps(inputProps, focusProps)}
          ref={ref ? mergeRefs(ref, localRef) : localRef}
        />
      </span>
    );

    return (
      <div
        className={st(
          classes.root,
          {
            variant,
            disabled,
            isFocusVisible,
            isIndeterminate,
            isSelected,
            validationState,
            vol,
          },
          classNameProp
        )}
      >
        {children ? (
          <Label
            className={classes.inputLabel}
            {...{ inputControl, inputPos }}
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
