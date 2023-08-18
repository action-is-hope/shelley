import React, { forwardRef } from "react";
import { useTooltipTriggerState } from "react-stately";
import { TooltipTriggerProps, useTooltipTrigger } from "react-aria";
import { Tooltip } from "../Tooltip";
import { Button } from "../Button";
import { classes } from "./tooltipButton.st.css";

interface TooltipButtonProps extends TooltipTriggerProps {
  buttonProps: object;
  tooltip: string;
}

function TooltipButton(
  props: TooltipButtonProps,
  ref: React.Ref<HTMLInputElement>
) {
  const state = useTooltipTriggerState(props);
  const buttonRef = React.useRef(null);

  const { triggerProps, tooltipProps } = useTooltipTrigger(
    props,
    state,
    buttonRef
  );

  return (
    <div ref={ref} className={classes.root}>
      <Button ref={buttonRef} {...triggerProps} {...props.buttonProps} />
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {props.tooltip}
        </Tooltip>
      )}
    </div>
  );
}

const _TooltipButton = forwardRef(TooltipButton);
export { _TooltipButton as TooltipButton };
