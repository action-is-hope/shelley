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
            state={state}
            offset={8}
            ref={overlayRef}
            triggerRef={triggerRef}
            placement="end"
          >
            <Dialog size="small">Children</Dialog>
          </Popup>
        </Portal>
      )}
    </div>
  );
};
