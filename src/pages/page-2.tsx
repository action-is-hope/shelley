import React, { useState, useRef, useLayoutEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Dialog from "../components/Dialog/Dialog";
import Button from "../components/Button/Button";

const SecondPage = () => {
  const [backlogModalOpen, setBacklogModalOpen] = useState(false);
  const [modelClickAway, setModelClickAway] = useState(true);
  const toggleBacklogModal = () => {
    setBacklogModalOpen(prevState => !prevState);
  };
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const buttonRef = React.createRef<HTMLButtonElement>();

  // console.log(buttonRef); // { current: null }

  //   console.log("HI", buttonRef); // { current: <h1_object> }
  // });

  return (
    <DefaultLayout>
      <Button onClick={() => toggleBacklogModal()}>Open</Button>

      <Button ref={buttonRef}>Got me!</Button>
      <Dialog
        isOpen={backlogModalOpen}
        onDismiss={() => modelClickAway && toggleBacklogModal()}
        initialFocusRef={inputRef}
        ref={divRef}
        data-testid="modal-window"
      >
        <Button onClick={() => toggleBacklogModal()}>Close</Button>
        <button onClick={() => toggleBacklogModal()}>Not me</button>

        <Button ref={buttonRef} onClick={() => toggleBacklogModal()}>
          Got me!
        </Button>
        <input ref={inputRef} />
      </Dialog>
      <Button onClick={() => toggleBacklogModal()}>Open</Button>
    </DefaultLayout>
  );
};

export default SecondPage;
