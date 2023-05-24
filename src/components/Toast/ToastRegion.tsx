import { useRef } from "react";
import type { AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToastRegion } from "@react-aria/toast";
import { Toast } from "./Toast";
import { classes } from "./toast.st.css";
import Icon from "../Icon/Icon";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

function ToastRegion<T>({ state, ...props }: ToastRegionProps<T>) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className={classes["toast-region"]}>
      {state.visibleToasts.map((toast) => {
        const { priority = 0 } = toast;
        return (
          <Toast
            key={toast.key}
            toast={toast}
            state={state}
            icon={
              <>
                {/* info */}
                {priority === 0 && (
                  <Icon>
                    <path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
                    <path d="M7 6h2v7h-2v-7z"></path>
                    <path d="M7 3h2v2h-2v-2z"></path>
                  </Icon>
                )}
                {/* success */}
                {priority === 1 && (
                  <Icon>
                    <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7.1 11.7l-4.2-4.1 1.4-1.4 2.7 2.7 5-4.9 1.4 1.4-6.3 6.3z"></path>
                  </Icon>
                )}
                {/* warning */}
                {priority === 2 && (
                  <Icon>
                    <path d="M8 1l-8 14h16l-8-14zM8 13c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM7 10v-4h2v4h-2z"></path>
                  </Icon>
                )}
                {/* error */}
                {priority === 3 && (
                  <Icon>
                    <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM9 13h-2v-2h2v2zM9 10h-2v-7h2v7z"></path>
                  </Icon>
                )}
              </>
            }
          />
        );
      })}
    </div>
  );
}

export { ToastRegion };
