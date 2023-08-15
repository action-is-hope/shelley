import { TooltipButton } from "../TooltipButton";

interface SpeedDialActionProps extends React.HTMLAttributes<HTMLDivElement> {
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
        variant: "round",
        icon,
      }}
      tooltip={tooltipTitle}
    />
  );
}

export { SpeedDialAction };
