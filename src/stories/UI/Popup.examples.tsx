import { useRef } from "react";
import { Popup, PopupProps, Button } from "../../indexLib";
import { useOverlayTrigger } from "react-aria";
import { useMenuTriggerState } from "@react-stately/menu";

export const SimplePopup = (args: PopupProps) => {
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);
  const state = useMenuTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type: "dialog",
    },
    { ...state },
    triggerRef
  );

  return (
    <>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button {...triggerProps} ref={triggerRef} disabled={state.isOpen}>
        Click me
      </Button>
      {state.isOpen && (
        <Popup
          // Focus
          shouldCloseOnBlur={true}
          placement="start bottom"
          {...args}
          {...overlayProps}
          isOpen={state.isOpen}
          onClose={() => state.close()}
          ref={overlayRef}
          triggerRef={triggerRef}
        >
          Children
        </Popup>
      )}
    </>
  );
};
