import type { RadioGroupState } from "react-stately";
import { useContext, createContext } from "react";
import type { Validation } from "../typings/shared-types";
interface RadioGroupContextValue {
  name?: string;
  isInvalid?: Validation["isInvalid"];
  state: RadioGroupState;
}

export const RadioGroupContext =
  createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupProvider() {
  const context = useContext(RadioGroupContext);
  // If context is null, Radio used outside of our provider so throw an error.
  if (context === null) {
    throw Error(
      `Radio must be used inside a RadioGroup, else it will not function correctly.`
    );
  }
  return context;
}
