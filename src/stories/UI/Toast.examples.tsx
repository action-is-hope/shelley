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
                state.add({ title: "Bread can be toasted." }, { priority: 0 })
              }
              style={{ margin: "16px" }}
            >
              No priority - info
            </Button>
            <Button
              onClick={() =>
                state.add({ title: "Toasting...! (1)" }, { priority: 1 })
              }
              style={{ margin: "16px" }}
            >
              Low priority(1) - success
            </Button>
            <Button
              onClick={() =>
                state.add({ title: "Toast is done! (2)" }, { priority: 2 })
              }
              style={{ margin: "16px" }}
            >
              Medium priority(2) - warning
            </Button>
            <Button
              onClick={() =>
                state.add({ title: "Toast is burnt! (3)" }, { priority: 3 })
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
                    title: "Bread can be toasted.",
                    actionLabel: "Got it",
                    shouldCloseOnAction: true,
                    onAction: () => console.log("Action was clicked!"),
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
                    title: "Toasting...! (1)",
                    actionLabel: "Thanks",
                    shouldCloseOnAction: true,
                    onAction: () => console.log("Action was clicked!"),
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
                    title: "Toast is done! (2)",
                    actionLabel: "Check",
                    shouldCloseOnAction: true,
                    onAction: () => console.log("Action was clicked!"),
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
                    title: "Toast is burnt! (3)",
                    actionLabel: "Fix",
                    shouldCloseOnAction: true,
                    onAction: () => console.log("Action was clicked!"),
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
                actionLabel: "Action",
                shouldCloseOnAction: true,
                onAction: () => console.log("Action was clicked!"),
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
