import { ToastProvider, useToast } from "../../components/Toast/ToastProvider";
import { ActionButton, Button, ButtonGroup } from "../../indexLib";

const ToastTriggersForDefaultExample = () => {
  const toastQueue = useToast();
  return (
    <ActionButton onPress={() => toastQueue.add({ title: "New toast" })}>
      Add toast
    </ActionButton>
  );
};

export const ToastProviderDefault = () => {
  return (
    <ToastProvider data-id="testing">
      <ToastTriggersForDefaultExample />
    </ToastProvider>
  );
};

const ToastTriggersForPriorityExample = () => {
  const toastQueue = useToast();

  return (
    <ButtonGroup variant="secondary">
      <Button
        onPress={() =>
          toastQueue.add({ title: "Bread can be toasted" }, { priority: 0 })
        }
      >
        Neutral
      </Button>
      <Button
        onPress={() =>
          toastQueue.add({ title: "Toasting... (1)" }, { priority: 1 })
        }
      >
        Low priority
      </Button>
      <Button
        onPress={() =>
          toastQueue.add({ title: "Toast is done (2)" }, { priority: 2 })
        }
      >
        Medium priority
      </Button>
      <Button
        onPress={() =>
          toastQueue.add({ title: "Toast is burnt (3)" }, { priority: 3 })
        }
      >
        High priority
      </Button>
    </ButtonGroup>
  );
};

export const ToastProviderPriority = () => {
  return (
    <ToastProvider>
      <ToastTriggersForPriorityExample />
    </ToastProvider>
  );
};

const ToastTriggersForActionLabelExample = () => {
  const toastQueue = useToast();

  return (
    <ActionButton
      onPress={() =>
        toastQueue.add(
          {
            title: "Item deleted",
            shouldCloseOnAction: true,
            action: {
              actionLabel: "Undo",
              onAction: () => console.log("Action was clicked!"),
            },
          },
          { priority: 1 }
        )
      }
    >
      Toast with action
    </ActionButton>
  );
};

export const ToastProviderActionLabel = () => {
  return (
    <ToastProvider>
      <ToastTriggersForActionLabelExample />
    </ToastProvider>
  );
};

const ToastTriggersForAutoDismissExample = () => {
  const toastQueue = useToast();

  return (
    <ActionButton
      onPress={() =>
        toastQueue.add({ title: "Disappears in 5 seconds" }, { timeout: 5000 })
      }
    >
      Timeout toast
    </ActionButton>
  );
};

export const ToastProviderAutoDismiss = () => {
  return (
    <ToastProvider>
      <ToastTriggersForAutoDismissExample />
    </ToastProvider>
  );
};

const ToastTriggersForWithoutIcon = () => {
  const toastQueue = useToast();

  return (
    <ActionButton
      onPress={() =>
        toastQueue.add({
          title: "No icon",
          shouldShowIcon: false,
        })
      }
    >
      Toast without icon
    </ActionButton>
  );
};

export const ToastProviderWithoutIcon = () => {
  return (
    <ToastProvider>
      <ToastTriggersForWithoutIcon />
    </ToastProvider>
  );
};

const ToastTriggersForCustomIcon = () => {
  const toastQueue = useToast();

  return (
    <ActionButton
      onPress={() =>
        toastQueue.add({
          title: "No icon",
          shouldShowIcon: false,
        })
      }
    >
      Toast without icon
    </ActionButton>
  );
};

export const ToastProviderCustomIcon = () => {
  return (
    <ToastProvider>
      <ToastTriggersForCustomIcon />
    </ToastProvider>
  );
};
