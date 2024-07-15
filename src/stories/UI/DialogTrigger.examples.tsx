import { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  ModalProps,
  DialogTrigger,
  Dialog,
  P,
  H2,
} from "../../indexLib";
import { classes as dialog } from "../../Dialog/dialog.st.css";

export const BasicDialogTrigger = (args: ModalProps) => {
  return (
    <DialogTrigger
      type="popup"
      {...args}
      // popupClassName="test"
      // popupProps={{ isNonModal: true }}
    >
      <Button>Disk Status</Button>
      <Dialog>
        <H2 vol={4} className={dialog.title} data-title>
          c://
        </H2>
        <hr className={dialog.divider} />
        <P className={dialog.content}>50% disk space remaining.</P>
      </Dialog>
    </DialogTrigger>
  );
};

export const ContentExample = (args: ModalProps) => {
  return (
    <DialogTrigger
      {...args}

      // transitionProps={{
      //   onEntering: () => console.log("entering"),
      //   onExited: () => console.log("exited"),
      // }}
      // transition="zoom"
      // disableModalBackdropBlur
      // isKeyboardDismissDisabled
      // isDismissable
    >
      <Button>Checkout</Button>
      {(close) => (
        <Dialog>
          <H2 vol={4} className={dialog.title} data-title>
            Confirm checkout?
          </H2>
          <hr className={dialog.divider} />
          <P className={dialog.content} vol={2}>
            You have 5 items in your cart. Proceed to checkout?
          </P>
          <ButtonGroup className={dialog.buttonGroup}>
            <Button variant="secondary" onPress={close}>
              Cancel
            </Button>
            <Button variant="primary" onPress={close} data-autofocus>
              Confirm
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  );
};

export const ModalExample = () => {
  return (
    <DialogTrigger
      type="modal"
      // Defaults to body, set to false to render inline

      // react-focus-on props
      focusOnProps={{}}
      // Transition props from Modal
      // transition="slideUp"
      // transition="slideFromStart"
      transition="slideUp"
      transitionProps={{}}
    >
      <Button>Unlink</Button>
      {(close) => (
        <Dialog>
          <H2 vol={4} className={dialog.title} data-title>
            Unlinking email
          </H2>
          <hr className={dialog.divider} />
          <P className={dialog.content} vol={2}>
            This will unlink your email from your profile "TestUser". Are you
            sure?
          </P>
          <ButtonGroup className={dialog.buttonGroup}>
            <Button variant="secondary" onPress={close}>
              Cancel
            </Button>
            <Button variant="primary" onPress={close} data-autofocus>
              Confirm
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  );
};

export const DialogTriggerTargetRef = (args: ModalProps) => {
  const targetRef = useRef(null);
  return (
    <>
      <DialogTrigger type="popup" {...args} targetRef={targetRef}>
        <Button>Trigger</Button>
        <Dialog>
          <H2 vol={4} className={dialog.title} data-title>
            Anchor
          </H2>
          <hr className={dialog.divider} />
          <P className={dialog.content} vol={2}>
            This is a popup anchored to the span.
          </P>
        </Dialog>
      </DialogTrigger>

      <div style={{ marginTop: 80 }}>
        <P vol={1}>
          <span ref={targetRef}>popup appears over here</span>
        </P>
      </div>
    </>
  );
};

export const DialogTriggerPlacement = () => {
  return (
    <DialogTrigger placement="right top" type="popup">
      <Button>Trigger</Button>
      <Dialog>
        <H2 vol={4} className={dialog.title} data-title>
          Placement
        </H2>
        <hr className={dialog.divider} />
        <P className={dialog.content} vol={2}>
          This is a popover placed to the right of its trigger and offset so the
          arrow is at the top of the dialog.
        </P>
      </Dialog>
    </DialogTrigger>
  );
};

export const DialogTriggerOffset = () => {
  return (
    <DialogTrigger offset={50} type="popup">
      <Button>Trigger</Button>
      <Dialog>
        <H2 vol={4} className={dialog.title} data-title>
          Offset
        </H2>
        <hr className={dialog.divider} />
        <P className={dialog.content} vol={2}>
          Offset by 50px, 16px is default.
        </P>
      </Dialog>
    </DialogTrigger>
  );
};

export const DialogTriggerCrossOffset = () => {
  return (
    <DialogTrigger crossOffset={100} type="popup">
      <Button>Trigger</Button>
      <Dialog>
        <H2 vol={4} className={dialog.title} data-title>
          Cross offset
        </H2>
        <hr className={dialog.divider} />
        <P className={dialog.content} vol={2}>
          Cross offset by 100px.
        </P>
      </Dialog>
    </DialogTrigger>
  );
};

export const EventExample = () => {
  const [state, setState] = useState(false);
  return (
    <>
      <DialogTrigger
        type="popup"
        placement="top"
        onOpenChange={(isOpen) => setState(isOpen)}
      >
        <Button>Whispers</Button>
        <Dialog>
          <H2 vol={4} className={dialog.title} data-title>
            Whispers and DMs
          </H2>
          <hr className={dialog.divider} />
          <P className={dialog.content} vol={2}>
            You have 0 new messages.
          </P>
        </Dialog>
      </DialogTrigger>

      <P vol={1}>Current open state: {state.toString()}</P>
    </>
  );
};
