import { useRef } from "react";
import type { AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToastRegion } from "@react-aria/toast";
import { Toast } from "./Toast";
import { classes } from "./toast.st.css";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

function ToastRegion<T>({ state, ...props }: ToastRegionProps<T>) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className={classes["toast-region"]}>
      {state.visibleToasts.map((toast) => {
        return <Toast key={toast.key} toast={toast} state={state} />;
      })}
    </div>
  );
}

export { ToastRegion };
