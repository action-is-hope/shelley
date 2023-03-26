import { useRef, useState } from "react";
import {
  ActionButton,
  Button,
  ButtonGroup,
  ModalProps,
  DialogTrigger,
  DialogTriggerProps,
  Dialog,
  P,
  H2,
} from "../../indexLib";
import { classes as dialog } from "../../components/Dialog/dialog.st.css";

export const BasicDialogTrigger = (args: ModalProps) => {
  const butttonRef = useRef(null);
  return (
    <DialogTrigger type="popup" {...args} portalSelector="#portal">
      <ActionButton ref={butttonRef}>Disk Status</ActionButton>
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
      portalSelector="#portal"
      // transitionProps={{
      //   onEntering: () => console.log("entering"),
      //   onExited: () => console.log("exited"),
      // }}
      // transition="zoom"
      // disableModalBackdropBlur
      // isKeyboardDismissDisabled
      // isDismissable
    >
      <ActionButton>Checkout</ActionButton>
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

export const DialogTriggerTargetRef = (args: ModalProps) => {
  const targetRef = useRef(null);
  return (
    <>
      <DialogTrigger
        type="popup"
        {...args}
        // portalSelector="#portal"
        portalSelector={false}
        // targetRef={targetRef}
        // targ
        // popupProps={{
        //   placement: "bottom start"
        // }}
        // placement: "bottom start"
        // placement={"bottom start"}
        // isDismissable
        // isKeyboardDismissDisabled={true}
        // focusOnProps={{ onEscapeKey: () => console.log("HELLO") }}
        // focusOnProps={{ autoFocus: false }}
      >
        <Button>Trigger</Button>
        <div className="content">
          <P>This is a popup anchored to the span.</P>
          {/* <Button data-autofocus>Hi1</Button>
          <Button>Hi</Button> */}
        </div>
      </DialogTrigger>

      <div style={{ marginTop: 80 }}>
        <P vol={1}>
          <span ref={targetRef}>popup appears over here</span>
        </P>
      </div>
    </>
  );
};

export const EventExample = (args: DialogTriggerProps) => {
  const targetRef = useRef(null);
  const [state, setState] = useState(false);
  return (
    <>
      <DialogTrigger
        type="popup"
        placement="top"
        onOpenChange={(isOpen) => setState(isOpen)}
        {...args}
      >
        <Button ref={targetRef}>Whispers</Button>
        <>
          <H2>Whispers and DMs</H2>
          <P>You have 0 new messages.</P>
        </>
      </DialogTrigger>

      <P vol={1}>Current open state: {state.toString()}</P>
    </>
  );
};
