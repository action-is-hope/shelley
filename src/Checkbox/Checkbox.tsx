"use client";
import React, { forwardRef, useRef, useContext } from "react";
import { useToggleState } from "react-stately";
import { useCheckbox, useCheckboxGroupItem } from "react-aria";
import type { AriaCheckboxProps } from "@react-types/checkbox";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { Size, AlignPos, ComponentBase } from "../typings/shared-types";
import { Label } from "../Label";
import { CheckboxGroupContext } from ".";
import { st, classes } from "./checkbox.st.css";

export interface CheckboxProps extends AriaCheckboxProps, ComponentBase {
  className?: string;
  /** The position of the label relative to the label. */
  inputPosition?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** Size of the actual input. */
  size?: Size;
}

function Checkbox(props: CheckboxProps, ref: React.Ref<HTMLInputElement>) {
  const {
    className: classNameProp,
    children,
    isInvalid,
    visuallyHideLabel,
    inputPosition,
    isIndeterminate,
    size = 1,
    isDisabled,
    "data-id": dataId,
  } = props;

  const internalRef = useRef(null);
  const groupState = useContext(CheckboxGroupContext);

  const { inputProps } = groupState
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useCheckboxGroupItem(
        {
          ...props,
          // Value is optional for standalone checkboxes, but required for CheckboxGroup items;
          // it's cast explicitly here to avoid typescript error.
          value: props.value as string,
          // Only pass isRequired and isInvalid to react-aria if they came from
          // the props for this individual checkbox, and not from the group via context.
          // isRequired: originalProps.isRequired,
          // isInvalid: originalProps.isInvalid
        },
        groupState,
        internalRef
      )
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useCheckbox(props, useToggleState(props), internalRef);
  const { isFocusVisible, focusProps } = useFocusRing();

  const classNames = st(
    classes.root,
    {
      isDisabled,
      isFocusVisible,
      isIndeterminate,
      isInvalid,
      size: size ? size : undefined,
    },
    classNameProp
  );

  const inputControl = (
    <input
      className={classes.input}
      {...mergeProps(inputProps, focusProps)}
      ref={ref ? mergeRefs(ref, internalRef) : internalRef}
      data-id={dataId ? `${dataId}--input` : undefined}
    />
  );

  if (groupState) {
    if (props.value == null) {
      console.warn(
        "A <Checkbox> element within a <CheckboxGroup> requires a `value` property."
      );
    }
  }

  return (
    <Label
      className={classNames}
      {...{ inputControl, inputPosition }}
      visuallyHidden={visuallyHideLabel}
      data-id={dataId ? `${dataId}--label` : undefined}
    >
      {children}
    </Label>
  );
}
Checkbox.displayName = "Checkbox";

const _Checkbox = forwardRef(Checkbox);
export { _Checkbox as Checkbox };
