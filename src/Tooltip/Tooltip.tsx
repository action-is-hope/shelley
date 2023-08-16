import { mergeProps, useTooltip } from "react-aria";

interface TooltipProps {
  children: string;
  state: {
    isOpen: boolean;
    close: () => void;
    open: () => void;
  };
  id?: string;
}

function Tooltip(props: TooltipProps) {
  const { tooltipProps } = useTooltip(props, props.state);

  return (
    <span
      style={{
        position: "absolute",
        left: "5px",
        top: "100%",
        maxWidth: 150,
        marginTop: "10px",
        backgroundColor: "white",
        color: "black",
        padding: "5px",
        border: "1px solid gray",
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}
export { Tooltip };
