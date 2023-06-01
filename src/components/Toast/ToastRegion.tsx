import { useRef, ReactNode } from "react";
import type { AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToastRegion } from "@react-aria/toast";
import { Toast } from "./Toast";
import { classes } from "./toast.st.css";
import InfoIcon from "../icons/Info";
import SuccessIcon from "../icons/Success";
import WarningIcon from "../icons/Close";
import ErrorIcon from "../icons/Error";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
  closeIcon?: ReactNode;
  infoIcon?: ReactNode;
  successIcon?: ReactNode;
  warningIcon?: ReactNode;
  errorIcon?: ReactNode;
}

function ToastRegion<T>({ state, ...props }: ToastRegionProps<T>) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);
  const {
    closeIcon,
    infoIcon = <InfoIcon />,
    successIcon = <SuccessIcon />,
    warningIcon = <WarningIcon />,
    errorIcon = <ErrorIcon />,
  } = props;

  return (
    <div {...regionProps} ref={ref} className={classes.toastRegion}>
      {state.visibleToasts.map((toast) => {
        const { priority = 0 } = toast;
        return (
          <Toast
            ref={ref}
            key={toast.key}
            toast={toast}
            state={state}
            closeIcon={closeIcon}
            icon={
              <>
                {priority === 0 && infoIcon}
                {priority === 1 && successIcon}
                {priority === 2 && warningIcon}
                {priority === 3 && errorIcon}
              </>
            }
          />
        );
      })}
    </div>
  );
}

export { ToastRegion };
