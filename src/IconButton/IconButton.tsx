import React, { forwardRef } from "react";
import type { AriaButtonProps } from "@react-types/button";
import type { AlignPos } from "../typings/shared-types";
import { st, classes } from "./iconButton.st.css";
import { Button } from "../Button";

export interface IconButtonProps extends Omit<AriaButtonProps, "elementType"> {
  /** Classname  */
  className?: string;
  /** Define an Icon node, postion via #iconPos. */
  icon?: React.ReactNode;
  /** The position of the icon relative to the label. */
  iconPos?: AlignPos;
  isQuiet?: boolean;
}

// @todo: Refactor Button into a ButtonBase and have all buttons use it.
function IconButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const {
    children,
    className: classNameProp,
    ...rest
    // ...otherProps
  } = props;

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

const _IconButton = forwardRef(IconButton);
export { _IconButton as IconButton };
