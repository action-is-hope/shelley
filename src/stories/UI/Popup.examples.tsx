import { useRef } from "react";
import { createPortal } from "react-dom";
import { Popup, ActionButton, Dialog } from "../../indexLib";
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
      <ActionButton
        id="test"
        {...triggerProps}
        ref={triggerRef}
        isDisabled={state.isOpen}
      >
        Click me
      </ActionButton>
      {createPortal(
        <Popup
          {...overlayProps}
          isOpen={state.isOpen}
          onClose={() => state.close()}
          offset={8}
          ref={overlayRef}
          triggerRef={triggerRef}
        >
          <Dialog size="small">Children</Dialog>
        </Popup>,
        document.querySelector("#portal") as HTMLElement
      )}
    </div>
  );
};
