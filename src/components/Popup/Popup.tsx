/** Popup.tsx */
import React, { Ref, forwardRef, RefObject } from "react";
import type { PositionProps } from "@react-types/overlays";
import { FocusScope } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import {
  useOverlay,
  DismissButton,
  useOverlayPosition,
} from "@react-aria/overlays";

/* = Style API. */
import { st, classes } from "./popup.st.css";

interface OverlayProps extends PositionProps {
  /**
   * Element that that serves as the positioning boundary.
   * @default document.body
   */
  boundaryElement?: HTMLElement;
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  // targetRef: RefObject<HTMLElement>;

  /**
   * A ref for the scrollable region within the overlay.
   */
  scrollRef?: RefObject<HTMLElement>;
  /**
   * Whether the overlay should update its position automatically.
   * @default true
   */
  shouldUpdatePosition?: boolean;
  /** Handler that is called when the overlay should close. */
  // onClose?: () => void;
  /**
   * The maxHeight specified for the overlay element.
   * By default, it will take all space up to the current viewport height.
   */
  maxHeight?: number;
}

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  overlayProps: OverlayProps;
  onFocusProps?: any;
  /**
   * Trigger ref.
   */
  triggerRef: RefObject<HTMLElement>;
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
  /** Whether the element is rendered. */
  isOpen?: boolean;
  // children: any;
  /**
   * The ref for the overlay element.
   */
  // overlayRef: RefObject<HTMLElement>;
  // overlayRef: any;
}

export const Popup = forwardRef(
  (props: PopupProps, ref: Ref<HTMLDivElement>) => {
    const { overlayProps } = useOverlay(
      {
        onClose: props.onClose,
        // shouldCloseOnBlur: true,
        isOpen: props.isOpen,
        // isOpen: true,
        // isDismissable: true,
        // isKeyboardDismissDisabled: true,
      },
      ref as RefObject<HTMLElement>
    );

    console.log(props.triggerRef);

    // Get MenuPopup positioning props relative to the trigger
    const { overlayProps: overlayPositionProps } = useOverlayPosition({
      targetRef: props.triggerRef,
      overlayRef: ref as RefObject<HTMLElement>,
      // Position Props
      placement: "top",
      offset: 5,
      crossOffset: -4,
      containerPadding: 0,
      isOpen: props.isOpen,
      // isOpen: true,
      // override from prop values
      // ...positionFromProps,
      shouldFlip: true, // works
    });

    // Wrap in <FocusScope> so that focus is restored back to the
    // trigger when the menu is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return (
      <FocusScope autoFocus restoreFocus>
        <div
          className={st(classes.root)}
          {...mergeProps(overlayProps, overlayPositionProps)}
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
