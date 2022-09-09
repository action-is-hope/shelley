/** MenuTrigger.tsx */
import React, { ReactNode, cloneElement, ReactElement } from "react";
import ReactDOM from "react-dom";
import { useMenuTrigger } from "@react-aria/menu";
import type { MenuTriggerType } from "@react-types/menu";
import { useMenuTriggerState } from "@react-stately/menu";
// import { mergeProps } from "@react-aria/utils";
import type { PositionProps } from "@react-types/overlays";
// https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658 Should be resolved...
// import { useOverlayPosition } from "@react-aria/overlays";
import Popup from "../Popup/Popup";

export interface MenuTriggerProps {
  position?: PositionProps; // @todo We don't want all of the props from overlays
  disabled?: boolean;
  portalSelector?: string;
  children: ReactNode;
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  trigger?: MenuTriggerType;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
  /** Whether the overlay is open by default (controlled). */
  isOpen?: boolean;
  /** Whether the overlay is open by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Handler that is called when the overlay's open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether the menu should automatically flip direction when space is limited.
   * @default true
   */
  shouldFlip?: boolean;
}

// {
//     /**
//    * How the menu is triggered.
//    * @default 'press'
//    */
//      trigger?: MenuTriggerType,
//      /**
//       * Alignment of the menu relative to the trigger.
//       * @default 'start'
//       */
//      align?: Alignment,
//      /**
//       * Where the Menu opens relative to its trigger.
//       * @default 'bottom'
//       */
//      direction?: 'bottom' | 'top' | 'left' | 'right' | 'start' | 'end',

// extend position props and button
export function MenuTrigger({
  position: positionFromProps,
  children,
  disabled,
  closeOnSelect = true,
  onOpenChange,
  shouldFlip,
  defaultOpen,
  isOpen,
  trigger,
  portalSelector = "body",
}: MenuTriggerProps) {
  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const [menuTriggerChild, menuChild] = React.Children.toArray(children);

  // Create state based on the incoming props /// removed props...
  const state = useMenuTriggerState({
    defaultOpen,
    onOpenChange,
    isOpen,
  });

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    {
      isDisabled: disabled,
      trigger,
    },
    { ...state },
    triggerRef
  );

  const menuTrigger = cloneElement(menuTriggerChild as ReactElement, {
    ...menuTriggerProps,
    ref: triggerRef,
  });

  const menu = cloneElement(menuChild as ReactElement, {
    ...menuProps,
    onClose: closeOnSelect && state.close,
  });

  return (
    <>
      {menuTrigger}
      {state.isOpen &&
        ReactDOM.createPortal(
          <Popup
            // Focus
            // overlayProps={{ ...positionFromProps }}
            isOpen={state.isOpen}
            // onClose={() => state.close()}
            onClose={state.close}
            ref={overlayRef}
            {...{ shouldFlip, triggerRef }}
            shouldCloseOnBlur
            placement="bottom start"
          >
            {menu}
          </Popup>,
          document.querySelector(portalSelector) as HTMLElement
        )}
    </>
  );
}

export default MenuTrigger;
