/** MenuTrigger.tsx */
import React, { cloneElement, ReactElement } from "react";
import ReactDOM from "react-dom";
import { useMenuTrigger } from "@react-aria/menu";
import type { MenuTriggerType } from "@react-types/menu";
import { useMenuTriggerState } from "@react-stately/menu";
import Popup, { PopupProps } from "../Popup/Popup";

export interface MenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Disables the menu popup. */
  disabled?: boolean;
  /**
   * The selector of the element that the menu should render inside of.
   * @default 'body'
   */
  portalSelector?: string;
  /**
   * The contents of the MenuTrigger - a trigger and a Menu.
   */
  children: ReactElement[];
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
  /**
   * Whether the overlay is open by default (controlled).
   */
  isOpen?: boolean;
  /**
   * Whether the overlay is open by default (uncontrolled).
   */
  defaultOpen?: boolean;
  /**
   * Handler that is called when the overlay's open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether the menu should automatically flip direction when space is limited.
   * @default true
   */
  shouldFlip?: boolean;
  /**
   * The placement of the menu with respect to the trigger.
   * @default 'bottom start'
   */
  placement?: PopupProps["placement"];
  /**
   * The additional offset applied along the main axis between the menu and its
   * trigger element.
   * @default 0
   */
  offset?: number;
  /**
   * The additional offset applied along the cross axis between the menu and its
   * trigger element.
   * @default 0
   */
  crossOffset?: number;
}

export function MenuTrigger({
  children,
  closeOnSelect = true,
  crossOffset,
  defaultOpen,
  disabled,
  isOpen,
  offset,
  onOpenChange,
  placement = "bottom start",
  portalSelector = "body",
  shouldFlip,
  trigger,
  ...rest
}: MenuTriggerProps) {
  const triggerRef = React.useRef(null);
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
            isOpen={state.isOpen}
            onClose={state.close}
            {...{
              shouldFlip,
              triggerRef,
              placement,
              offset,
              crossOffset,
              ...rest,
            }}
            shouldCloseOnBlur
          >
            {menu}
          </Popup>,
          document.querySelector(portalSelector) as HTMLElement
        )}
    </>
  );
}

export default MenuTrigger;
