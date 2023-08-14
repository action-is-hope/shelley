import React, { forwardRef } from "react";
import { mergeProps, useTooltip } from "react-aria";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any;
  state: any;
}

function Tooltip(props: TooltipProps, ref: React.Ref<HTMLDivElement>) {
  let { tooltipProps } = useTooltip(props, props.state);

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
      ref={ref}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </span>
  );
}

const _Tooltip = forwardRef(Tooltip);
export { _Tooltip as Tooltip };
