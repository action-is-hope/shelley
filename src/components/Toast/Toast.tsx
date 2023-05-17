import { forwardRef, useRef } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToast } from "@react-aria/toast";

import Button from "../Button/Button";
import { classes } from "./toast.st.css";

// interface ToastProps {
//   type: "success" | "error" | "warning" | "info";
// }

// const Toast = (props: ToastProps, ref?: Ref<HTMLDivElement>) => {
//   return <div ref={ref}>{`Toast - type: ${props.type} `}</div>;
// };

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
  toast: {
    content: T;
    key: string;
  };
}

function Toast<T>({ state, ...props }: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  );

  return (
    <div {...toastProps} ref={ref} className={classes.toast}>
      <div {...titleProps}>{props.toast.content}</div>
      <Button {...closeButtonProps}>X</Button>
    </div>
  );
}

const _Toast = forwardRef<HTMLDivElement, ToastProps<any>>(Toast);
export { _Toast as Toast };
