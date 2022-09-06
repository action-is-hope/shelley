/** Popup.tsx */
import React, { Ref, forwardRef, RefObject } from "react";
import type { PositionProps } from "@react-types/overlays";
import { FocusScope } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import {
  useOverlay,
  DismissButton,
  useOverlayPosition,
  AriaOverlayProps,
} from "@react-aria/overlays";

/* = Style API. */
import { st, classes } from "./popup.st.css";

export interface PopupProps
  extends AriaOverlayProps,
    PositionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The ref for the element which the popup positions itself with respect to.
   */
  triggerRef: RefObject<HTMLElement>;
  // @todo Focus options
}

export const Popup = forwardRef(
  (props: PopupProps, ref: Ref<HTMLDivElement>) => {
    const {
      triggerRef,
      // AriaOverlayProps
      isOpen,
      isDismissable = true,
      isKeyboardDismissDisabled,
      onClose,
      shouldCloseOnBlur,
      // PositionProps
      placement,
      containerPadding,
      offset,
      crossOffset,
      shouldFlip,
      ...rest
    } = props;
    const { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable,
        isKeyboardDismissDisabled,
        shouldCloseOnBlur,
      },
      ref as RefObject<HTMLElement>
    );

    // Get MenuPopup positioning props relative to the trigger
    const { overlayProps: overlayPositionProps } = useOverlayPosition({
      targetRef: triggerRef,
      overlayRef: ref as RefObject<HTMLElement>,
      placement,
      containerPadding,
      offset,
      crossOffset,
      shouldFlip,
    });

    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the menu is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return (
      <FocusScope autoFocus restoreFocus>
        <div
          className={st(classes.root)}
          {...mergeProps(overlayProps, overlayPositionProps, rest)}
          ref={ref}
        >
          <DismissButton onDismiss={props.onClose} />
          {props.children}
          <DismissButton onDismiss={props.onClose} />
        </div>
      </FocusScope>
    );
  }
);
Popup.displayName = "Popup";

export default Popup;
