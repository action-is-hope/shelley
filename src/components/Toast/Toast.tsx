import {
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
  forwardRef,
  useRef,
} from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState, QueuedToast } from "@react-stately/toast";
import { useToast } from "@react-aria/toast";
import type { CustomToastContent } from "./ToastProvider";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { st, classes } from "./toast.st.css";
import { mergeRefs } from "@react-aria/utils";
import CloseIcon from "../icons/Close";
import type { PressEvent } from "@react-types/shared";
import { IconButton } from "../IconButton/IconButton";

const getDataIdAsProp = (name: string) => {
  return { "data-id": `${name}-data-id` };
};

interface ToastProps<T> extends AriaToastProps<T> {
  className?: string;
  state: ToastState<T>;
  toast: QueuedToast<T>;
  icon: ReactNode;
  ref: RefObject<HTMLDivElement>;
  closeIcon?: ReactNode;
}

function Toast({ state, ref, ...props }: ToastProps<CustomToastContent>) {
  const localRef = useRef<HTMLDivElement>(null);

  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    localRef
  );

  const { icon, closeIcon = <CloseIcon /> } = props;

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
      ref={mergeRefs(localRef, ref)}
      className={st(classes.root, { priority: priorityName }, props.className)}
      data-animation={animation}
      onAnimationEnd={() => {
        if (animation === "exiting") {
          state.remove(key);
        }
      }}
      {...getDataIdAsProp(`toast-${priorityName}-${title}`)}
    >
      <div
        className={classes.iconAndTitleWrapper}
        {...getDataIdAsProp(
          `toast-icon-and-title-wrapper-${priorityName}-${title}`
        )}
      >
        {shouldShowIcon && icon && <>{icon}</>}
        <Text
          as="span"
          vol={1}
          {...titleProps}
          {...getDataIdAsProp(`toast-title-${priorityName}-${title}`)}
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
            {...getDataIdAsProp(`toast-action-button-${priorityName}-${title}`)}
          >
            {actionLabel}
          </Button>
        )}
        <div className={classes.closeButtonWrapper}>
          <IconButton
            {...closeButtonProps}
            className={classes.closeButton}
            {...getDataIdAsProp(`toast-close-button-${priorityName}-${title}`)}
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
