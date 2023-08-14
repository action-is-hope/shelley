import React, { forwardRef } from "react";
import { useTooltipTriggerState } from "react-stately";
import { useTooltipTrigger } from "react-aria";
import { Tooltip } from "../Tooltip";

function TooltipButton(props: any, ref: React.Ref<HTMLDivElement>) {
  let state = useTooltipTriggerState(props);
  let buttonRef = React.useRef(null);

  let { triggerProps, tooltipProps } = useTooltipTrigger(
    props,
    state,
    buttonRef
  );

  return (
    <span ref={ref} style={{ position: "relative" }}>
      <button ref={buttonRef} {...triggerProps} style={{ fontSize: 18 }}>
        {props.children}
      </button>
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {props.tooltip}
        </Tooltip>
      )}
    </span>
  );
}

const _TooltipButton = forwardRef(TooltipButton);
export { _TooltipButton as TooltipButton };
