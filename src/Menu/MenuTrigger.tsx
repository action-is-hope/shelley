"use client";
import React, { cloneElement, ReactElement } from "react";
import { FocusScopeProps, useMenuTrigger } from "react-aria";
import type { MenuTriggerType } from "@react-types/menu";
import { useMenuTriggerState } from "@react-stately/menu";
import { Portal } from "../Portal";
import { Popup, PopupProps } from "../Popup";

export interface MenuTriggerProps
  extends FocusScopeProps,
    Pick<
      PopupProps,
      | "offset"
      | "crossOffset"
      | "hideArrow"
      | "isNonModal"
      | "isKeyboardDismissDisabled"
      | "placement"
      | "shouldFlip"
      | "shouldCloseOnInteractOutside"
      | "width"
    >,
    React.HTMLAttributes<HTMLDivElement> {
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
  /** Override the Popup style via this classname */
  popupClassName?: string;
}

export function MenuTrigger({
  children,
  closeOnSelect = true,
  defaultOpen,
  disabled,
  isOpen,
  offset = 12,
  onOpenChange,
  placement = "bottom start",
  portalSelector = "body",
  trigger,
  popupClassName,
  ...rest
}: MenuTriggerProps) {
  const triggerRef = React.useRef<HTMLElement>(null);
  const [menuTriggerChild, menuChild] = React.Children.toArray(children);

  // Create state based on the incoming props
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
    onClose: () => closeOnSelect && state.close(),
  });

  return (
    <>
      {menuTrigger}
      {state.isOpen && (
        <Portal selector={portalSelector}>
          <Popup
            state={state}
            className={popupClassName}
            {...{
              triggerRef,
              placement,
              offset,
              ...rest,
            }}
          >
            {menu}
          </Popup>
        </Portal>
      )}
    </>
  );
}
