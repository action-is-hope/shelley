import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useToastState, ToastState, ToastOptions } from "@react-stately/toast";
import { ToastRegion } from "./ToastRegion";
import type { PressEvent } from "@react-types/shared";
import type { ComponentBase } from "../types";

export interface CustomToastContent {
  title: string;
  action?: ActionProps;
  shouldCloseOnAction?: boolean;
  shouldShowIcon?: boolean;
}

export type ToastQueue = Omit<ReturnType<typeof useToastState>, "add"> & {
  add: (content: CustomToastContent, options?: ToastOptions) => string;
};

export interface ToastProviderProps extends ComponentBase {
  children: ReactNode;
  /** Override the close icon. */
  closeIcon?: ReactNode;
  /** Override the info icon. */
  infoIcon?: ReactNode;
  /** Override the success icon. */
  successIcon?: ReactNode;
  /** Override the warning icon. */
  warningIcon?: ReactNode;
  /** Override the error icon. */
  errorIcon?: ReactNode;
  /**
   * Be mindful of how often you trigger toasts. Frequent
   * interruptions interfere with usability, especially for
   * people with visual and cognitive disabilities
   * (see WCAG Success Criterion 2.2.4 Interruptions).
   * Multiple toasts will required different CSS and is not
   * recommended.
   */
  maxVisibleToasts?: number;
  /** Turn off exit transitions. */
  hasExitAnimation?: boolean;
}

export interface BothActionProps {
  actionLabel: string;
  onAction: (e: PressEvent, state: ToastState<CustomToastContent>) => void;
}

interface NoActionProps {
  actionLabel?: `Custom TS error: "onAction" method is missing. Add it or remove "actionLabel". Either provide both "onAction" and "actionLabel" or neither.`;
  onAction?: `Custom TS error: "actionLabel" is missing. Add it or remove "onAction" method. Either provide both "onAction" and "actionLabel" or neither.`;
}

export type ActionProps = BothActionProps | NoActionProps;

const ToastContext = createContext({});

export function useToast(): ToastQueue {
  return useContext(ToastContext) as ToastQueue;
}

function ToastProvider(props: ToastProviderProps) {
  const {
    children,
    maxVisibleToasts = 1,
    hasExitAnimation = true,
    ...rest
  } = props;

  const state = useToastState<CustomToastContent>({
    maxVisibleToasts,
    hasExitAnimation,
  });

  return (
    <ToastContext.Provider value={state}>
      {children}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...rest} state={state} />
      )}
    </ToastContext.Provider>
  );
}

export { ToastProvider };
