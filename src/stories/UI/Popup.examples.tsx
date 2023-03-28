import { useRef } from "react";
import { Popup, PopupProps, Button } from "../../indexLib";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

export const SimplePopup = (args: PopupProps) => {
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
    <>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button
        id="test"
        {...triggerProps}
        ref={triggerRef}
        disabled={state.isOpen}
      >
        Click me
      </Button>
      <Popup
        {...overlayProps}
        // {...args}
        isOpen={state.isOpen}
        onClose={() => state.close()}
        ref={overlayRef}
        triggerRef={triggerRef}
      >
        Children
      </Popup>
    </>
  );
};
