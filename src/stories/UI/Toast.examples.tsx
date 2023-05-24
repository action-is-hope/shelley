import { ToastProvider } from "../../components/Toast/ToastProvider";
import Button from "../../components/Button/Button";

const wordList = {
  info: [
    "added",
    "changed",
    "continued",
    "proceeded",
    "started",
    "restarted",
  ] as const,
  success: [
    "succeeded",
    "completed",
    "installed",
    "downloaded",
    "uploaded",
    "finished",
  ] as const,
  warning: ["warned", "paused", "retried"] as const,
  error: ["errored", "failed", "cancelled", "removed"] as const,
} as const;

type WordListKeys = keyof typeof wordList;

const getRandomWordFromCategory = (category: WordListKeys): string =>
  wordList[category][Math.floor(Math.random() * wordList[category].length)]!;

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
              onClick={() => state.add(getRandomWordFromCategory("info"))}
              style={{ margin: "16px" }}
            >
              No priority - info
            </Button>
            <Button
              onClick={() =>
                state.add(getRandomWordFromCategory("success"), {
                  priority: 1,
                })
              }
              style={{ margin: "16px" }}
            >
              Low priority(1) - success
            </Button>
            <Button
              onClick={() =>
                state.add(getRandomWordFromCategory("warning"), {
                  priority: 2,
                })
              }
              style={{ margin: "16px" }}
            >
              Medium priority(2) - warning
            </Button>
            <Button
              onClick={() =>
                state.add(getRandomWordFromCategory("error"), {
                  priority: 3,
                })
              }
              style={{ margin: "16px" }}
            >
              High priority(3) - error
            </Button>
            {/* <Button
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
            </Button> */}
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
