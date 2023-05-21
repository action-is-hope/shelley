import React, { forwardRef, useRef } from "react";
import Label from "../Label/Label";
import { useSwitch } from "@react-aria/switch";
import { useToggleState } from "@react-stately/toggle";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import type { AriaSwitchProps } from "@react-types/switch";
import type { Size, AlignPos, ComponentBase } from "../types";
/* = Style API. */
import { st, classes } from "./switch.st.css";

export interface SwitchProps extends AriaSwitchProps, ComponentBase {
  className?: string;
  /** The position of the label relative to the label. */
  inputPosition?: AlignPos;
  /** Visually hide the label so it is still accessible to assistive technologies. */
  visuallyHideLabel?: boolean;
  /** Size of the actual input. */
  size?: Size;
}

function Switch(props: SwitchProps, ref: React.Ref<HTMLInputElement>) {
  const {
    className: classNameProp,
    children,
    visuallyHideLabel,
    inputPosition,
    size = 1,
    isDisabled,
    "data-id": dataId,
  } = props;

  const localRef = useRef(null);

  const state = useToggleState(props);
  const { inputProps } = useSwitch(props, state, localRef);

  const { isFocusVisible, focusProps } = useFocusRing();

  const classNames = st(
    classes.root,
    {
      isDisabled,
      isFocusVisible,
      size: size ? size : undefined,
    },
    classNameProp
  );

  const inputControl = (
    <span className={classes.inputContainer}>
      <input
        className={classes.input}
        {...mergeProps(inputProps, focusProps)}
        ref={ref ? mergeRefs(ref, localRef) : localRef}
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

const _Switch = forwardRef(Switch);
export { _Switch as Switch };
