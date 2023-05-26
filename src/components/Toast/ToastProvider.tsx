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
}

interface BothActionProps {
  actionLabel: string;
  onAction: (e: SyntheticEvent, state: ToastState<CustomToastContent>) => void;
}

interface NoActionProps {
  actionLabel?: never;
  onAction?: never;
}

type ActionProps = BothActionProps | NoActionProps;

function ToastProvider({ children, ...props }: ToastProviderProps) {
  const state = useToastState<CustomToastContent>({
    maxVisibleToasts: 5,
    hasExitAnimation: true,
  });

  type EnhancedState = typeof state;

  const enhancedState: EnhancedState = {
    ...state,
    add: (content, options) => {
      return state.add(content, options);
    },
  };

  return (
    <>
      {children(enhancedState)}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={enhancedState} />
      )}
    </>
  );
}

export { ToastProvider };
