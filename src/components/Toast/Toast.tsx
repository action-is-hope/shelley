import { SyntheticEvent, forwardRef, useRef } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState, QueuedToast } from "@react-stately/toast";
import { useToast } from "@react-aria/toast";
import type { CustomToastContent } from "./ToastProvider";

import Button from "../Button/Button";
import { st, classes } from "./toast.st.css";

interface ToastProps<T> extends AriaToastProps<T> {
  className?: string;
  state: ToastState<T>;
  toast: QueuedToast<T>;
  icon: React.ReactNode;
}

function Toast({ state, ...props }: ToastProps<CustomToastContent>) {
  const ref = useRef(null);

  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  );

  const { icon } = props;

  const {
    content: {
      title,
      actionLabel = "",
      shouldCloseOnAction = false,
      onAction,
      shouldShowIcon = true,
    },
    priority = 0,
    animation,
    key,
  } = props.toast;

  const priorities = ["info", "success", "warning", "error"] as const;

  const priorityName = priorities[priority || 0];

  const withOrWithoutCloseButtonProps = shouldCloseOnAction
    ? closeButtonProps
    : {};

  if ((actionLabel && !onAction) || (!actionLabel && onAction)) {
    throw new Error(
      "Toast: actionLabel and onAction must be both present or both absent."
    );
  }

  const onActionHandler = (
    e: SyntheticEvent,
    state: ToastState<CustomToastContent>
  ) => {
    if (onAction) {
      onAction(e, state);
    }
  };

  return (
    <div
      {...toastProps}
      ref={ref}
      className={st(classes.root, { priority: priorityName }, props.className)}
      data-animation={animation}
      onAnimationEnd={() => {
        if (animation === "exiting") {
          state.remove(key);
        }
      }}
    >
      <div className={classes.iconAndTitleWrapper}>
        {shouldShowIcon && icon && <>{icon}</>}
        <div {...titleProps}>{title}</div>
      </div>
      <div className={classes.actionAndCloseWrapper}>
        {actionLabel && onAction && (
          <Button
            tone={false}
            className={classes.actionButton}
            onClick={(e: SyntheticEvent) => {
              onActionHandler(e, state);
            }}
            {...withOrWithoutCloseButtonProps}
          >
            {actionLabel}
          </Button>
        )}
        <div className={classes.closeButtonWrapper}>
          <Button {...closeButtonProps} className={classes.closeButton}>
            X
          </Button>
        </div>
      </div>
    </div>
  );
}

const _Toast = forwardRef<HTMLDivElement, ToastProps<any>>(Toast);
export { _Toast as Toast };
