import { ToastProvider } from "../../components/Toast/ToastProvider";
import Button from "../../components/Button/Button";

export const ToastProviderDefault = () => {
  return (
    <ToastProvider>
      {(state) => (
        <>
          <Button
            onClick={() => state.add({ title: "New toast" })}
            style={{ margin: "16px" }}
          >
            Add toast!
          </Button>
        </>
      )}
    </ToastProvider>
  );
};

export const ToastProviderPriority = () => {
  return (
    <ToastProvider>
      {(state) => {
        return (
          <>
            <Button
              onClick={() =>
                state.add({ title: "Bread can be toasted" }, { priority: 0 })
              }
              style={{ margin: "16px" }}
            >
              No priority - info
            </Button>
            <Button
              onClick={() =>
                state.add({ title: "Toasting... (1)" }, { priority: 1 })
              }
              style={{ margin: "16px" }}
            >
              Low priority(1) - success
            </Button>
            <Button
              onClick={() =>
                state.add({ title: "Toast is done (2)" }, { priority: 2 })
              }
              style={{ margin: "16px" }}
            >
              Medium priority(2) - warning
            </Button>
            <Button
              onClick={() =>
                state.add({ title: "Toast is burnt (3)" }, { priority: 3 })
              }
              style={{ margin: "16px" }}
            >
              High priority(3) - error
            </Button>
          </>
        );
      }}
    </ToastProvider>
  );
};

export const ToastProviderActionLabel = () => {
  return (
    <ToastProvider>
      {(state) => {
        return (
          <>
            <Button
              onClick={() =>
                state.add(
                  {
                    title: "Bread can be toasted",
                    shouldCloseOnAction: true,
                    action: {
                      actionLabel: "Got it",
                      onAction: () => console.log("Action was clicked!"),
                    },
                  },
                  { priority: 0 }
                )
              }
              style={{ margin: "16px" }}
            >
              No priority - info
            </Button>
            <Button
              onClick={() =>
                state.add(
                  {
                    title: "Toasting... (1)",
                    shouldCloseOnAction: true,
                    action: {
                      actionLabel: "Thanks",
                      onAction: () => console.log("Action was clicked!"),
                    },
                  },
                  { priority: 1 }
                )
              }
              style={{ margin: "16px" }}
            >
              Low priority(1) - success
            </Button>
            <Button
              onClick={() =>
                state.add(
                  {
                    title: "Toast is done (2)",
                    shouldCloseOnAction: true,
                    action: {
                      actionLabel: "Check",
                      onAction: () => console.log("Action was clicked!"),
                    },
                  },
                  { priority: 2 }
                )
              }
              style={{ margin: "16px" }}
            >
              Medium priority(2) - warning
            </Button>
            <Button
              onClick={() =>
                state.add(
                  {
                    title: "Toast is burnt (3)",
                    shouldCloseOnAction: true,
                    action: {
                      actionLabel: "Fix",
                      onAction: () => console.log("Action was clicked!"),
                    },
                  },
                  { priority: 3 }
                )
              }
              style={{ margin: "16px" }}
            >
              High priority(3) - error
            </Button>
          </>
        );
      }}
    </ToastProvider>
  );
};

export const ToastProviderAutoDismiss = () => {
  return (
    <ToastProvider>
      {(state) => (
        <>
          <Button
            onClick={() =>
              state.add(
                { title: "Disappears in 3.5 seconds" },
                { timeout: 3500 }
              )
            }
            style={{ margin: "16px" }}
          >
            Add toast!
          </Button>
        </>
      )}
    </ToastProvider>
  );
};

export const ToastProviderCloseOnAction = () => {
  return (
    <ToastProvider>
      {(state) => (
        <>
          <Button
            onClick={() =>
              state.add({
                title: "Should close on action",
                shouldCloseOnAction: true,
                action: {
                  actionLabel: "Action",
                  onAction: () => console.log("Action was clicked!"),
                },
              })
            }
            style={{ margin: "16px" }}
          >
            Add toast!
          </Button>
        </>
      )}
    </ToastProvider>
  );
};

export const ToastProviderWithoutIcon = () => {
  return (
    <ToastProvider>
      {(state) => (
        <>
          <Button
            onClick={() =>
              state.add({
                title: "No icon",
                shouldShowIcon: false,
              })
            }
            style={{ margin: "16px" }}
          >
            Add toast!
          </Button>
        </>
      )}
    </ToastProvider>
  );
};
