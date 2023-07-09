import React, { forwardRef } from "react";
import type { AriaButtonProps } from "@react-types/button";
import type { AlignPos, Volume } from "../typings/shared-types";
import { st, classes } from "./iconButton.st.css";
import { Button } from "../Button";

export interface IconButtonProps extends Omit<AriaButtonProps, "elementType"> {
  /** Classname  */
  className?: string;
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  /** Defines how 'loud' the Button should be in term of it's size. */
  vol?: Volume;
}

// @todo: Refactor Button into a ButtonBase and have all buttons use it.
function IconButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { children, className: classNameProp, ...rest } = props;

  return (
    <Button
      className={st(classes.root, classNameProp)}
      ref={ref}
      icon={children}
      variant={false}
      {...rest}
    />
  );
}
IconButton.displayName = "IconButton";

const _IconButton = forwardRef(IconButton);
export { _IconButton as IconButton };
