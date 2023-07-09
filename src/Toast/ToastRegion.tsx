import { useRef, forwardRef, ReactNode } from "react";
import type { AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import type { ComponentBase } from "../typings/shared-types";
import { useToastRegion } from "@react-aria/toast";
import { mergeProps, mergeRefs } from "@react-aria/utils";
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

function ToastRegion<T>(
  props: ToastRegionProps<T>,
  ref?: React.Ref<HTMLDivElement>
) {
  const localRef = useRef(null);
  const {
    state,
    closeIcon,
    infoIcon = <InfoIcon />,
    successIcon = <SuccessIcon />,
    warningIcon = <WarningIcon />,
    errorIcon = <ErrorIcon />,
    "data-id": dataId,
  } = props;
  const { regionProps } = useToastRegion(props, state, localRef);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      {...mergeProps(regionProps, focusProps)}
      ref={ref ? mergeRefs(ref, localRef) : localRef}
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
                {priority === 1 && infoIcon}
                {priority === 2 && successIcon}
                {priority === 3 && warningIcon}
                {priority === 4 && errorIcon}
              </>
            }
            data-id={dataId ? `${dataId}--toast` : undefined}
          />
        );
      })}
    </div>
  );
}
ToastRegion.displayName = "ToastRegion";

const _ToastRegion = forwardRef(ToastRegion);
export { _ToastRegion as ToastRegion };
