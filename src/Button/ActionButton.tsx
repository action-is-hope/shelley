import React, { forwardRef } from "react";
import { st, classes } from "./actionButton.st.css";
import { ButtonBase, ButtonProps } from "./";

interface ActionButtonProps
  extends Omit<ButtonProps, "elementType" | "href" | "isCta"> {
  isQuiet?: boolean;
}

function ActionButton(
  props: ActionButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { className: classNameProp, isQuiet, ...rest } = props;

  return (
    <ButtonBase
      className={st(
        classes.root,
        {
          isQuiet,
        },
        classNameProp
      )}
      ref={ref}
      {...rest}
    />
  );
}
ActionButton.displayName = "ActionButton";

const _ActionButton = forwardRef(ActionButton);
export { _ActionButton as ActionButton };
