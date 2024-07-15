import { P, Checkbox, CheckboxProps } from "../../indexLib";
import { useState } from "react";

export const ValueExample = (args: CheckboxProps) => {
  const [selected, setSelected] = useState(true);

  return (
    <>
      <Checkbox {...args} defaultSelected isDisabled>
        Subscribe (uncontrolled)
      </Checkbox>
      <Checkbox {...args} isSelected={selected} onChange={setSelected}>
        Subscribe (controlled)
      </Checkbox>
    </>
  );
};

export const EventExample = (args: CheckboxProps) => {
  const [selected, setSelection] = useState(false);

  return (
    <>
      <Checkbox {...args} isSelected={selected} onChange={setSelection}>
        I accept the terms and conditions
      </Checkbox>
      <P vol={1}>{`You ${selected ? "have accepted" : "have not accepted"}`}</P>
    </>
  );
};

export const CustomLabel = (args: CheckboxProps) => {
  return (
    <>
      <Checkbox {...args} id="123" className="custom">
        Custom label
      </Checkbox>
    </>
  );
};
