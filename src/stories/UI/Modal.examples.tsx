import { Button, H2, ModalProps, Modal, TextField } from "../../indexLib";
import { useState } from "react";
import { classes as modalClasses } from "./modalExample.st.css";

export const ModalCustomTransition = (args: ModalProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOverlayOpen(!overlayOpen)}>Toggle</Button>
      <Modal
        {...args}
        isOpen={overlayOpen !== false}
        onDismiss={() => setOverlayOpen(false)}
        portalSelector="#portal"
        // theme="HI"
        // initialFocusRef={inputRef}
        transition={false}
        variant={1}
        // portalSelector={false}
        // focusOnProps={{ shards: shards }}
        // disableBackgroundClick
        // disableEscapeKey
        // disableFocusLock
        data-testid="modal-window"
        className={modalClasses.myTransition}
        transitionProps={{
          // classNames: modalClasses.myTransition,
          // className: modalClasses.myTransition,
          timeout: 190,
          onEntering: () => {
            document.body.classList.add(modalClasses.blurBackground);
          },
          onExiting: () => {
            document.body.classList.remove(modalClasses.blurBackground);
          },
        }}
      >
        <div
          // aria-hidden={!overlayOpen}
          style={{
            transition: "transform 190ms",
            // We need this in the DOM for the Modal transitions to work.
            transform: overlayOpen ? `scale(1)` : `scale(1)`,
          }}
        >
          <H2 vol={2} uppercase>
            Block settings
          </H2>
          <TextField label="Modal field" />
          <Button onPress={() => setOverlayOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  );
};
