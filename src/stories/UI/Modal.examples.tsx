// import React from "react";
import {
  Button,
  H2,
  P,
  Dialog,
  ModalProps,
  Modal,
  TextField,
  ActionButton,
  DialogTrigger,
  Switch,
} from "../../indexLib";
import { useState, useRef } from "react";

import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

// import "./modalExample.st.css";
import { classes as modalClasses } from "./modalExample.st.css";

export const BasicModal = () => {
  const triggerRef = useRef(null);
  const state = useOverlayTriggerState({});
  //Get props for the trigger and overlay.
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );
  return (
    <>
      <ActionButton ref={triggerRef} {...triggerProps}>
        Toggle Modal
      </ActionButton>
      <Modal
        isOpen={state.isOpen}
        onDismiss={state.close}
        portalSelector="#portal"
        {...overlayProps}
      >
        <div role="dialog">
          <H2 vol={2} uppercase>
            Custom Dialog
          </H2>
          <TextField label="Text field" />
          <ActionButton onPress={() => state.close()}>Close</ActionButton>
        </div>
      </Modal>
    </>
  );
};

export const ModalCustomTransition = (args: ModalProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOverlayOpen(!overlayOpen)}>myTransition</Button>
      <Modal
        {...args}
        isOpen={overlayOpen !== false}
        onDismiss={() => setOverlayOpen(false)}
        portalSelector="#portal"
        transition={"myTransition"}
        // focusOnProps={{
        //   onEscapeKey: () => console.log("hello!"),
        //   onClickOutside: () => console.log("onClickOutside"),
        // }}
      >
        <H2 vol={2}>Custom Dialog</H2>
        <TextField label="Modal field" />
        <Button onPress={() => setOverlayOpen(false)}>Close</Button>
      </Modal>
    </>
  );
};

export const ModalCustomTransitionDialogTrigger = () => {
  return (
    <DialogTrigger
      portalSelector="#portal"
      transition="myTransition"
      transitionProps={{
        // timeout set to 190 by default
        timeout: 300,
        onEnter: () => console.log("onEnter"),
        onEntering: () => console.log("onEntering"),
        onEntered: () => console.log("onEntered"),
        onExit: () => console.log("onExit"),
        onExiting: () => console.log("onExiting"),
        onExited: () => console.log("onExited"),
        // mountOnEnter: true,
        // unmountOnExit on by default
        // unmountOnExit: false,
      }}
      isDismissable
    >
      <ActionButton>myTransition</ActionButton>
      {(close) => (
        <div>
          <div role="dialog">
            <H2 vol={2}>Custom Dialog</H2>
            <TextField label="Modal field" />
            <Button onPress={close}>Close</Button>
          </div>
        </div>
      )}
    </DialogTrigger>
  );
};

export const ShardExample = () => {
  const preview = useRef(null);
  const [shards, setShards] = useState(true);
  return (
    <div className={modalClasses.shardExample}>
      <div style={{ gridArea: "header", background: "#333" }}>
        <ActionButton>Log in/out</ActionButton>
      </div>

      <div style={{ position: "relative", gridArea: "content" }}>
        <P vol={2}>Content blocks</P>
        <br />
        <Switch size={1} onChange={() => setShards(!shards)} defaultSelected>
          shards
        </Switch>
        <br />
        <DialogTrigger
          // Renders inline and internally turns off position: fixed
          portalSelector={false}
          // Add a modal class so we can position it.
          modalClassName={modalClasses.modalExample}
          // Set the shards
          focusOnProps={{ shards: shards ? [preview] : [] }}
          isDismissable
        >
          <ActionButton>Initialise Overlay</ActionButton>
          <Dialog size="small">
            <H2 vol={4} style={{ gridArea: "title" }} data-title>
              Settings
            </H2>
            <div style={{ gridArea: "content" }}>
              <ActionButton>Control 1</ActionButton>
              <ActionButton>Control 2</ActionButton>
            </div>
          </Dialog>
        </DialogTrigger>
      </div>

      <div ref={preview} style={{ gridArea: "preview" }}>
        <ActionButton>Mobile</ActionButton>
        <ActionButton>Tablet</ActionButton>
        <ActionButton>Laptop</ActionButton>
        <P vol={4}>Preview Area</P>
        <P vol={1}>
          This area is {!shards && "not "} accessible and {!shards && "is not"}{" "}
          inside the focus lock when overlay is active
        </P>
      </div>

      <div style={{ gridArea: "actions" }}>
        <Button>Publish</Button>
      </div>
    </div>
  );
};
