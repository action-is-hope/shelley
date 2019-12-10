import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Dialog from "../components/Dialog/Dialog";
import Notification from "../components/Notification/Notification";
import Button from "../components/Button/Button";
import { Theme as defaultTheme } from "../themes/default";
import { Tooltip } from "../components/Tooltip/Tooltip";
import OnDemandLiveRegion from "on-demand-live-region";

const SecondPage = () => {
  const [backlogModalOpen, setBacklogModalOpen] = useState(false);
  const [modelClickAway, setModelClickAway] = useState(true);
  const toggleBacklogModal = () => {
    setBacklogModalOpen(prevState => !prevState);
  };
  const [messages, setMessages] = React.useState([]);
  const [notification, setNotification] = React.useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const buttonRef = React.createRef<HTMLButtonElement>();

  // console.log(buttonRef); // { current: null }

  //   console.log("HI", buttonRef); // { current: <h1_object> }
  // });

  const liveRegion = new OnDemandLiveRegion();

  const liveRegionDelayed = new OnDemandLiveRegion({
    level: "assertive",
    delay: 500
  });

  // liveRegion.say("Hello World!");

  return (
    <DefaultLayout>
      <Button onClick={() => setNotification(true)}>Open</Button>
      <Button
        ref={buttonRef}
        onClick={() => {
          setNotification(true);
        }}
      >
        Got me!
      </Button>

      <Notification
        autoHideDuration={2000}
        isOpen={notification}
        initialFocusRef={buttonRef}
        onDismiss={() => setNotification(prevState => !prevState)}
        theme={defaultTheme}
        transitionProps={{
          timeout: 300
        }}
      >
        <p>I am a notification</p>
        {/* onClose={() => setSnackBar({ componentName: snackBar.componentName, display: false })} */}
        <Button onClick={() => toggleBacklogModal()} size="xs">
          Undo
        </Button>
        <Button
          ref={buttonRef}
          onClick={() => setNotification(false)}
          size="xs"
        >
          Close
        </Button>
      </Notification>

      <Dialog
        isOpen={backlogModalOpen}
        onDismiss={() => modelClickAway && toggleBacklogModal()}
        initialFocusRef={inputRef}
        ref={divRef}
        data-testid="modal-window"
        transitionProps={{
          timeout: 300,
          onEnter: item => console.log(item, "Blah")
        }}
        theme={defaultTheme}
      >
        <Button onClick={() => toggleBacklogModal()}>Close</Button>
        <button onClick={() => toggleBacklogModal()}>Not me</button>

        <Button ref={buttonRef} onClick={() => toggleBacklogModal()}>
          Got me!
        </Button>
        <input ref={inputRef} />
      </Dialog>
    </DefaultLayout>
  );
};

export default SecondPage;
