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

export const BasicDialogTrigger = (args: ModalProps) => {
  const butttonRef = useRef(null);
  return (
    <DialogTrigger type="popover" {...args} portalSelector="#portal">
      <Button ref={butttonRef}>Disk Status</Button>
      <div className="content">
        <H2>50% disk space remaining.</H2>
        <P>50% disk space remaining.</P>
      </div>
    </DialogTrigger>
  );
};

export const ContentExample = (args: ModalProps) => {
  return (
    <DialogTrigger {...args} portalSelector="#portal">
      <Button>Checkout</Button>
      {(close) => (
        <Dialog>
          <P>You have 5 items in your cart. Proceed to checkout?</P>
          <ButtonGroup>
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
        type="popover"
        {...args}
        portalSelector="#portal"
        targetRef={targetRef}
        placement={"bottom start"}
      >
        <Button>Trigger</Button>
        <div className="content">
          <P>This is a popover anchored to the span.</P>
        </div>
      </DialogTrigger>

      <div style={{ marginTop: 80 }}>
        <P vol={1}>
          <span ref={targetRef}>Popover appears over here</span>
        </P>
      </div>
    </>
  );
};

export const EventExample = (args: ModalProps) => {
  const targetRef = useRef(null);
  const [state, setState] = useState(false);
  return (
    <>
      <DialogTrigger
        type="popover"
        placement="top"
        onOpenChange={(isOpen) => setState(isOpen)}
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
