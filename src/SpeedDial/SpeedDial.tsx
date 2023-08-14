import React, { forwardRef, useState } from "react";
import Add from "../icons/Add";
import { ButtonGroup } from "../ButtonGroup";
import { st, classes } from "./speeddial.st.css";
import { TooltipButton } from "../TooltipButton";

interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any;
  tooltipTitle: string;
}

function SpeedDial(props: SpeedDialProps, ref: React.Ref<HTMLDivElement>) {
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
      <ButtonGroup ref={ref}>{children}</ButtonGroup>
    </div>
  );

  return (
    <div className={st(classes.root, { speedDialOpen })}>
      {addButton}
      {buttonGroup}
    </div>
  );
}

/**
 * SpeedDial housing buttons and slogans for use in headers and footers.
 */
const _SpeedDial = forwardRef(SpeedDial);
export { _SpeedDial as SpeedDial };
