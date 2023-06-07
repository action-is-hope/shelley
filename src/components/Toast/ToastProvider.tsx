import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useToastState, ToastState, ToastOptions } from "@react-stately/toast";
import { ToastRegion } from "./ToastRegion";
import type { PressEvent } from "@react-types/shared";

export interface CustomToastContent {
  title: string;
  action?: ActionProps;
  shouldCloseOnAction?: boolean;
  shouldShowIcon?: boolean;
}

export type ToastQueue = Omit<ReturnType<typeof useToastState>, "add"> & {
  add: (content: CustomToastContent, options?: ToastOptions) => string;
};

interface ToastProviderProps {
  children: ReactNode;
  closeIcon?: ReactNode;
  infoIcon?: ReactNode;
  successIcon?: ReactNode;
  warningIcon?: ReactNode;
  errorIcon?: ReactNode;
  /**
   * Be mindful of how often you trigger toasts. Even though they're not as disruptive as dialogs, they still interrupt a user’s attention. Frequent interruptions interfere with usability, especially for people with visual and cognitive disabilities (see WCAG Success Criterion 2.2.4 Interruptions).
   */
  maxVisibleToasts?: number;
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

function ToastProvider({ children, ...props }: ToastProviderProps) {
  const state = useToastState<CustomToastContent>({
    maxVisibleToasts: props.maxVisibleToasts || 1,
    hasExitAnimation: true,
  });

  return (
    <ToastContext.Provider value={state}>
      {children}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={state} />
      )}
    </ToastContext.Provider>
  );
}

export { ToastProvider };
