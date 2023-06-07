import { useRef, ReactNode } from "react";
import type { AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToastRegion } from "@react-aria/toast";
import { Toast } from "./Toast";
import { st, classes } from "./toastRegion.st.css";
import InfoIcon from "../icons/Info";
import SuccessIcon from "../icons/Success";
import WarningIcon from "../icons/Warning";
import ErrorIcon from "../icons/Error";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "react-aria";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
  closeIcon?: ReactNode;
  infoIcon?: ReactNode;
  successIcon?: ReactNode;
  warningIcon?: ReactNode;
  errorIcon?: ReactNode;
}

const getDataTestIdAsProp = (name: string) => {
  return { "data-id": `${name}-data-id` };
};

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

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      {...mergeProps(regionProps, focusProps)}
      ref={ref}
      className={st(classes.root, {
        isFocusVisible,
      })}
      {...getDataTestIdAsProp("toast-region")}
    >
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
