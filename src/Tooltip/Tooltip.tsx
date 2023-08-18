import { forwardRef } from "react";
import { mergeProps, useTooltip } from "react-aria";
import { classes } from "./tooltip.st.css";

interface TooltipProps {
  children: string;
  state: {
    isOpen: boolean;
    close: () => void;
    open: () => void;
  };
  id?: string;
}

function Tooltip(props: TooltipProps, ref: React.Ref<HTMLInputElement>) {
  const { tooltipProps } = useTooltip(props, props.state);

  return (
    <span
      ref={ref}
      className={classes.root}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}

const _Tooltip = forwardRef(Tooltip);
export { _Tooltip as Tooltip };
