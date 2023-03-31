import { mergeProps, mergeRefs } from "@react-aria/utils";
import React, { useRef, RefObject } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "react-aria";
import type { ButtonCustomProps } from "../Button/Button";

import { st, classes } from "./actionButton.st.css";
interface ActionButtonProps extends ButtonCustomProps {
  className?: string;
  isQuiet?: boolean;
}
function ActionButton(
  props: ActionButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const {
    isQuiet,
    isDisabled,
    children,
    // autoFocus,
    className: classNameProp,
    icon,
    iconPos,
    // ...otherProps
  } = props;

  const localRef = useRef(null);

  const { buttonProps, isPressed } = useButton(
    props,
    localRef as RefObject<HTMLButtonElement>
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={mergeRefs(localRef, ref)}
      className={st(
        classes.root,
        {
          iconPos: icon ? iconPos : undefined,
          // vol: vol !== false ? vol : undefined,
          isQuiet,
          isFocusVisible,
          isPressed,
          isDisabled,
        },
        classNameProp
      )}
    >
      {icon && (
        <>
          {icon}
          {children && <span className={classes.divider}></span>}
        </>
      )}
      {children && <span className={classes.inner}>{children}</span>}
    </button>
  );
}

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _ActionButton = React.forwardRef(ActionButton);
export { _ActionButton as ActionButton };
