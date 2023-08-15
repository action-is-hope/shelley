import { useState } from "react";
import Add from "../icons/Add";
import { ButtonGroup } from "../ButtonGroup";
import { st, classes } from "./speeddial.st.css";
import { TooltipButton } from "../TooltipButton";

interface SpeedDialProps {
  children: any;
  tooltipTitle: string;
}

function SpeedDial(props: SpeedDialProps) {
  const [speedDialOpen, triggerSpeedDial] = useState("false");
  const { children, tooltipTitle } = props;

  const addButton = (
    <TooltipButton
      buttonProps={{
        onBlur: () => triggerSpeedDial("false"),
        onClick: () =>
          triggerSpeedDial(speedDialOpen === "false" ? "true" : "false"),
        variant: "round",
        icon: <Add />,
        className: classes.addButton,
      }}
      tooltip={tooltipTitle}
    />
  );

  const buttonGroup = (
    <ButtonGroup className={classes.buttonGroup}>{children}</ButtonGroup>
  );

  return (
    <div className={st(classes.root, { speedDialOpen })}>
      {addButton}
      {buttonGroup}
    </div>
  );
}

export { SpeedDial };
