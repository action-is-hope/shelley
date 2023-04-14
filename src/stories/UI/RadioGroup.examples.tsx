import { P, Radio, RadioGroup, RadioGroupProps } from "../../indexLib";
import { useState } from "react";

export const ValueExample = (args: RadioGroupProps) => {
  const [selected, setSelected] = useState("wizard");

  return (
    <>
      <RadioGroup label="Are you a wizard?" defaultValue="yes">
        <Radio value="yes">Yes</Radio>
        <Radio value="no">No</Radio>
      </RadioGroup>

      <RadioGroup
        label="Favorite avatar (controlled)"
        value={selected}
        onChange={setSelected}
        {...args}
      >
        <Radio value="wizard">Wizard</Radio>
        <Radio value="dragon">Dragon</Radio>
      </RadioGroup>
    </>
  );
};

export const EventExample = () => {
  const [selected, setSelected] = useState("");

  return (
    <>
      <RadioGroup
        label="Favorite sport"
        value={selected}
        onChange={setSelected}
      >
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
      <P vol={1}>You have selected: {selected}</P>
    </>
  );
};

export const CustomLabel = (args: RadioGroupProps) => {
  return (
    <RadioGroup>
      <Radio {...args} id="123" value="123" />
      <label htmlFor="123">Custom label</label>
      <Radio {...args} id="456" value="456" />
      <label htmlFor="456">Custom label2</label>
    </RadioGroup>
  );
};
