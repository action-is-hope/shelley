import type {
  OverlayTriggerState,
  OverlayTriggerProps,
} from "@react-stately/overlays";
import type { TransitionProps } from "react-transition-group/Transition";
import type { ReactFocusOnProps } from "react-focus-on/dist/es5/types";
import type { PositionProps } from "@react-types/overlays";
import type { DialogProps } from "../Dialog/Dialog";
import React, {
  Fragment,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { mergeProps } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { PressResponder } from "@react-aria/interactions";
import { DialogContext } from "./context";
// import {useIsMobileDevice} from '@react-spectrum/utils';
import { useOverlayTrigger } from "@react-aria/overlays";
import { Modal, TransitionType } from "../Modal/Modal";
import { Popup } from "../Popup/Popup";

export type DialogClose = (close: () => void) => ReactElement;

export type OverlayType =
  | "modal"
  | "popup"
  | "tray"
  | "fullscreen"
  | "fullscreenTakeover";

/**
 * We cannot support onClickOutside and onEscapeKey as these
 * are surpressed by react-aria. However we have access to
 * onActivation and onDeactivation events.
 */
type TriggerFocusOnProps = Omit<
  ReactFocusOnProps,
  "children" | "onClickOutside" | "onEscapeKey"
>;

type TriggerTransitionProps = Pick<
  TransitionProps,
  | "onEnter"
  | "onEntering"
  | "onEntered"
  | "onExit"
  | "onExiting"
  | "onExited"
  | "mountOnEnter"
  | "unmountOnExit"
  | "timeout"
>;

export interface DialogTriggerProps extends OverlayTriggerProps, PositionProps {
  /** The Dialog and its trigger element. */
  children: [ReactElement, DialogClose | ReactElement];
  /**
   * The type of Dialog that should be rendered.
   * @default 'modal'
   */
  type?: OverlayType;
  /**
   * The type of Dialog that should be rendered when on a
   * mobile device.
   */
  // mobileType?: "modal" | "tray" | "fullscreen" | "fullscreenTakeover";
  /**
   * The selector of the element that the Dialog should render inside of.
   * @default 'body'
   */
  portalSelector?: string | false;
  /**
   * Whether a popup type Dialog's arrow should be hidden.
   */
  hideArrow?: boolean;
  /**
   * Whether the popup type Dialog should close when focus
   * is lost or moves outside it.
   */
  shouldCloseOnBlur?: boolean;
  /**
   * The ref of the element a popup type Dialog should visually
   * attach itself to. Defaults to the trigger button if not
   * defined.
   */
  targetRef?: RefObject<HTMLElement>;
  /** Whether a modal type Dialog should be dismissable. */
  isDismissable?: boolean;
  /**
   * Whether pressing the escape key to close the dialog should
   * be disabled.
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * Props specific to the modal, for focusOnProps use the shared
   * prop at the top level of DialogTrigger.
   */
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
  /**
   * Props for the internal `FocusOn` component
   * see - https://github.com/theKashey/react-focus-on#api
   */
  focusOnProps?: TriggerFocusOnProps;
  // Transition for Modal
  transition?: TransitionType;
  // transitionProps?: Pick<ModalProps, "transitionProps">;
  transitionProps?: TriggerTransitionProps;
  // contentClassName & variant
  disableModalBackdropBlur?: boolean;
  modalClassName?: string;
}

function DialogTrigger(props: DialogTriggerProps) {
  const {
    children,
    type = "modal",
    // mobileType = type === "popup" ? "modal" : type,
    hideArrow,
    targetRef,
    isDismissable = false,
    portalSelector = "body",
    isKeyboardDismissDisabled = false,
    focusOnProps,
    placement,
    containerPadding,
    offset = 16,
    crossOffset,
    shouldFlip,
    shouldCloseOnBlur,
    "data-id": dataId,
    transition,
    transitionProps: transitionPropsFromProps,
    disableModalBackdropBlur = false,
    modalClassName,
  } = props;

  const popupSpecificProps = {
    placement,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
    shouldCloseOnBlur,
    hideArrow,
  };

  if (!Array.isArray(children) || children.length > 2) {
    throw new Error("DialogTrigger must have exactly 2 children");
  }
  // if a function is passed as the second child, it won't appear in toArray
  const [trigger, content] = children as [ReactElement, DialogClose];

  // On small devices, show a modal or tray instead of a popup.
  // handle cases where desktop popups need a close button for the mobile modal view

  // Note that popups are automatically rendered as modals on mobile by default. See the mobile type option for more information.

  // const isMobile = useIsMobileDevice();
  // if (isMobile) {
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
  // (which invalidates the popup positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (
        (wasOpen.current || isExiting.current) &&
        type !== "popup" &&
        type !== "tray"
      ) {
        console.warn(
          "A DialogTrigger unmounted while open. This is likely due to being placed within a trigger that unmounts or inside a conditional. Consider using a DialogContainer instead."
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === "popup") {
    return (
      <PopupTrigger
        {...popupSpecificProps}
        {...{
          // hideArrow,
          state,
          targetRef,
          triggerRef,
          trigger,
          content,
          triggerProps,
          overlayProps,
          isDismissable,
          isKeyboardDismissDisabled,
          dataId,
          portalSelector,
        }}
        focusOnProps={focusOnProps}
      />
    );
  }

  const transitionPropsDefault = {
    onExiting: () => onExiting(),
    onExited: () => onExited(),
  };

  const renderOverlay = () => {
    switch (type) {
      case "fullscreen":
      case "fullscreenTakeover":
      case "modal":
        return (
          <Modal
            isOpen={state.isOpen}
            onDismiss={() => state.close()}
            disableBackdropClick={!isDismissable}
            disableEscapeKey={isKeyboardDismissDisabled}
            className={modalClassName}
            variant={portalSelector ? "fixed" : false}
            transitionProps={
              transitionPropsFromProps
                ? mergeProps(transitionPropsDefault, transitionPropsFromProps)
                : transitionPropsDefault
            }
            {...overlayProps}
            {...{
              portalSelector,
              transition,
              focusOnProps,
              disableModalBackdropBlur,
            }}
            data-id={dataId ? `${dataId}--modal` : undefined}
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
  props: DialogTriggerProps
) => JSX.Element;
export { _DialogTrigger as DialogTrigger };

/**
 * PopupTrigger
 */

interface PopupTriggerProps
  extends Omit<DialogTriggerBase, "type" | "overlay"> {
  content: DialogClose | ReactElement;
  /**
   * The ref of the element the popup should visually attach itself to.
   * Defaults to the trigger button if not defined.
   */
  targetRef?: React.RefObject<HTMLElement>;
  triggerRef: React.RefObject<HTMLElement>;
  isKeyboardDismissDisabled?: boolean;
  overlayProps: React.HtmlHTMLAttributes<HTMLDivElement>;
  /** Props for the internal `FocusOn` component see - https://github.com/theKashey/react-focus-on#api */
  focusOnProps?: TriggerFocusOnProps;
  dataId?: string;
  portalSelector?: string | false;
  hideArrow?: boolean;
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
  dataId,
  focusOnProps,
  portalSelector,
  ...props
}: PopupTriggerProps) {
  const triggerPropsWithRef = {
    ...triggerProps,
    ref: targetRef ? undefined : triggerRef,
  };

  const popup = (
    <Popup
      {...props}
      triggerRef={targetRef || triggerRef}
      {...overlayProps}
      isOpen={state.isOpen}
      onClose={() => state.close()}
      focusOnProps={focusOnProps}
      data-id={dataId ? `${dataId}--popup` : undefined}
    >
      {typeof content === "function" ? content(() => state.close()) : content}
    </Popup>
  );

  const overlay = (
    <>
      {state.isOpen && portalSelector
        ? // If portalSelector render inside; elso render inline.
          createPortal(
            popup,
            document.querySelector(portalSelector) as HTMLElement
          )
        : popup}
    </>
  );
  return (
    <DialogTriggerBase
      type="popup"
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

export interface DialogTriggerBase {
  type: OverlayType;
  state: OverlayTriggerState;
  isDismissable?: boolean;
  dialogProps?: DialogProps;
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
}: DialogTriggerBase) {
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
