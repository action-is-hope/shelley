import React, { useState } from "react";
import Add from "../icons/Add";
import { ButtonGroup } from "../ButtonGroup";
import { st, classes } from "./speeddial.st.css";
import { TooltipButton } from "../TooltipButton";

interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any;
  tooltipTitle: string;
}

function SpeedDial(props: SpeedDialProps) {
  const [speedDialOpen, triggerSpeedDial] = useState("false");
  const { children, tooltipTitle } = props;

  const addButton = (
    <div className={classes.addButton}>
      <TooltipButton
        buttonProps={{
          onBlur: () => triggerSpeedDial("false"),
          onClick: () =>
            triggerSpeedDial(speedDialOpen === "false" ? "true" : "false"),
          variant: "round",
          icon: <Add />,
        }}
        tooltip={tooltipTitle}
      />
    </div>
  );

  const buttonGroup = (
    <div className={classes.buttonGroup}>
      <ButtonGroup>{children}</ButtonGroup>
    </div>
  );

  return (
    <div className={st(classes.root, { speedDialOpen })}>
      {addButton}
      {buttonGroup}
    </div>
  );
}

export { SpeedDial };
