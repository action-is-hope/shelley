import { SetStateAction, useState, useMemo } from "react";
import { Item } from "@react-stately/collections";
import { useAsyncList } from "react-stately";
import { Select, SelectProps, TextField } from "../../indexLib";

type ItemsType = { [key: string]: string | number };

export type SelectPropsDocs = SelectProps<object>;
export function SelectType(props: SelectPropsDocs) {
  <>{props}</>;
}

export const BasicSelect = (args: ItemsType) => {
  return (
    <Select
      label="Choose frequency"
      onSelectionChange={(key) => console.log(key)}
      vol={1}
      portalSelector="#portal"
      {...args}
    >
      <Item key="rarely">Rarely</Item>
      <Item key="sometimes">Sometimes</Item>
      <Item key="always">Always</Item>
    </Select>
  );
};

export const SelectEvents = (args: ItemsType) => {
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
  return (
    <>
      <TextField label="Name" vol={1} placeholder="Type name" />
      <Select
        onSelectionChange={(key) => console.log(key)}
        items={animals}
        label="Select"
        portalSelector="#portal"
        placeholder="Hi"
        vol={1}
        // excludeFromTabOrder
        {...args}
      >
        {(item) => <Item>{item.name}</Item>}
      </Select>

      <TextField label="Name" />

      <Select
        label="Choose frequency"
        portalSelector="#portal"
        selectedKey={animal}
        onSelectionChange={(selected) =>
          setAnimal(selected as SetStateAction<string>)
        }
        items={options}
        {...args}
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </Select>
    </>
  );
};

export const DynamicCollection = (args: SelectProps<ItemsType>) => {
  const options = [
    { id: 1, name: "Aerospace" },
    { id: 2, name: "Mechanical" },
    { id: 3, name: "Civil" },
    { id: 4, name: "Biomedical" },
    { id: 5, name: "Nuclear" },
    { id: 6, name: "Industrial" },
    { id: 7, name: "Chemical" },
    { id: 8, name: "Agricultural" },
    { id: 9, name: "Electrical" },
  ];

  return (
    <>
      <Select
        label="Engineering major"
        items={options}
        portalSelector="#portal"
        {...args}
      >
        {(item) => <Item>{item.name}</Item>}
      </Select>
    </>
  );
};

export const ControlledSelect = (args: SelectProps<ItemsType>) => {
  const options = [
    { name: "Koala" },
    { name: "Kangaroo" },
    { name: "Platypus" },
    { name: "Bald Eagle" },
    { name: "Bison" },
    { name: "Skunk" },
  ];
  const [animal, setAnimal] = useState("Bison");

  return (
    <Select
      label="Pick an animal"
      items={options}
      selectedKey={animal}
      {...args}
      onSelectionChange={(selected) =>
        setAnimal(selected as SetStateAction<string>)
      }
      portalSelector="#portal"
    >
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </Select>
  );
};

export const AsyncLoadingExample = (args: SelectProps<ItemsType>) => {
  const list: { items: ItemsType[] } = useAsyncList({
    async load({ signal, filterText }) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon`, { signal });
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Select
      label="Pick a Pokemon"
      items={list.items}
      portalSelector="#portal"
      shouldFocusOnHover={false}
      {...args}
    >
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </Select>
  );
};

export const SelectSizes = (args: SelectProps<ItemsType>) => {
  return (
    <>
      <Select
        {...{
          label: "Name",
          vol: 1,
          portalSelector: "#portal",
          placeholder: "volume 1",
        }}
        {...args}
      >
        <Item>One</Item>
      </Select>
      <Select
        {...{
          label: "Email",
          type: "email",
          vol: 2,
          portalSelector: "#portal",
          placeholder: "volume 2",
        }}
        {...args}
      >
        <Item>One</Item>
      </Select>
      <Select
        {...{
          label: "Address",
          type: "textarea",
          vol: 3,
          portalSelector: "#portal",
          placeholder: "volume 3",
        }}
        {...args}
      >
        <Item>One</Item>
      </Select>
      <Select
        {...{
          label: "Telephone",
          type: "tel",
          vol: 4,
          portalSelector: "#portal",
          placeholder: "volume 4",
        }}
        {...args}
      >
        <Item>One</Item>
      </Select>
      <Select
        {...{
          label: "Fax",
          vol: 5,
          portalSelector: "#portal",
          placeholder: "volume 5",
        }}
        {...args}
      >
        <Item>One</Item>
      </Select>
      <Select
        {...{
          label: "What3words",
          vol: 6,
          portalSelector: "#portal",
          placeholder: "volume 6",
        }}
        {...args}
      >
        <Item>One</Item>
      </Select>
    </>
  );
};

export const HelpTextExample = (args: SelectProps<ItemsType>) => {
  const [animalId, setAnimalId] = useState(0);
  const options = [
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Dog" },
    { id: 4, name: "Kangaroo" },
    { id: 5, name: "Koala" },
    { id: 6, name: "Penguin" },
    { id: 7, name: "Snake" },
    { id: 8, name: "Turtle" },
    { id: 9, name: "Wombat" },
  ];
  const isValid = useMemo(() => animalId !== 2 && animalId !== 7, [animalId]);

  return (
    <Select
      validationState={isValid ? "valid" : "invalid"}
      label="Favorite animal"
      description="Pick your favorite animal, you will be judged."
      errorMessage={
        animalId === 2
          ? "The author of this example is a dog person."
          : "Oh god it's a snake! Choose anything else."
      }
      items={options}
      selectedKey={animalId}
      onSelectionChange={(selected) =>
        setAnimalId(selected as SetStateAction<number>)
      }
      portalSelector="#portal"
    >
      {(item) => <Item>{item.name}</Item>}
    </Select>
  );
};
