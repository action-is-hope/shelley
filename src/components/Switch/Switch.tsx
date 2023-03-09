import React, { forwardRef, useRef } from "react";
import Label from "../Label/Label";
import { useSwitch } from "@react-aria/switch";
import { useToggleState } from "@react-stately/toggle";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { AriaSwitchProps } from "@react-types/switch";
import type { Volume, AlignPos } from "../types";
/* = Style API. */
import { st, classes } from "./switch.st.css";

export interface SwitchProps extends AriaSwitchProps {
  className?: string;
  /** The position of the label relative to the label. */
  inputPosition?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** How 'loud' should this input be? */
  vol?: Volume;
  /** Add predefined data-id to ease testing or analytics. */
  includeDataIds?: boolean;
}

function Switch(props: SwitchProps, ref: React.Ref<HTMLInputElement>) {
  const {
    className: classNameProp,
    children,
    visuallyHideLabel,
    inputPosition,
    vol = 1,
    isDisabled,
    includeDataIds,
  } = props;

  const localRef = useRef(null);

  let state = useToggleState(props);
  let { inputProps } = useSwitch(props, state, localRef);

  const { isFocusVisible, focusProps } = useFocusRing();

  const classNames = st(
    classes.root,
    {
      isDisabled,
      isFocusVisible,
      vol: vol ? vol : undefined,
    },
    classNameProp
  );

  const inputControl = (
    <span className={classes.inputContainer}>
      <input
        className={classes.input}
        {...mergeProps(inputProps, focusProps)}
        ref={ref ? mergeRefs(ref, localRef) : localRef}
        data-id={includeDataIds ? "switch--input" : undefined}
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
          data-id={includeDataIds ? "switch--label" : undefined}
        >
          {children}
        </Label>
      ) : (
        <span
          className={classNames}
          data-id={includeDataIds ? "switch--no-label" : undefined}
        >
          {inputControl}
        </span>
      )}
    </>
  );
}

const _Switch = forwardRef(Switch);
export { _Switch as Switch };
