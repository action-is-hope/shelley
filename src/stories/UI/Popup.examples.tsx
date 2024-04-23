import { useRef } from "react";
import { Popup, Button, Dialog, Portal } from "../../indexLib";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

export const SimplePopup = () => {
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);
  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type: "dialog",
    },
    state,
    triggerRef
  );

  return (
    <div>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button
        id="test"
        {...triggerProps}
        ref={triggerRef}
        isDisabled={state.isOpen}
      >
        Click me
      </Button>
      {state.isOpen && (
        <Portal selector="body">
          <Popup
            {...overlayProps}
            // isKeyboardDismissDisabled
            // isNonModal
            // contain
            // restoreFocus={false}
            // shouldCloseOnInteractOutside={(element) => {
            //   // Do not close the popover if the clicked element is part of a specific toolbar
            //   return !element.closest("body");
            // }}
            shouldCloseOnInteractOutside={() => false}
            state={{ ...state }}
            offset={8}
            ref={overlayRef}
            triggerRef={triggerRef}
            placement="end"
          >
            <Dialog size="small">
              <button>sss</button>
            </Dialog>
          </Popup>
        </Portal>
      )}
      <button>sss</button>
    </div>
  );
};
