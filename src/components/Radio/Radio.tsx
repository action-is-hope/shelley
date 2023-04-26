import React, { forwardRef, useRef } from "react";
import type { AriaRadioProps } from "@react-types/radio";
import { useRadio } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { Volume, AlignPos, ComponentBase } from "../types";
import { useRadioGroupProvider } from "../RadioGroup/context";
import Label from "../Label/Label";
/* = Style API. */
import { st, classes } from "./radio.st.css";

export interface RadioProps extends AriaRadioProps, ComponentBase {
  className?: string;
  /** The position of the label relative to the label. */
  inputPosition?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** How 'loud' should this input be? */
  vol?: Volume;
}

const Radio = forwardRef(
  (props: RadioProps, ref?: React.Ref<HTMLInputElement>) => {
    const {
      className: classNameProp,
      children,
      // validationState,
      visuallyHideLabel,
      inputPosition,
      vol = 1,
      isDisabled,
      "data-id": dataId,
    } = props;
    // const localRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    // const groupState = useContext(RadioGroupContext);
    // const { inputProps } = useRadio(props, groupState, ref);
    const radioGroupProps = useRadioGroupProvider();
    const { validationState, state } = radioGroupProps;

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
        validationState,
        vol: vol ? vol : undefined,
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
      <>
        {children ? (
          <Label
            className={classNames}
            {...{ inputControl, inputPosition }}
            visuallyHidden={visuallyHideLabel}
            data-id={dataId ? `${dataId}--label` : undefined}
          >
            {children}
          </Label>
        ) : (
          <span
            className={classNames}
            data-id={dataId ? `${dataId}--noLabel` : undefined}
          >
            {inputControl}
          </span>
        )}
      </>
    );
  }
);

export default Radio;

Radio.displayName = "Radio";
