import { Button, ButtonGroup, ToastProvider, useToast } from "../../indexLib";

const ToastTriggersForDefaultExample = () => {
  const toastQueue = useToast();
  return (
    <Button onPress={() => toastQueue.add({ title: "New toast" })}>
      Add toast
    </Button>
  );
};

export const ToastProviderDefault = () => {
  return (
    <ToastProvider>
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
          toastQueue.add(
            { title: "Bread can be toasted (P0)" },
            { priority: 0 }
          )
        }
      >
        Neutral (P0)
      </Button>
      <Button
        tone="info"
        onPress={() =>
          toastQueue.add({ title: "Toasting... (P1)" }, { priority: 1 })
        }
      >
        Info (P1)
      </Button>
      <Button
        tone="success"
        onPress={() =>
          toastQueue.add({ title: "Toast is done (P2)" }, { priority: 2 })
        }
      >
        Success (P2)
      </Button>
      <Button
        tone="warning"
        onPress={() =>
          toastQueue.add({ title: "Toast is burning (P3)" }, { priority: 3 })
        }
      >
        Warning (P3)
      </Button>
      <Button
        tone="alert"
        onPress={() =>
          toastQueue.add({ title: "Toast is on fire (P4)" }, { priority: 4 })
        }
      >
        Error (P4)
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
    <Button
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
    </Button>
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
    <Button
      onPress={() =>
        toastQueue.add({ title: "Disappears in 5 seconds" }, { timeout: 5000 })
      }
    >
      Timeout toast
    </Button>
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
    <Button
      onPress={() =>
        toastQueue.add(
          {
            title: "No icon",
            shouldShowIcon: false,
          },
          {
            priority: 1,
          }
        )
      }
    >
      Toast without icon
    </Button>
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
    <Button
      onPress={() =>
        toastQueue.add({
          title: "No icon",
          shouldShowIcon: false,
        })
      }
    >
      Toast without icon
    </Button>
  );
};

export const ToastProviderCustomIcon = () => {
  return (
    <ToastProvider>
      <ToastTriggersForCustomIcon />
    </ToastProvider>
  );
};
