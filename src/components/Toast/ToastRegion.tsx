import { useRef, ReactNode } from "react";
import type { AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import type { ComponentBase } from "../types";
import { useToastRegion } from "@react-aria/toast";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";
import { Toast } from "./Toast";
import InfoIcon from "../icons/Info";
import SuccessIcon from "../icons/Success";
import WarningIcon from "../icons/Warning";
import ErrorIcon from "../icons/Error";
import { st, classes } from "./toastRegion.st.css";

export interface ToastRegionProps<T>
  extends AriaToastRegionProps,
    ComponentBase {
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
    "data-id": dataId,
  } = props;

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      {...mergeProps(regionProps, focusProps)}
      ref={ref}
      className={st(classes.root, {
        isFocusVisible,
      })}
      data-id={dataId}
    >
      {state.visibleToasts.map((toast) => {
        const { priority = 0 } = toast;
        return (
          <Toast
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
            data-id={dataId ? `${dataId}--toast` : undefined}
          />
        );
      })}
    </div>
  );
}

export { ToastRegion };
