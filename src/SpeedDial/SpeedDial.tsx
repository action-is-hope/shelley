import { forwardRef, ReactNode, useState } from "react";
import Add from "../icons/Add";
import { ButtonGroup } from "../ButtonGroup";
import { st, classes } from "./speedDial.st.css";
import { TooltipButton } from "../TooltipButton";

interface SpeedDialProps {
  children: ReactNode;
  tooltipTitle: string;
}

function SpeedDial(props: SpeedDialProps, ref: React.Ref<HTMLInputElement>) {
  const [speedDialOpen, triggerSpeedDial] = useState("false");
  const { children, tooltipTitle } = props;

  return (
    <div ref={ref} className={st(classes.root, { speedDialOpen })}>
      <TooltipButton
        data-id="tooltip-button"
        buttonProps={{
          onBlur: () => triggerSpeedDial("false"),
          onClick: () =>
            triggerSpeedDial(speedDialOpen === "false" ? "true" : "false"),
          icon: <Add />,
          className: classes.addButton,
        }}
        tooltip={tooltipTitle}
      />
      <ButtonGroup className={classes.buttonGroup}>{children}</ButtonGroup>
    </div>
  );
}

const _SpeedDial = forwardRef(SpeedDial);
export { _SpeedDial as SpeedDial };
