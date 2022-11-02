import { useState } from "react";
import { Item } from "@react-stately/collections";
import { ListBox, ListBoxProps } from "../../indexLib";

function _BasicListBox<T extends object>(args: ListBoxProps<T>) {
  return (
    <ListBox
      onSelectionChange={(key) => console.log(key)}
      label="Label"
      // shouldFocusWrap={true}
      // shouldFocusOnHover={false}
      {...args}
    >
      <Item key="publish">Publish</Item>
      <Item key="archive">Archive</Item>
      <Item key="delete">Delete</Item>
    </ListBox>
  );
}
export const BasicListBox = _BasicListBox;

export const Dynamic = () => {
  const [animals] = useState([
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Kangaroo" },
    { id: 3, name: "Snake" },
  ]);

  return (
    <ListBox
      onSelectionChange={(key) => console.log(key)}
      items={animals}
      selectionMode="single"
      aria-label="Dynamic collection"
      disabledKeys={[1, 2]}
    >
      {(item) => <Item>{item.name}</Item>}
    </ListBox>
  );
};

export const SingleUnControlled = () => {
  return (
    <ListBox
      selectionMode="single"
      defaultSelectedKeys={new Set(["middle"])}
      onSelectionChange={(i) => console.log([...i][0])}
      aria-label="Single selection"
    >
      <Item key="left">Left</Item>
      <Item key="middle">Middle...</Item>
      <Item key="right">Right</Item>
    </ListBox>
  );
};

export const MultipleControlled = () => {
  const options = [
    { name: "Koala" },
    { name: "Kangaroo" },
    { name: "Platypus" },
    { name: "Bald Eagle" },
    { name: "Bison" },
    { name: "Skunk" },
  ];
  const [animal, setAnimal] = useState(["Bison"]);

  return (
    <>
      <ListBox
        selectionMode="multiple"
        aria-label="Pick an animal"
        items={options}
        defaultSelectedKeys={["Bison", "Koala"]}
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </ListBox>

      <ListBox
        selectionMode="multiple"
        aria-label="Pick an animal"
        items={options}
        selectedKeys={animal}
        onSelectionChange={(selected) =>
          setAnimal(Array.from(selected as Set<string>))
        }
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </ListBox>
    </>
  );
};
