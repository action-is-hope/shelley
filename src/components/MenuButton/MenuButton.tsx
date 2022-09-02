/** MenuButton.tsx */
import React, { Key } from "react";
import ReactDOM from "react-dom";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState } from "@react-stately/menu";
import type { PositionProps } from "@react-types/overlays";
// https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658 Should be resolved...
// import { useOverlayPosition } from "@react-aria/overlays";
/* = Style API. */
// import { st, classes } from "./menuButton.st.css";
import Popup from "../Popup/Popup";
import Menu, { MenuProps } from "../Menu/Menu";
import Button, { ButtonProps } from "../Button/Button";

import type { CollectionChildren } from "@react-types/shared/src/collections";

export interface MenuButtonProps<T>
  extends Omit<ButtonProps, "autoFocus" | "children" | "as"> {
  menuProps?: MenuProps<T>;
  position?: PositionProps; // @todo We don't want all of the props from overlays
  /** Label for the button, if you are using an icon only remember to provide an alt! */
  label?: string;
  focusStrategy?: "first" | "last";
  onAction?: (key: Key) => void;
  children: CollectionChildren<object>;
}
// extend position props and button
export function MenuButton<T extends object>({
  position: positionFromProps,
  focusStrategy,
  children,
  // Button props
  // isDisabled,
  onAction,
  // onPress,
  ...rest
}: MenuButtonProps<T>) {
  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);

  // Create state based on the incoming props /// removed props...
  const state = useMenuTriggerState({
    onOpenChange: () => console.log("working"), // works
    // defaultOpen: true, // works
    // Alignment related props have no effect as we are using useOverlayPosition for positioning.
  });

  const { menuTriggerProps, menuProps } = useMenuTrigger(
    /** The type of menu that the menu trigger opens. */
    // type?: 'menu' | 'listbox';
    /** Whether menu trigger is disabled. */
    // isDisabled?: boolean;
    /** How menu is triggered. */
    // trigger?: MenuTriggerType;
    {
      isDisabled: rest.disabled,
    },
    { ...state },
    triggerRef
  );

  return (
    <>
      <Button
        {...menuTriggerProps}
        aria-haspopup="menu"
        {...rest}
        ref={triggerRef}
      >
        {rest.label}
      </Button>
      {state.isOpen &&
        ReactDOM.createPortal(
          <Popup
            // Focus
            overlayProps={{ ...positionFromProps }}
            isOpen={state.isOpen}
            onClose={() => state.close()}
            triggerRef={triggerRef}
            ref={overlayRef}
          >
            <Menu
              {...{ children, onAction }}
              // Required to supress Adobe #a11y prop checker which issues a console warning, the actual value is provided by menuProps so lighthouse reports etc are fine.
              aria-labelledby=""
              ariaProps={menuProps}
              onClose={() => state.close()}
              // autoFocus="last"
              // selectionMode="multiple"
              // autoFocus={focusStrategy || state.focusStrategy}
            />
          </Popup>,
          document.querySelector("body") as HTMLElement
        )}
    </>
  );
}

export default MenuButton;
