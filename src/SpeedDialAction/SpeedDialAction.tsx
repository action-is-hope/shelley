import { TooltipButton } from "../TooltipButton";

interface SpeedDialActionProps {
  tooltipTitle: string;
  icon: any;
  onMouseDown: () => void;
}

function SpeedDialAction(props: SpeedDialActionProps) {
  const { tooltipTitle, icon, onMouseDown } = props;

  return (
    <TooltipButton
      buttonProps={{
        onClick: onMouseDown,
        icon,
      }}
      tooltip={tooltipTitle}
    />
  );
}

export { SpeedDialAction };
