import {
  InputText,
  InputTextProps,
  InputBaseProps,
  Button,
  TextInputProps,
  Checkbox,
  CheckboxProps,
} from "../../indexLib";
import Eye from "../../components/icons/Eye";
import { useState, useMemo, useRef } from "react";

export interface InputTextPropsDocs extends InputBaseProps {
  /** The type of input field. */
  type?: string;
}
export function TextFieldType(props: InputTextPropsDocs) {
  <>{props.type}</>;
}

export const ValueExample = (args: CheckboxProps) => {
  let [selected, setSelected] = useState(true);

  return (
    <>
      <Checkbox {...args} defaultSelected>
        Subscribe (uncontrolled)
      </Checkbox>
      <Checkbox {...args} isSelected={selected} onChange={setSelected}>
        Subscribe (controlled)
      </Checkbox>
    </>
  );
};
