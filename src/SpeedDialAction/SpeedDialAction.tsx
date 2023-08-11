import React, { forwardRef, useState } from "react";
import Add from "../icons/Add";
import Close from "../icons/Close";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";

interface SpeedDialActionProps extends React.HTMLAttributes<HTMLDivElement> {
  tooltipTitle: string;
  icon: any;
  tooltipPlacement: string;
  onMouseDown: () => void;
}

function SpeedDialAction(
  props: SpeedDialActionProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { tooltipTitle, tooltipPlacement, icon, onMouseDown } = props;

  return <Button onClick={onMouseDown} variant="round" icon={icon} />;
}

const _SpeedDialAction = forwardRef(SpeedDialAction);
export { _SpeedDialAction as SpeedDialAction };
