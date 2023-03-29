import React, { HTMLAttributes } from "react";
import type { OverlayType } from "./DialogTrigger";

export interface DialogContextValue extends HTMLAttributes<HTMLElement> {
  type: OverlayType;
  isDismissable?: boolean;
  onClose: () => void;
}

export const DialogContext =
  React.createContext<DialogContextValue | null>(null);
