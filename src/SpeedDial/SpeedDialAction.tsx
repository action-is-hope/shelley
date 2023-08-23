import { forwardRef, ReactElement } from "react";
import { TooltipButton } from "../Tooltip/TooltipButton";

interface SpeedDialActionProps {
  tooltipTitle: string;
  icon: ReactElement;
  onMouseDown: () => void;
}

function SpeedDialAction(
  props: SpeedDialActionProps,
  ref: React.Ref<HTMLInputElement>
) {
  const { tooltipTitle, icon, onMouseDown } = props;

  return (
    <div data-id="speed-dial-action" ref={ref}>
      <TooltipButton
        buttonProps={{
          onClick: onMouseDown,
          icon,
        }}
        tooltip={tooltipTitle}
      />
    </div>
  );
}

const _SpeedDialAction = forwardRef(SpeedDialAction);
export { _SpeedDialAction as SpeedDialAction };
