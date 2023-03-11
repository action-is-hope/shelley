import { P, Switch, SwitchProps } from "../../indexLib";
import { useState } from "react";

export const ValueExample = (args: SwitchProps) => {
  const [selected, setSelected] = useState(true);

  return (
    <>
      <Switch {...args} defaultSelected>
        Dark mode (uncontrolled)
      </Switch>
      <Switch {...args} isSelected={selected} onChange={setSelected}>
        Dark mode (controlled)
      </Switch>
    </>
  );
};

export const EventExample = (args: SwitchProps) => {
  const [selected, setSelection] = useState(false);

  return (
    <>
      <Switch {...args} isSelected={selected} onChange={setSelection}>
        Switch label
      </Switch>
      <P vol={1}>{`The Switch is on: ${selected}`}</P>
    </>
  );
};

export const CustomLabel = (args: SwitchProps) => {
  return (
    <>
      <Switch {...args} id="123" />
      <label htmlFor="123">Custom label</label>
    </>
  );
};
