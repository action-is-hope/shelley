import type { ReactNode } from "react";
import { useToastState } from "@react-stately/toast";
import { ToastRegion } from "./ToastRegion";

interface ToastProviderProps {
  children: (state: ReturnType<typeof useToastState>) => ReactNode;
}

function ToastProvider({ children, ...props }: ToastProviderProps) {
  const state = useToastState({
    maxVisibleToasts: 5,
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
