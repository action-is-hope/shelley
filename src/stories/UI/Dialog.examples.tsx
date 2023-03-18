import { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  ModalProps,
  DialogTrigger,
  Dialog,
  ShelleyDialogProps,
  P,
  H2,
  Text,
} from "../../indexLib";

import { classes as dialog } from "../../components/Dialog/dialog.st.css";

export const BasicDialog = (args: ShelleyDialogProps) => {
  return (
    <Dialog {...args}>
      <H2 className={dialog.title}>Internet Speed Test</H2>
      <Text className={dialog.header} as="header" vol={2}>
        Connection status: Connected
      </Text>
      <P className={dialog.content}>Content area.</P>
      <ButtonGroup className={dialog.buttonGroup}>
        <Button variant="secondary" onPress={close}>
          Cancel
        </Button>
        <Button variant="primary" onPress={close} data-autofocus>
          Confirm
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export const GridAreas = (args: ShelleyDialogProps) => {
  return (
    <Dialog {...args}>
      <span className={dialog.title}>title</span>
      <span className={dialog.header}>header</span>
      <span className={dialog.divider}>divider</span>
      {/* <span className={dialog.typeIcon}>typeIcon</span> */}
      <span className={dialog.content}>content</span>
      <span className={dialog.footer}>footer</span>
      <span className={dialog.buttonGroup}>buttonGroup</span>
    </Dialog>
  );
};

export const BasicDialogTrigger = (args: ModalProps) => {
  const butttonRef = useRef(null);
  return (
    <DialogTrigger
      type="popover"
      placement="right"
      {...args}
      portalSelector="#portal"
    >
      <Button ref={butttonRef}>Disk Status</Button>
      <Dialog>
        <H2 vol={4} style={{ gridArea: "header" }}>
          C://
        </H2>
        <hr
          style={{
            gridArea: "divider",
            width: "100%",
            borderColor: "darkgrey",
          }}
        />
        <div style={{ gridArea: "content" }}>
          <P vol={2}>50% disk space remaining.</P>
        </div>
      </Dialog>
    </DialogTrigger>
  );
};

export const TypicalDialog = (args: ModalProps) => {
  return (
    <DialogTrigger
      {...args}
      portalSelector="#portal"
      modalProps={{ transition: "zoom" }}
      // isDismissable={true}
    >
      <Button>Publish</Button>
      {(close) => (
        <Dialog>
          <H2 className={dialog.title}>Publish 3 pages</H2>
          <hr className={dialog.divider} />
          <P className={dialog.content}>Confirm publish?</P>
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
