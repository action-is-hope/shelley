import { ReactElement, ReactNode, Ref, forwardRef, useRef } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState, QueuedToast } from "@react-stately/toast";
import type { CustomToastContent } from "./ToastProvider";
import type { PressEvent } from "@react-types/shared";
import type { ComponentBase } from "../typings/shared-types";
import { useToast } from "@react-aria/toast";
import { mergeRefs } from "@react-aria/utils";
import { Button } from "../Button";
import { Text } from "../Text";
import { IconButton } from "../IconButton/IconButton";
import CloseIcon from "../icons/Close";
import { st, classes } from "./toast.st.css";

export interface ToastProps<T> extends AriaToastProps<T>, ComponentBase {
  className?: string;
  state: ToastState<T>;
  toast: QueuedToast<T>;
  icon: ReactNode;
  closeIcon?: ReactNode;
}

function Toast(
  props: ToastProps<CustomToastContent>,
  ref?: Ref<HTMLDivElement>
) {
  const {
    state,
    icon,
    closeIcon = <CloseIcon />,
    className: classNameProp,
    "data-id": dataId,
  } = props;
  const localRef = useRef<HTMLDivElement>(null);

  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    localRef
  );

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

  const priorities = [
    "neutral",
    "info",
    "success",
    "warning",
    "error",
  ] as const;

  if (typeof priority !== "number" || priority < 0 || priority > 4) {
    priority = 0;
  }

  const priorityName = priorities[priority as 0 | 1 | 2 | 3 | 4];

  const withOrWithoutCloseButtonProps = shouldCloseOnAction
    ? closeButtonProps
    : {};

  const onActionHandler = (
    e: PressEvent,
    state: ToastState<CustomToastContent>
  ) => {
    if (onAction && typeof onAction === "function") {
      onAction(e, state);
    }
  };

  return (
    <div
      {...toastProps}
      ref={ref ? mergeRefs(ref, localRef) : localRef}
      className={st(classes.root, { priority: priorityName }, classNameProp)}
      data-animation={animation}
      onAnimationEnd={() => {
        if (animation === "exiting") {
          state.remove(key);
        }
      }}
      data-id={dataId ? `${dataId}` : undefined}
    >
      <div className={classes.iconAndTitleWrapper}>
        {shouldShowIcon && icon && <>{icon}</>}
        <Text
          as="span"
          vol={1}
          {...titleProps}
          data-id={dataId ? `${dataId}--title` : undefined}
        >
          {title}
        </Text>
      </div>
      <div className={classes.actionAndCloseWrapper}>
        {actionLabel && onAction && (
          <Button
            tone={false}
            className={classes.actionButton}
            onPress={(e) => {
              onActionHandler(e, state);
            }}
            {...withOrWithoutCloseButtonProps}
            data-id={dataId ? `${dataId}--actionButton` : undefined}
          >
            {actionLabel}
          </Button>
        )}
        <div className={classes.closeButtonWrapper}>
          <IconButton
            {...closeButtonProps}
            className={classes.closeButton}
            data-id={dataId ? `${dataId}--closeButton` : undefined}
          >
            {closeIcon}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const _Toast = forwardRef(Toast) as <T>(
  props: ToastProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;
export { _Toast as Toast };
