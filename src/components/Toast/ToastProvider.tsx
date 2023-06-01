import type { ReactNode, SyntheticEvent } from "react";
import { useToastState, ToastState, ToastOptions } from "@react-stately/toast";
import { ToastRegion } from "./ToastRegion";

export interface CustomToastContent {
  title: string;
  action?: ActionProps;
  shouldCloseOnAction?: boolean;
  shouldShowIcon?: boolean;
}

type EnhancedToastState = Omit<ReturnType<typeof useToastState>, "add"> & {
  add: (content: CustomToastContent, options?: ToastOptions) => string;
};

interface ToastProviderProps {
  children: (state: EnhancedToastState) => ReactNode;
  closeIcon?: ReactNode;
  infoIcon?: ReactNode;
  successIcon?: ReactNode;
  warningIcon?: ReactNode;
  errorIcon?: ReactNode;
}

export interface BothActionProps {
  actionLabel: string;
  onAction: (e: SyntheticEvent, state: ToastState<CustomToastContent>) => void;
}

interface NoActionProps {
  actionLabel?: `Custom TS error: "onAction" method is missing. Add it or remove "actionLabel". Either provide both "onAction" and "actionLabel" or neither.`;

  onAction?: `Custom TS error: "actionLabel" is missing. Add it or remove "onAction" method. Either provide both "onAction" and "actionLabel" or neither.`;
}

export type ActionProps = BothActionProps | NoActionProps;

function ToastProvider({ children, ...props }: ToastProviderProps) {
  const state = useToastState<CustomToastContent>({
    maxVisibleToasts: 5,
    hasExitAnimation: true,
  });

  return (
    <>
      {children(state)}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={state} />
      )}
    </>
  );
}

export { ToastProvider };
