import React, { forwardRef, useState } from "react";
import Add from "../icons/Add";
import Close from "../icons/Close";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { st, classes } from "./speeddial.st.css";
import { useTooltipTrigger } from "react-aria";
import { Tooltip } from "../Tooltip";
import { useTooltipTriggerState } from "react-stately";

interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  children: any;
}

function SpeedDial(props: SpeedDialProps, ref: React.Ref<HTMLDivElement>) {
  const [speedDialOpen, triggerSpeedDial] = useState(false);
  const { children } = props;
  let tooltipState = useTooltipTriggerState();
  let buttonRef = React.useRef(null);
  let { triggerProps, tooltipProps } = useTooltipTrigger(
    {},
    tooltipState,
    buttonRef
  );

  const addButton = (
    <div className={classes.addButton}>
      <Button
        // onBlur={() => triggerSpeedDial(false)}
        onClick={() => triggerSpeedDial(!speedDialOpen)}
        variant="round"
        icon={speedDialOpen ? <Close /> : <Add />}
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
