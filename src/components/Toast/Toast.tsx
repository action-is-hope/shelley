import {
  ReactElement,
  Ref,
  RefObject,
  SyntheticEvent,
  forwardRef,
  useRef,
} from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState, QueuedToast } from "@react-stately/toast";
import { useToast } from "@react-aria/toast";
import type { CustomToastContent } from "./ToastProvider";

import Button from "../Button/Button";
import { st, classes } from "./toast.st.css";
import { mergeRefs } from "@react-aria/utils";

const getDataTestIdAsProp = (name: string) => {
  return { "data-testid": `${name}-data-testid` };
};

interface ToastProps<T> extends AriaToastProps<T> {
  className?: string;
  state: ToastState<T>;
  toast: QueuedToast<T>;
  icon: React.ReactNode;
  ref: RefObject<HTMLDivElement>;
}

function Toast({ state, ref, ...props }: ToastProps<CustomToastContent>) {
  const localRef = useRef<HTMLDivElement>(null);

  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    localRef
  );

  const { icon } = props;

  const {
    content: {
      title,
      shouldCloseOnAction = false,
      action: { actionLabel, onAction } = {
        actionLabel: "",
        onAction: () => {
          /* noop */
        },
      },
      shouldShowIcon = true,
    },
    animation,
    key,
  } = props.toast;

  let { priority } = props.toast;

  const priorities = ["info", "success", "warning", "error"] as const;

  if (typeof priority !== "number" || priority < 0 || priority > 3) {
    priority = 0;
  }

  const priorityName = priorities[priority as 0 | 1 | 2 | 3];

  const withOrWithoutCloseButtonProps = shouldCloseOnAction
    ? closeButtonProps
    : {};

  const onActionHandler = (
    e: SyntheticEvent,
    state: ToastState<CustomToastContent>
  ) => {
    if (onAction && typeof onAction === "function") {
      onAction(e, state);
    }
  };

  return (
    <div
      {...toastProps}
      ref={mergeRefs(localRef, ref)}
      className={st(classes.root, { priority: priorityName }, props.className)}
      data-animation={animation}
      onAnimationEnd={() => {
        if (animation === "exiting") {
          state.remove(key);
        }
      }}
      {...getDataTestIdAsProp(`toast-${priorityName}-${title}`)}
    >
      <div
        className={classes.iconAndTitleWrapper}
        {...getDataTestIdAsProp(
          `toast-icon-and-title-wrapper-${priorityName}-${title}`
        )}
      >
        {shouldShowIcon && icon && <>{icon}</>}
        <div
          {...titleProps}
          {...getDataTestIdAsProp(`toast-title-${priorityName}-${title}`)}
        >
          {title}
        </div>
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
            {...getDataTestIdAsProp(
              `toast-action-button-${priorityName}-${title}`
            )}
          >
            {actionLabel}
          </Button>
        )}
        <div className={classes.closeButtonWrapper}>
          <Button
            {...closeButtonProps}
            className={classes.closeButton}
            {...getDataTestIdAsProp(
              `toast-close-button-${priorityName}-${title}`
            )}
          >
            X
          </Button>
        </div>
      </div>
    </div>
  );
}

const _Toast = forwardRef(Toast) as <T>(
  props: ToastProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;
export { _Toast as Toast };
