/** Popup.tsx */
import React, { Ref, forwardRef, RefObject, useRef } from "react";
import type { ReactFocusOnProps } from "react-focus-on/dist/es5/types";
import type { PositionProps } from "@react-types/overlays";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import {
  useOverlay,
  DismissButton,
  useOverlayPosition,
  AriaOverlayProps,
} from "react-aria";

/* = Style API. */
import { st, classes } from "./popup.st.css";
import { FocusOn } from "react-focus-on";

export interface PopupProps
  extends AriaOverlayProps,
    PositionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The ref for the element which the popup positions itself with respect to.
   */
  triggerRef: Ref<HTMLElement>;
  /** Add predefined data-id to ease testing or analytics. */
  includeDataIds?: boolean;
  /** Props for the internal `FocusOn` component see - https://github.com/theKashey/react-focus-on#api */
  focusOnProps?: Pick<
    ReactFocusOnProps,
    Exclude<keyof ReactFocusOnProps, "children">
  >;
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
      focusOnProps,
      includeDataIds,
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
    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the menu is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return isOpen ? (
      <FocusOn
        preventScrollOnFocus={true}
        returnFocus={{ preventScroll: true }}
        {...focusOnProps}
      >
        <div
          className={st(classes.root)}
          // @todo below would overwrite className prop if set?
          {...mergeProps(overlayProps, overlayPositionProps, rest)}
          ref={ref ? mergeRefs(ref, localRef) : localRef}
          data-id={includeDataIds ? "popup" : undefined}
        >
          <svg
            {...arrowProps}
            className={st(classes.arrow, {
              placement,
            })}
            data-id={includeDataIds ? "popup--arrow" : undefined}
            data-placement={placement}
          >
            <path d="M0 0,L6 6,L12 0" />
          </svg>

          <DismissButton onDismiss={props.onClose} />
          {props.children}
          <DismissButton onDismiss={props.onClose} />
        </div>
      </FocusOn>
    ) : (
      <></>
    );
  }
);
Popup.displayName = "Popup";

export default Popup;
