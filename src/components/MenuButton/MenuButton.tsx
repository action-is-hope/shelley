/** MenuButton.tsx */
import React from "react";
import ReactDOM from "react-dom";
import { useMenuTrigger } from "@react-aria/menu";
import { useMenuTriggerState } from "@react-stately/menu";

// https://github.com/adobe/react-spectrum/issues/1388#issuecomment-781094658
import { useButton } from "@react-aria/button";
// @react-types/menu
import { useOverlayPosition } from "@react-aria/overlays";
// import type { MenuTriggerProps } from "@react-types/menu";
// import type { PositionProps } from "@react-types/overlays";
/* = Style API. */
// import { st, classes } from "./menuButton.st.css";
import MenuPopup from "../MenuPopup/MenuPopup";
import Button from "../Button/Button";

// extend position props and button
const MenuButton = (props: any) => {
  // Create state based on the incoming props /// removed props...
  const state = useMenuTriggerState({
    onOpenChange: () => console.log("working"),
    align: "start",
    closeOnSelect: false,
  });
  // Get props for the menu trigger and menu elements
  const triggerRef = React.useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);

  const overlayRef = React.useRef(null);
  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "top", //positionProps
    offset: 5, //positionProps
    crossOffset: -4, //positionProps
    containerPadding: 0, //positionProps
    isOpen: state.isOpen, //positionProps
    // shouldFlip: false, //positionProps
  });

  // Get props for the button based on the trigger props from useMenuTrigger
  const { buttonProps } = useButton(menuTriggerProps, triggerRef);

  return (
    <>
      <Button {...buttonProps} ref={triggerRef}>
        {props.label}
      </Button>
      {state.isOpen &&
        // (
        //   <MenuPopup
        //     {...props}
        //     {...positionProps}
        //     domProps={menuProps}
        //     autoFocus={state.focusStrategy}
        //     onClose={() => state.close()}
        //     ref={overlayRef}
        //   />
        // )
        ReactDOM.createPortal(
          <MenuPopup
            {...props}
            {...positionProps}
            // Required to supress a11y console warning, actual value provided by menuProps.
            aria-labelledby
            domProps={menuProps}
            autoFocus={state.focusStrategy}
            onClose={() => state.close()}
            ref={overlayRef}
          />,
          document.querySelector("body")
        )}
    </>
  );
};

export default MenuButton;
