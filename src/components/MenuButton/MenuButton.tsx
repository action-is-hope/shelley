/** MenuButton.tsx */
import React from "react";
import ReactDOM from "react-dom";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState } from "@react-stately/menu";
// import { useOverlayTriggerState } from "@react-stately/overlays";
import type { PositionProps } from "@react-types/overlays";

// https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658
// import { useButton } from "@react-aria/button";
// @react-types/menu
//import {useOverlayTriggerState} from '@react-stately/overlays';
import { useOverlayPosition } from "@react-aria/overlays";
// import type { MenuTriggerProps } from "@react-types/menu";
// import type { PositionProps } from "@react-types/overlays";
/* = Style API. */
// import { st, classes } from "./menuButton.st.css";
import MenuPopup from "../MenuPopup/MenuPopup";
import Button, { ButtonProps } from "../Button/Button";

export interface MenuButtonProps extends ButtonProps {
  // omit as
  position?: PositionProps;
  label: string;
  focusStrategy?: "first" | "last";
  onAction?: (e: any) => void;
}
// extend position props and button
const MenuButton = ({
  position: positionFromProps,
  focusStrategy,
  children,
  // Button props
  isDisabled,
  onAction,
  onPress,
  ...rest
}: MenuButtonProps) => {
  // Create state based on the incoming props /// removed props...
  const state = useMenuTriggerState({
    onOpenChange: () => console.log("working"),
    // align: "start",
    // focusStrategy: "last",
    closeOnSelect: false,
  });

  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const { menuTriggerProps: triggerProps, menuProps } = useMenuTrigger(
    // /** The type of menu that the menu trigger opens. */
    // type?: 'menu' | 'listbox';
    // /** Whether menu trigger is disabled. */
    // isDisabled?: boolean;
    { isDisabled }, //isDisabled
    state,
    triggerRef
  );

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  // const { triggerProps, overlayProps: overlayTriggerProps } = useOverlayTrigger(
  //   { type: "menu" },
  //   state,
  //   triggerRef
  // );

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    // Position Props
    placement: "top",
    offset: 5,
    crossOffset: -4,
    containerPadding: 0,
    isOpen: state.isOpen,
    // override from prop values
    ...positionFromProps,
  });
  console.log("rest", rest);
  return (
    <>
      <Button
        onPress={(e: any) => {
          state.open();
          onPress && onPress(e);
        }}
        {...triggerProps}
        {...rest}
        ref={triggerRef}
      >
        {rest.label}
      </Button>
      {state.isOpen &&
        ReactDOM.createPortal(
          <MenuPopup
            // {...rest}
            {...{ children, onAction }}
            {...positionProps}
            // Required to supress a11y console warning, actual value provided by menuProps.
            aria-labelledby
            domProps={menuProps}
            autoFocus={focusStrategy || state.focusStrategy}
            // autoFocus={true}
            onClose={() => state.close()}
            ref={overlayRef}
            // onAction={(i: any) => console.log("onPress", i)}
          />,
          document.querySelector("body") as HTMLElement
        )}
    </>
  );
};

export default MenuButton;
