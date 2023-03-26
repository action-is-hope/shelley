import React, { HTMLAttributes } from "react";

export interface DialogContextValue extends HTMLAttributes<HTMLElement> {
  type: "modal" | "popup" | "tray" | "fullscreen" | "fullscreenTakeover";
  isDismissable?: boolean;
  onClose: () => void;
}

export const DialogContext =
  React.createContext<DialogContextValue | null>(null);
