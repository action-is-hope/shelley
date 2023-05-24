import type { ReactNode, SyntheticEvent } from "react";
import { useToastState, ToastState } from "@react-stately/toast";
import { ToastRegion } from "./ToastRegion";

interface ToastProviderProps {
  children: (state: ReturnType<typeof useToastState>) => ReactNode;
}

export interface CustomToastContent {
  title: string;
  actionLabel?: string;
  onAction?: (e: SyntheticEvent, state: ToastState<CustomToastContent>) => void;
  shouldCloseOnAction?: boolean;
  shouldShowIcon?: boolean;
}

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
