import { ToastProvider } from "../../components/Toast/ToastProvider";
import Button from "../../components/Button/Button";

export const ToastProviderBasic = () => {
  return (
    <ToastProvider>
      {(state) => (
        <>
          <Button
            onClick={() => state.add("New toast")}
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
        console.log({ state });
        return (
          <>
            <Button
              onClick={() => state.add("Bread can be toasted.")}
              style={{ margin: "16px" }}
            >
              No priority - info
            </Button>
            <Button
              onClick={() => state.add("Toasting...! (1)", { priority: 1 })}
              style={{ margin: "16px" }}
            >
              Low priority(1) - success
            </Button>
            <Button
              onClick={() => state.add("Toast is done! (2)", { priority: 2 })}
              style={{ margin: "16px" }}
            >
              Medium priority(2) - warning
            </Button>
            <Button
              onClick={() => state.add("Toast is burnt! (3)", { priority: 3 })}
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
            onClick={() => state.add("New toast", { timeout: 5000 })}
            style={{ margin: "16px" }}
          >
            Add toast!
          </Button>
        </>
      )}
    </ToastProvider>
  );
};
