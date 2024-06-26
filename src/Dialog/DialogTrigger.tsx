"use client";
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
import { generateDataId } from "../utils";
import { FocusScopeProps, mergeProps } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { PressResponder } from "@react-aria/interactions";
import { DialogContext } from "./context";
// import {useIsMobileDevice} from '@react-spectrum/utils';
import { useOverlayTrigger } from "@react-aria/overlays";
import { Portal } from "../Portal";
import { Modal, TransitionType } from "../Modal";
import { Popup, PopupProps } from "../Popup";

export type DialogClose = (close: () => void) => ReactElement;

export type OverlayType =
  | "modal"
  | "popup"
  | "fullscreen"
  | "fullscreenTakeover";

/**
 * We cannot support onClickOutside and onEscapeKey as these
 * are surpressed by react-aria. However we have access to
 * onActivation and onDeactivation events.
 */
export type TriggerFocusOnProps = Omit<
  ReactFocusOnProps,
  "children" | "onClickOutside" | "onEscapeKey"
>;

export type TriggerTransitionProps = Pick<
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

export interface DialogTriggerProps
  extends OverlayTriggerProps,
    PositionProps,
    FocusScopeProps {
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
   * Props for the Modals internal `FocusOn` component
   * see - https://github.com/theKashey/react-focus-on#api
   */
  focusOnProps?: TriggerFocusOnProps;
  /** Transition for Modal */
  transition?: TransitionType;
  transitionProps?: TriggerTransitionProps;
  /** Disable the blur effect on the Modal backdrop. */
  disableModalBackdropBlur?: boolean;
  /** Add a custom class to the Modal. */
  modalClassName?: string;
  /** Add a custom class to the Popup. */
  popupClassName?: string;
  /** Popup props */
  popupProps?: Partial<PopupProps>;
}

function _DialogTrigger(props: DialogTriggerProps) {
  const {
    children,
    type = "modal",
    // mobileType = type === "popup" ? "modal" : type,
    targetRef,
    isDismissable = false,
    portalSelector = "body",
    isKeyboardDismissDisabled = false,
    popupProps,
    placement,
    containerPadding,
    offset = 16,
    crossOffset,
    shouldFlip,
    hideArrow,
    "data-id": dataId,
    transition,
    transitionProps: transitionPropsFromProps,
    disableModalBackdropBlur = false,
    modalClassName,
    popupClassName,
    // Popup FocusScope props
    autoFocus,
    contain,
    restoreFocus = true,
    focusOnProps: focusOnPropsFromProps,
  } = props;

  const focusOnProps: TriggerFocusOnProps = {
    // map FocusScope props to FocusOn props
    autoFocus: autoFocus,
    enabled: contain,
    returnFocus: restoreFocus,
    ...focusOnPropsFromProps,
  };

  const popupSpecificProps = {
    autoFocus,
    contain,
    restoreFocus,
    placement,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
    hideArrow,
    ...popupProps,
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
      if ((wasOpen.current || isExiting.current) && type !== "popup") {
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
          popupClassName,
        }}
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
            data-id={generateDataId(dataId, "modal")}
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
_DialogTrigger.displayName = "DialogTrigger";

/**
 * DialogTrigger serves as a wrapper around a Dialog and its associated trigger, linking the Dialog's
 * open state with the trigger's press state. Additionally, it allows you to customize the type of Dialog.
 */

export const DialogTrigger = _DialogTrigger as (
  props: DialogTriggerProps
) => JSX.Element;
export { DialogTrigger as _DialogTrigger };

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
  dataId?: string;
  portalSelector?: string | false;
  hideArrow?: boolean;
  popupClassName?: string;
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
  portalSelector,
  popupClassName,
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
      className={popupClassName}
      state={state}
      data-id={generateDataId(dataId, "popup")}
    >
      {typeof content === "function" ? content(() => state.close()) : content}
    </Popup>
  );

  const overlay = (
    <>{state.isOpen && <Portal selector={portalSelector}>{popup}</Portal>}</>
  );
  return (
    <DialogTriggerBase
      type="popup"
      state={state}
      triggerProps={triggerPropsWithRef}
      trigger={trigger}
      overlay={overlay}
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
