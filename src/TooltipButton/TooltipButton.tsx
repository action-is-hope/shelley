import React from "react";
import { useTooltipTriggerState } from "react-stately";
import { TooltipTriggerProps, useTooltipTrigger } from "react-aria";
import { Tooltip } from "../Tooltip";
import { Button } from "../Button";

interface TooltipButtonProps extends TooltipTriggerProps {
  buttonProps: any;
  tooltip: string;
}

function TooltipButton(props: TooltipButtonProps) {
  let state = useTooltipTriggerState(props);
  let buttonRef = React.useRef(null);

  let { triggerProps, tooltipProps } = useTooltipTrigger(
    props,
    state,
    buttonRef
  );

  return (
    <>
      <Button ref={buttonRef} {...triggerProps} {...props.buttonProps} />
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {props.tooltip}
        </Tooltip>
      )}
    </>
  );
}

export { TooltipButton };
