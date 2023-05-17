import { ToastProvider } from "../../components/Toast/ToastProvider";
import Button from "../../components/Button/Button";

export const ToastProviderExample = () => {
  return (
    <ToastProvider>
      {(state) => (
        <Button
          onClick={() => state.add("Toast is done!")}
          style={{ margin: "16px" }}
        >
          Add toasts
        </Button>
      )}
    </ToastProvider>
  );
};
