/** MenuButton.tsx */
import React from "react";
import ReactDOM from "react-dom";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState } from "@react-stately/menu";
import type { PositionProps } from "@react-types/overlays";
// https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658
import { useOverlayPosition } from "@react-aria/overlays";
/* = Style API. */
// import { st, classes } from "./menuButton.st.css";
import MenuPopup from "../MenuPopup/MenuPopup";
import Button, { ButtonProps } from "../Button/Button";

import type { CollectionChildren } from "@react-types/shared/src/collections";

export interface MenuButtonProps extends ButtonProps {
  // omit as
  position?: PositionProps;
  /** Label for the button, if you are using an icon only remember to provide an alt! */
  label?: string;
  focusStrategy?: "first" | "last";
  onAction?: (key: string) => void;
  children: CollectionChildren<object>;
}
// extend position props and button
const MenuButton = ({
  position: positionFromProps,
  focusStrategy,
  children,
  // Button props
  // isDisabled,
  onAction,
  // onPress,
  ...rest
}: MenuButtonProps) => {
  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);

  // Create state based on the incoming props /// removed props...
  const state = useMenuTriggerState({
    onOpenChange: () => console.log("working"),
    // align: "start",
    // focusStrategy: "last",
    closeOnSelect: false,
  });

  const { menuTriggerProps: triggerProps, menuProps } = useMenuTrigger(
    // /** The type of menu that the menu trigger opens. */
    // type?: 'menu' | 'listbox';
    // /** Whether menu trigger is disabled. */
    // isDisabled?: boolean;
    { isDisabled: false }, //isDisabled
    state,
    triggerRef
  );

  // console.log("TriggerProps", triggerProps);
  // console.log("MenuProps", menuProps);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the MenuPopup positioning).
  // const { triggerProps, overlayProps: overlayTriggerProps } = useOverlayTrigger(
  //   { type: "menu" },
  //   state,
  //   triggerRef
  // );

  // Get MenuPopup positioning props relative to the trigger
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

  // console.log("rest", rest);
  return (
    <>
      <Button {...triggerProps} {...rest} ref={triggerRef}>
        {rest.label}
      </Button>
      {state.isOpen &&
        ReactDOM.createPortal(
          <MenuPopup
            // {...rest}
            {...positionProps}
            {...{ children, onAction }}
            // Required to supress a11y console warning, actual value provided by menuProps.
            // aria-labelledby
            domProps={menuProps}
            autoFocus={focusStrategy || state.focusStrategy}
            onClose={() => state.close()}
            ref={overlayRef}
          />,
          document.querySelector("body") as HTMLElement
        )}
    </>
  );
};

export default MenuButton;
