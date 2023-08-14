import React, { forwardRef, useState } from "react";
import { useTooltipTriggerState } from "react-stately";
import { mergeProps, useTooltip, useTooltipTrigger } from "react-aria";

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

// function TooltipButton(props) {
//   let state = useTooltipTriggerState(props);
//   let ref = React.useRef(null);

//   // Get props for the trigger and its tooltip
//   let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

//   return (
//     <span style={{ position: 'relative' }}>
//       <button
//         ref={ref}
//         {...triggerProps}
//         style={{ fontSize: 18 }}
//         onClick={() => alert('Pressed button')}
//       >
//         {props.children}
//       </button>
//       {state.isOpen && (
//         <Tooltip state={state} {...tooltipProps}>{props.tooltip}</Tooltip>
//       )}
//     </span>
//   );
// }

// <TooltipButton tooltip="Edit">✏️</TooltipButton>
// <TooltipButton tooltip="Delete">🚮</TooltipButton>
