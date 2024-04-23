import { P, CheckboxGroup, Checkbox } from "../../indexLib";
import { useState } from "react";

export const ValueExample = () => {
  const [selected, setSelected] = useState(["soccer", "baseball"]);

  return (
    <>
      <CheckboxGroup
        label="Favorite sports (uncontrolled)"
        defaultValue={["soccer", "baseball"]}
      >
        <Checkbox value="soccer" size={6}>
          Soccer
        </Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup
        label="Favorite sports (controlled)"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
    </>
  );
};

export const EventExample = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <CheckboxGroup
        label="Favorite sports"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
      <P vol={1}>You have selected: {selected.join(", ")}</P>
    </>
  );
};
