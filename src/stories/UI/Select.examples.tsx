import { SetStateAction, useState, useMemo } from "react";
import { Item } from "@react-stately/collections";
import { useAsyncList } from "react-stately";
import { InputSelect, InputSelectProps, InputText } from "../../indexLib";

type ItemsType = { [key: string]: string | number };

export interface SelectPropsDocs extends InputSelectProps<object> {}
export function SelectType(props: SelectPropsDocs) {
  <>{props}</>;
}

export const BasicSelect = (args: ItemsType) => {
  return (
    <InputSelect
      label="Choose frequency"
      onSelectionChange={(key) => console.log(key)}
      vol={1}
      portalSelector="#portal"
      {...args}
    >
      <Item key="rarely">Rarely</Item>
      <Item key="sometimes">Sometimes</Item>
      <Item key="always">Always</Item>
    </InputSelect>
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
      <InputText label="Name" vol={1} placeholder="Type name" />
      <InputSelect
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
        {...args}
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </InputSelect>
    </>
  );
};

export const DynamicCollection = (args: InputSelectProps<ItemsType>) => {
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
      <InputSelect
        label="Engineering major"
        items={options}
        portalSelector="#portal"
        {...args}
      >
        {(item) => <Item>{item.name}</Item>}
      </InputSelect>
    </>
  );
};

export const ControlledSelect = (args: InputSelectProps<ItemsType>) => {
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
    <InputSelect
      label="Pick an animal"
      items={options}
      selectedKey={animal}
      onSelectionChange={(selected) =>
        setAnimal(selected as SetStateAction<string>)
      }
      portalSelector="#portal"
      {...args}
    >
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </InputSelect>
  );
};

export const AsyncLoadingExample = (args: InputSelectProps<ItemsType>) => {
  const list: { items: ItemsType[] } = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon`, { signal });
      let json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <InputSelect
      label="Pick a Pokemon"
      items={list.items}
      portalSelector="#portal"
      shouldFocusOnHover={false}
      {...args}
    >
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </InputSelect>
  );
};

export const SelectSizes = (args: InputSelectProps<ItemsType>) => {
  return (
    <>
      <InputSelect
        {...{
          label: "Name",
          vol: 1,
          portalSelector: "#portal",
          placeholder: "volume 1",
        }}
        {...args}
      >
        <Item>One</Item>
      </InputSelect>
      <InputSelect
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
      </InputSelect>
      <InputSelect
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
      </InputSelect>
      <InputSelect
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
      </InputSelect>
      <InputSelect
        {...{
          label: "Fax",
          vol: 5,
          portalSelector: "#portal",
          placeholder: "volume 5",
        }}
        {...args}
      >
        <Item>One</Item>
      </InputSelect>
      <InputSelect
        {...{
          label: "What3words",
          vol: 6,
          portalSelector: "#portal",
          placeholder: "volume 6",
        }}
        {...args}
      >
        <Item>One</Item>
      </InputSelect>
    </>
  );
};

export const HelpTextExample = (args: InputSelectProps<ItemsType>) => {
  let [animalId, setAnimalId] = useState(0);
  let options = [
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
  let isValid = useMemo(() => animalId !== 2 && animalId !== 7, [animalId]);

  return (
    <InputSelect
      validationState={isValid ? "valid" : "invalid"}
      label="Favorite animal"
      description="Pick your favorite animal, you will be judged."
      errorMessage={
        animalId === 2
          ? "The author of this example is a dog person."
          : "Oh god it's a snake! Choose anything else."
      }
      vol={1}
      items={options}
      selectedKey={animalId}
      onSelectionChange={(selected) =>
        setAnimalId(selected as SetStateAction<number>)
      }
    >
      {(item) => <Item>{item.name}</Item>}
    </InputSelect>
  );
};
