import { forwardRef, useRef } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState, QueuedToast } from "@react-stately/toast";
import { useToast } from "@react-aria/toast";

import Button from "../Button/Button";
import { st, classes } from "./toast.st.css";

interface ToastProps<T> extends AriaToastProps<T> {
  className?: string;
  state: ToastState<T>;
  toast: QueuedToast<T>;
}

function Toast<T>({ state, ...props }: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  );

  const priorities = ["info", "success", "warning", "error"] as const;

  const priority = priorities[props.toast.priority || 0];

  return (
    <div
      {...toastProps}
      ref={ref}
      className={st(classes.root, { priority }, props.className)}
      data-animation={props.toast.animation}
      onAnimationEnd={() => {
        if (props.toast.animation === "exiting") {
          state.remove(props.toast.key);
        }
      }}
    >
      <div {...titleProps}>{props.toast.content}</div>
      <Button {...closeButtonProps}>X</Button>
    </div>
  );
}

const _Toast = forwardRef<HTMLDivElement, ToastProps<any>>(Toast);
export { _Toast as Toast };
