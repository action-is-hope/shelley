import type { AriaDialogProps } from "@react-types/dialog";
import type {
  OverlayTriggerState,
  OverlayTriggerProps,
} from "@react-stately/overlays";
import type { PositionProps } from "@react-types/overlays";
import React, {
  Fragment,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { PressResponder } from "@react-aria/interactions";
import { DialogContext } from "./context";
// import {useIsMobileDevice} from '@react-spectrum/utils';
import { useOverlayTrigger } from "@react-aria/overlays";
import { Modal, ModalProps } from "../Modal/Modal";
import { Popup } from "../Popup/Popup";

import { classes as modalClasses } from "../Modal/modal.st.css";

export type ShelleyDialogClose = (close: () => void) => ReactElement;

export interface ShelleyDialogProps extends AriaDialogProps {
  /** The contents of the Dialog. */
  children?: ReactNode;
  /** The size of the Dialog. Only applies to "modal" type Dialogs. */
  size?: "S" | "M" | "L";
  /** Whether the Dialog is dismissable. See the [examples](#examples) for more details. */
  isDismissable?: boolean;
  /** Handler that is called when the 'x' button of a dismissable Dialog is clicked. */
  onDismiss?: () => void;
}

export interface ShelleyDialogTriggerProps
  extends OverlayTriggerProps,
    PositionProps {
  /** The Dialog and its trigger element. See the DialogTrigger [Content section](#content) for more information on what to provide as children. */
  children: [ReactElement, ShelleyDialogClose | ReactElement];
  /**
   * The type of Dialog that should be rendered. See the DialogTrigger [types section](#dialog-types) for an explanation on each.
   * @default 'modal'
   */
  type?: "modal" | "popover" | "tray" | "fullscreen" | "fullscreenTakeover";
  /** The type of Dialog that should be rendered when on a mobile device. See DialogTrigger [types section](#dialog-types) for an explanation on each. */
  mobileType?: "modal" | "tray" | "fullscreen" | "fullscreenTakeover";
  /**
   * Whether a popover type Dialog's arrow should be hidden.
   */
  hideArrow?: boolean;
  /** The ref of the element the Dialog should visually attach itself to. Defaults to the trigger button if not defined. */
  targetRef?: RefObject<HTMLElement>;
  /** Whether a modal type Dialog should be dismissable. */
  isDismissable?: boolean;
  /** Whether pressing the escape key to close the dialog should be disabled. */
  isKeyboardDismissDisabled?: boolean;

  /**
   * The selector of the element that the menu should render inside of.
   * @default 'body'
   */
  portalSelector?: string;

  modalProps?: ModalProps;
}

function DialogTrigger(props: ShelleyDialogTriggerProps) {
  const {
    children,
    type = "modal",
    // mobileType = type === "popover" ? "modal" : type,
    // hideArrow,
    targetRef,
    isDismissable = false,
    portalSelector,
    isKeyboardDismissDisabled = false,
    modalProps,
    // ...positionProps
    placement,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
  } = props;

  const positionProps = {
    placement,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
  };
  if (!Array.isArray(children) || children.length > 2) {
    throw new Error("DialogTrigger must have exactly 2 children");
  }
  // if a function is passed as the second child, it won't appear in toArray
  const [trigger, content] = children as [ReactElement, ShelleyDialogClose];

  // On small devices, show a modal or tray instead of a popover.
  // const isMobile = useIsMobileDevice();
  // if (isMobile) {
  //   // handle cases where desktop popovers need a close button for the mobile modal view
  //   if (type !== 'modal' && mobileType === 'modal') {
  //     isDismissable = true;
  //   }

  //   type = mobileType;
  // }

  const state = useOverlayTriggerState(props);
  const wasOpen = useRef(false);
  useEffect(() => {
    wasOpen.current = state.isOpen;
  }, [state.isOpen]);

  const isExiting = useRef(false);
  const onExiting = () => (isExiting.current = true);
  const onExited = () => (isExiting.current = false);

  const triggerRef = React.useRef(null);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );
  // console.log("overlayProps", overlayProps, triggerProps, triggerRef);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (
        (wasOpen.current || isExiting.current) &&
        type !== "popover" &&
        type !== "tray"
      ) {
        console.warn(
          "A DialogTrigger unmounted while open. This is likely due to being placed within a trigger that unmounts or inside a conditional. Consider using a DialogContainer instead."
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === "popover") {
    return (
      <PopupTrigger
        {...positionProps}
        {...{
          state,
          targetRef,
          triggerRef,
          trigger,
          content,
          triggerProps,
          overlayProps,
          isDismissable,
          isKeyboardDismissDisabled,
        }}
        // hideArrow={hideArrow}
      />
    );
  }

  const renderOverlay = () => {
    switch (type) {
      case "fullscreen":
      case "fullscreenTakeover":
      case "modal":
        return (
          <Modal
            isOpen={state.isOpen}
            onDismiss={() => state.close()}
            portalSelector={portalSelector}
            disableBackdropClick={!isDismissable}
            disableEscapeKey={isKeyboardDismissDisabled}
            variant={1}
            transitionProps={{
              className: modalClasses.transition,
              timeout: 190,
              onEntering: () => {
                document.body.classList.add(modalClasses.blurBackground);
              },
              onExiting: () => {
                document.body.classList.remove(modalClasses.blurBackground);
                onExiting();
              },
              onExited: () => {
                onExited();
              },
            }}
            {...modalProps}
            {...overlayProps}
          >
            {typeof content === "function"
              ? content(() => state.close())
              : content}
          </Modal>
        );
      default:
        return false;
    }
  };

  return (
    <DialogTriggerBase
      type={type}
      state={state}
      isDismissable={isDismissable}
      trigger={trigger}
      triggerProps={triggerProps}
      overlay={renderOverlay() as JSX.Element}
    />
  );
}

/**
 * DialogTrigger serves as a wrapper around a Dialog and its associated trigger, linking the Dialog's
 * open state with the trigger's press state. Additionally, it allows you to customize the type of Dialog.
 */

// We don't want getCollectionNode to show up in the type definition??
export const _DialogTrigger = DialogTrigger as (
  props: ShelleyDialogTriggerProps
) => JSX.Element;
export { _DialogTrigger as DialogTrigger };

/**
 * PopupTrigger
 */

interface PopupTriggerProps
  extends Omit<ShelleyDialogTriggerBase, "type" | "overlay"> {
  content: ShelleyDialogClose | ReactElement;
  /**
   * The ref of the element the popup should visually attach itself to.
   * Defaults to the trigger button if not defined.
   */
  targetRef?: React.RefObject<HTMLElement>;
  triggerRef: React.RefObject<HTMLElement>;
  isKeyboardDismissDisabled?: boolean;
  overlayProps: any;
}

function PopupTrigger({
  state,
  targetRef,
  triggerRef,
  trigger,
  content,
  triggerProps,
  overlayProps,
  isDismissable,
  // hideArrow,
  ...props
}: PopupTriggerProps) {
  const triggerPropsWithRef = {
    ...triggerProps,
    ref: targetRef ? undefined : triggerRef,
  };

  const overlay = (
    <>
      {state.isOpen &&
        createPortal(
          <Popup
            {...props}
            // hideArrow={hideArrow}
            triggerRef={targetRef || triggerRef}
            offset={20}
            {...overlayProps}
            isOpen={state.isOpen}
            onClose={() => state.close()}
            // Prop?
            // shouldCloseOnBlur
            // isDismissable={isDismissable}
          >
            {typeof content === "function" ? content(state.close) : content}
          </Popup>,
          document.querySelector("#portal") as HTMLElement
        )}
    </>
  );
  return (
    <DialogTriggerBase
      type="popover"
      state={state}
      triggerProps={triggerPropsWithRef}
      trigger={trigger}
      overlay={overlay}
      // isDismissable={isDismissable}
    />
  );
}

/**
 * DialogTriggerBase
 */

export interface ShelleyDialogTriggerBase {
  type: "modal" | "popover" | "tray" | "fullscreen" | "fullscreenTakeover";
  state: OverlayTriggerState;
  isDismissable?: boolean;
  dialogProps?: ShelleyDialogProps;
  triggerProps?: React.HTMLAttributes<HTMLElement>;
  overlay: ReactElement;
  trigger: ReactElement;
}

function DialogTriggerBase({
  type,
  state,
  isDismissable,
  dialogProps,
  triggerProps = {},
  overlay,
  trigger,
}: ShelleyDialogTriggerBase) {
  const context = {
    type,
    onClose: () => state.close(),
    isDismissable,
    ...dialogProps,
  };
  return (
    <Fragment>
      <PressResponder
        {...triggerProps}
        onPress={() => state.toggle()}
        isPressed={
          state.isOpen &&
          type !== "modal" &&
          type !== "fullscreen" &&
          type !== "fullscreenTakeover"
        }
      >
        {trigger}
      </PressResponder>
      <DialogContext.Provider value={context}>{overlay}</DialogContext.Provider>
    </Fragment>
  );
}
