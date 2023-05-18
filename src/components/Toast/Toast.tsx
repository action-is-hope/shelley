import { forwardRef, useRef } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState, QueuedToast } from "@react-stately/toast";
import { useToast } from "@react-aria/toast";

import Button from "../Button/Button";
import { classes } from "./toast.st.css";

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
  toast: QueuedToast<T>;
  // toast: {
  //   animation?: "entering" | "queued" | "exiting" | undefined;
  //   content: T;
  //   key: string;
  //   priority: number | undefined;
  //   timer: Timer | undefined;
  // };
}

function Toast<T>({ state, ...props }: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  );

  const priorityClassNames = [
    classes.info,
    classes.success,
    classes.warning,
    classes.error,
  ];

  const priorityClassName = priorityClassNames[props.toast.priority as number];

  return (
    <div
      {...toastProps}
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      className={`${classes.toast} ${priorityClassName}`}
    >
      <div {...titleProps}>{props.toast.content}</div>
      <Button {...closeButtonProps}>X</Button>
    </div>
  );
}

const _Toast = forwardRef<HTMLDivElement, ToastProps<any>>(Toast);
export { _Toast as Toast };
