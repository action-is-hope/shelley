import { useState } from "react";
import { Item } from "@react-stately/collections";
import { Menu, MenuProps } from "../../indexLib";

function _BasicMenu<T extends object>(args: MenuProps<T>) {
  return (
    <Menu onAction={(key) => console.log(key)} aria-label="Menu" {...args}>
      <Item key="publish">Publish</Item>
      <Item key="archive">Archive</Item>
      <Item key="delete">Delete</Item>
    </Menu>
  );
}
export const BasicMenu = _BasicMenu;

export const Dynamic = () => {
  const [animals] = useState([
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Kangaroo" },
    { id: 3, name: "Snake" },
  ]);

  return (
    <Menu
      onAction={(key) => console.log(key)}
      items={animals}
      aria-label="Dynamic menu"
      disabledKeys={[1, 2]}
    >
      {(item) => <Item>{item.name}</Item>}
    </Menu>
  );
};

export const SingleUnControlled = () => {
  return (
    <Menu
      selectionMode="single"
      defaultSelectedKeys={new Set(["middle"])}
      onSelectionChange={(i) => console.log([...i][0])}
      aria-label="Single selection menu"
    >
      <Item key="left">Left</Item>
      <Item key="middle">Middle...</Item>
      <Item key="right">Right</Item>
    </Menu>
  );
};

export const MultipleControlled = () => {
  const [selected, setSelected] = useState(new Set(["sidebar", "console"]));
  return (
    <>
      <Menu
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={(selection) => {
          /**
           * - Selection type can be "all" | Set(Key)
           * - Key (string | number) is not compatible with our state Set<string>
           * Casting required (as Set<string>) we know what we get back.
           */
          selection !== "all" && setSelected(selection as Set<string>);
        }}
        aria-label="Multi selection menu"
      >
        <Item key="sidebar">Sidebar</Item>
        <Item key="searchbar">Searchbar</Item>
        <Item key="tools">Tools</Item>
        <Item key="console">Console</Item>
      </Menu>
      <p>Current selection (controlled): {[...selected].join(", ")}</p>
    </>
  );
};
