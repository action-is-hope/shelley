/**
 * An accessible dialog or "modal" window.
 *
 * @see Docs     https://github.com/action-is-hope/shelley
 * @see Source
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
 */

import * as React from "react";
import { TransitionProps } from "react-transition-group/Transition";
import { ReactFocusOnProps } from "react-focus-on/dist/es5/types";

/**
 * @see Docs https://github.com/action-is-hope/shelley
 */
export type NotificationProps = {
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
  onDismiss: () => void;
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
  transitionProps: ShelleyTransitionProps;
  focusOnProps?: ReactFocusOnProps;
  theme?: string;
  autoHideDuration?: number;
  // } & React.HTMLProps<HTMLDivElement>;
} & React.ComponentPropsWithoutRef<"div">;

interface ShelleyTransitionProps extends TransitionProps {
  /**
   * Tru by default.
   * By default the child component is ummounted after it reaches the
   * 'exited' state. Set `unmountOnExit={false}` if you'd prefer the
   * component to stay mounted after it finishes exiting.
   *
   * We have reversed this from the CSSTransition defaults as we beleive it
   * better for accessibility. If you have content essential to SEO inside
   * a modal then set this to false but please check that all content is
   * accessible.
   *
   */
  unmountOnExit?: true;
}

/**
 * Docs: https://github.com/theKashey/react-focus-on
 */
interface ShelleyReactFocusOnProps extends ReactFocusOnProps {
  /**
   * Tru by default.
   * By default the child component is ummounted after it reaches the
   * 'exited' state. Set `unmountOnExit={false}` if you'd prefer the
   * component to stay mounted after it finishes exiting.
   *
   * We have reversed this from the CSSTransition defaults as we beleive it
   * better for accessibility. If you have content essential to SEO inside
   * a modal then set this to false but consider how to make this
   * invisible to a s
   */
  unmountOnExit?: true;
}

/** Influenced by https://reacttraining.com/reach-ui/dialog */
