/** Popup.tsx */
import React, { Ref, forwardRef, RefObject, useRef } from "react";
import type { PositionProps } from "@react-types/overlays";
import { FocusScope } from "@react-aria/focus";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import {
  useOverlay,
  DismissButton,
  useOverlayPosition,
  AriaOverlayProps,
} from "react-aria";

/* = Style API. */
import { st, classes } from "./popup.st.css";

export interface PopupProps
  extends AriaOverlayProps,
    PositionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The ref for the element which the popup positions itself with respect to.
   */
  triggerRef: Ref<HTMLElement>;
  // @todo Focus options
}

export const Popup = forwardRef(
  (props: PopupProps, ref?: Ref<HTMLDivElement>) => {
    const {
      triggerRef,
      // AriaOverlayProps:
      isOpen,
      isDismissable = true,
      isKeyboardDismissDisabled,
      onClose,
      shouldCloseOnBlur,
      // PositionProps:
      placement: placementProp,
      containerPadding,
      offset,
      crossOffset,
      shouldFlip,
      ...rest
    } = props;
    const localRef = useRef(null);
    // Aria hook
    const { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable,
        isKeyboardDismissDisabled,
        shouldCloseOnBlur,
      },
      localRef as RefObject<HTMLElement>
    );

    // Get MenuPopup positioning props relative to the trigger
    const {
      overlayProps: overlayPositionProps,
      arrowProps,
      placement,
    } = useOverlayPosition({
      targetRef: triggerRef as RefObject<HTMLElement>,
      overlayRef: localRef as RefObject<HTMLElement>,
      placement: placementProp,
      containerPadding,
      offset,
      crossOffset,
      shouldFlip,
    });

    console.log("arrowProps", arrowProps);

    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the menu is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return (
      <FocusScope autoFocus restoreFocus>
        <div
          className={st(classes.root)}
          {...mergeProps(overlayProps, overlayPositionProps, rest)}
          ref={ref ? mergeRefs(ref, localRef) : localRef}
        >
          {/* <span {...arrowProps} className={classes.arrow} /> */}

          <svg
            {...arrowProps}
            className={st(classes.arrow, {
              placement,
            })}
            data-placement={placement}
          >
            <path d="M0 0,L6 6,L12 0" />
          </svg>

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
