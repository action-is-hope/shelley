import React, { forwardRef } from "react";
import { st, classes } from "./iconButton.st.css";
import { ButtonBase, ButtonProps } from "../Button";

// export type IconButtonProps = Omit<ButtonProps, "elementType" | "href">;

export interface IconButtonProps
  extends Omit<ButtonProps, "elementType" | "href" | "isCta"> {
  isFab?: boolean;
}

function IconButton(props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { children, className: classNameProp, isFab, ...rest } = props;

  return (
    <ButtonBase
      className={st(
        classes.root,
        {
          fab: isFab,
        },
        classNameProp
      )}
      ref={ref}
      icon={children}
      {...rest}
    />
  );
}
IconButton.displayName = "IconButton";

const _IconButton = forwardRef(IconButton);
export { _IconButton as IconButton };
