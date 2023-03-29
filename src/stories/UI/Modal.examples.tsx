import {
  Button,
  H2,
  ModalProps,
  Modal,
  TextField,
  ActionButton,
} from "../../indexLib";
import { useState } from "react";
import { classes as modalClasses } from "./modalExample.st.css";

export const BasicModal = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <>
      <ActionButton onPress={() => setOverlayOpen(!overlayOpen)}>
        Toggle1
      </ActionButton>
      <Modal
        isOpen={overlayOpen}
        onDismiss={() => setOverlayOpen(false)}
        transition={false}
        data-id="modal-test"
        className={"modal-classname-test"}
        portalSelector="#portal"
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

export const ModalCustomTransition = (args: ModalProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOverlayOpen(!overlayOpen)}>Toggle1</Button>
      <Modal
        {...args}
        isOpen={overlayOpen !== false}
        onDismiss={() => setOverlayOpen(false)}
        portalSelector="#portal"
        // theme="HI"
        // initialFocusRef={inputRef}
        transition={false}
        // variant={1}
        // portalSelector={false}
        // focusOnProps={{ shards: shards }}
        // disableBackgroundClick
        // disableEscapeKey
        // disableFocusLock
        data-testid="modal-window"
        className={modalClasses.myTransition}
        focusOnProps={{
          onEscapeKey: () => console.log("hello!"),
          onClickOutside: () => console.log("onClickOutside"),
        }}
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
