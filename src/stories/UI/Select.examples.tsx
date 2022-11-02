import { SetStateAction, useState } from "react";
import { Item } from "@react-stately/collections";
import { InputSelect, InputSelectProps, InputText } from "../../indexLib";

function _BasicSelect<T>(args: InputSelectProps<T>) {
  return (
    <InputSelect
      label="Choose frequency"
      onSelectionChange={(key) => console.log(key)}
      vol={1}
      validationState="invalid"
      errorMessage="HELP"
      {...args}
    >
      <Item key="rarely">Rarely</Item>
      <Item key="sometimes">Sometimes</Item>
      <Item key="always">Always</Item>
    </InputSelect>
  );
}
export const BasicSelect = _BasicSelect;

export const SelectEvents = () => {
  const [animals] = useState([
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Kangaroo" },
    { id: 3, name: "Snake" },
  ]);

  const options = [
    { name: "Koala" },
    { name: "Kangaroo" },
    { name: "Platypus" },
    { name: "Bald Eagle" },
    { name: "Bison" },
    { name: "Skunk" },
  ];
  const [animal, setAnimal] = useState("Bison");
  // const [selected, setSelected] = useState(new Set(["sidebar", "console"]));

  return (
    <>
      <InputText label="Name" vol={1} placeholder="Type name" />
      <InputSelect
        onSelectionChange={(key) => console.log(key)}
        items={animals}
        label="Select"
        portalSelector="#portal"
        placeholder="Hi"
        // variant="filled"
        vol={1}
      >
        {(item) => <Item>{item.name}</Item>}
      </InputSelect>

      <InputText label="Name" />

      <InputSelect
        label="Choose frequency"
        portalSelector="#portal"
        selectedKey={animal}
        onSelectionChange={(selected) =>
          setAnimal(selected as SetStateAction<string>)
        }
        items={options}
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </InputSelect>
    </>
  );
};
