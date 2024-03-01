"use client";
import React, { forwardRef, useRef } from "react";
import type { AriaRadioProps } from "@react-types/radio";
import { useRadio } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { Size, AlignPos, ComponentBase } from "../typings/shared-types";
import { useRadioGroupProvider } from ".";
import { Label } from "../Label";
import { st, classes } from "./radio.st.css";

export interface RadioProps extends AriaRadioProps, ComponentBase {
  className?: string;
  /** The position of the label relative to the label. */
  inputPosition?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** Size of the actual input */
  size?: Size;
}

function Radio(props: RadioProps, ref: React.Ref<HTMLInputElement>) {
  const {
    className: classNameProp,
    children,
    visuallyHideLabel,
    inputPosition,
    size = 1,
    isDisabled,
    "data-id": dataId,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const radioGroupProps = useRadioGroupProvider();
  const { isInvalid, state } = radioGroupProps;

  const { inputProps } = useRadio(
    {
      ...props,
      ...radioGroupProps,
      isDisabled,
    },
    state,
    inputRef
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  const classNames = st(
    classes.root,
    {
      isDisabled,
      isFocusVisible,
      isInvalid,
      size: size ? size : undefined,
    },
    classNameProp
  );

  const inputControl = (
    <span className={classes.inputContainer}>
      <input
        className={classes.input}
        {...mergeProps(inputProps, focusProps)}
        ref={ref ? mergeRefs(ref, inputRef) : inputRef}
        data-id={dataId ? `${dataId}--input` : undefined}
      />
    </span>
  );

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
Radio.displayName = "Radio";

const _Radio = forwardRef(Radio);
export { _Radio as Radio };
