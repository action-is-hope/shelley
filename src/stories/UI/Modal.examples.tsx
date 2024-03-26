// import React from "react";
import {
  Button,
  H2,
  P,
  Dialog,
  ModalProps,
  Modal,
  TextField,
  DialogTrigger,
  Switch,
  RadioGroup,
  Radio,
} from "../../indexLib";
import { useState, useRef } from "react";

import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

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
      <Button ref={triggerRef} {...triggerProps}>
        Toggle Modal
      </Button>
      <Modal isOpen={state.isOpen} onDismiss={state.close} {...overlayProps}>
        <div role="dialog">
          <H2 vol={2} uppercase>
            Custom Dialog
          </H2>
          <TextField label="Text field" />
          <Button onPress={() => state.close()}>Close</Button>
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
  const [transiton, setTransition] = useState("myTransition");
  return (
    <>
      <RadioGroup
        label="Select transition"
        value={transiton}
        onChange={(key) => setTransition(key)}
      >
        <Radio value="myTransition">myTransition</Radio>
        <Radio value="slideUp">slideUp</Radio>
        <Radio value="slideFromStart">slideFromStart</Radio>
        <Radio value="slideFromEnd">slideFromEnd</Radio>
        <Radio value="zoom">zoom</Radio>
      </RadioGroup>

      <DialogTrigger
        transition={transiton}
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
        <Button>View Transition</Button>
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
    </>
  );
};

export const ShardExample = () => {
  const preview = useRef(null);
  const [shards, setShards] = useState(true);
  return (
    <div className={modalClasses.shardExample}>
      <div style={{ gridArea: "header" }}>
        <Button>Log in/out</Button>
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
          <Button>Initialise Overlay</Button>
          <Dialog size="small">
            <H2 vol={4} style={{ gridArea: "title" }} data-title>
              Settings
            </H2>
            <div style={{ gridArea: "content" }}>
              <Button>Control 1</Button>
              <Button>Control 2</Button>
            </div>
          </Dialog>
        </DialogTrigger>
      </div>

      <div ref={preview} style={{ gridArea: "preview" }}>
        <Button>Mobile</Button>
        <Button>Tablet</Button>
        <Button>Laptop</Button>
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
