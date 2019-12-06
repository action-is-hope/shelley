/**
 * An accessible dialog or "modal" window.
 *
 * @see Docs     https://github.com/action-is-hope/shelley
 * @see Source
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
 */

import * as React from "react";

/**
 * @see Docs https://github.com/action-is-hope/shelley
 */
export type DialogProps = {
  /**
   * Controls whether the dialog is open or not.
   *
   * @see Docs https://github.com/action-is-hope/shelley
   */
  isOpen?: boolean;
  /**
   * This function is called whenever the user hits "Escape" or clicks outside
   * the dialog. _It's important to close the dialog `onDismiss`_.
   *
   * The only time you shouldn't close the dialog on dismiss is when the dialog
   * requires a choice and none of them are "cancel". For example, perhaps two
   * records need to be merged and the user needs to pick the surviving record.
   * Neither choice is less destructive than the other, so in these cases you
   * may want to alert the user they need to a make a choice on dismiss instead
   * of closing the dialog.
   *
   * @see Docs https://github.com/action-is-hope/shelley
   */
  onDismiss?: (arg) => void;
  /**
   * Accepts any renderable content.
   *
   * @see Docs https://github.com/action-is-hope/shelley
   */
  children?: React.ReactNode;
  contentClassName?: string;
  allowPinchZoom?: boolean;
  /** ((element: HTMLElement) => void) | { current: HTMLElement };
   * By default the first focusable element will receive focus when the dialog
   * opens but you can provide a ref to focus instead.
   *
   * @see Docs https://github.com/action-is-hope/shelley
   */
  initialFocusRef?:
    | React.RefObject<HTMLButtonElement>
    | React.RefObject<HTMLInputElement>;
  // ref: React.Ref<HTMLDivElement>;
  entryNode?: any;
  // } & React.HTMLProps<HTMLDivElement>;
} & React.ComponentPropsWithoutRef<"div">;

/** Influenced by https://reacttraining.com/reach-ui/dialog */
