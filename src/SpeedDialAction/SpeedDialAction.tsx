import React, { forwardRef } from "react";
import { TooltipButton } from "../TooltipButton";

interface SpeedDialActionProps extends React.HTMLAttributes<HTMLDivElement> {
  tooltipTitle: string;
  icon: any;
  onMouseDown: () => void;
}

function SpeedDialAction(
  props: SpeedDialActionProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { tooltipTitle, icon, onMouseDown } = props;

  return (
    <TooltipButton
      buttonProps={{
        onClick: onMouseDown,
        variant: "round",
        icon,
      }}
      tooltip={tooltipTitle}
    />
  );
}

const _SpeedDialAction = forwardRef(SpeedDialAction);
export { _SpeedDialAction as SpeedDialAction };
