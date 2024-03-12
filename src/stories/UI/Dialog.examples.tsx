import {
  Button,
  ButtonGroup,
  DialogTriggerProps,
  DialogTrigger,
  Dialog,
  DialogProps,
  P,
  H2,
  Text,
} from "../../indexLib";

import { classes as dialog } from "../../Dialog/dialog.st.css";
import { classes as dialogExample } from "./dialogExample.st.css";

export const BasicDialog = (args: DialogProps) => {
  return (
    <div style={{ backgroundColor: "#000", width: "fit-content" }}>
      <Dialog {...args}>
        <H2 className={dialog.title} vol={4} data-title>
          Internet Speed Test
        </H2>
        <hr className={dialog.divider} />
        <Text className={dialog.header} elementType="header" vol={2}>
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
    </div>
  );
};

export const GridAreas = (args: DialogProps) => {
  return (
    <div style={{ backgroundColor: "#000", width: "fit-content" }}>
      <Dialog {...args} className={dialogExample.gridAreaExample}>
        <span className={dialog.hero}>hero</span>
        <span className={dialog.title} data-title>
          title
        </span>
        <span className={dialog.header}>header</span>
        <span className={dialog.divider}>divider</span>
        {/* <span className={dialog.typeIcon}>typeIcon</span> */}
        <span className={dialog.content}>content</span>
        <span className={dialog.footer}>footer</span>
        <span className={dialog.buttonGroup}>buttonGroup</span>
      </Dialog>
    </div>
  );
};

export const ModalAndPopup = (args: DialogTriggerProps) => {
  return (
    <>
      {/* Popup Example */}
      <DialogTrigger type="popup" placement="bottom" {...args}>
        <Button>Disk Status</Button>
        <Dialog>
          <H2 vol={4} className={dialog.title} data-title>
            C://
          </H2>
          <hr className={dialog.divider} />
          <P className={dialog.content}>50% disk space remaining</P>
        </Dialog>
      </DialogTrigger>

      {/* Modal Example */}
      <DialogTrigger
        {...args}
        transition="slideUp"
        // isDismissable={true}
      >
        <Button>Publish</Button>
        {(close) => (
          <Dialog className={"custom-class"}>
            <H2 vol={4} className={dialog.title} data-title>
              Publish 3 pages
            </H2>
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
    </>
  );
};

export const DismissableDialog = (args: DialogTriggerProps) => {
  return (
    <DialogTrigger {...args} isDismissable>
      <Button>Status</Button>
      <Dialog dismissLabel="Close status dialog">
        <H2 vol={4} className={dialog.title} data-title>
          Status
        </H2>
        <hr className={dialog.divider} />
        <P className={dialog.content}>Printer Status: Connected</P>
      </Dialog>
    </DialogTrigger>
  );
};

export const HeroDialog = (args: DialogTriggerProps) => {
  return (
    <DialogTrigger {...args}>
      <Button>Upload</Button>
      {(close) => (
        <Dialog>
          <div className={dialog.hero}>
            <img
              src="https://climatevisuals.org/wp-content/uploads/2022/10/4478-2048x1365.jpg"
              alt=""
            />
          </div>

          <H2 vol={4} className={dialog.title} data-title>
            Upload file
          </H2>
          <hr className={dialog.divider} />
          <P className={dialog.content}>
            Are you sure you want to upload this file?
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
