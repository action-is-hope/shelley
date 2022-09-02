/* Table.examples.tsx */
// https://www.worldwildlife.org/species/directory?direction=desc&sort=extinction_status
import { useState, Key } from "react";
import { Item } from "@react-stately/collections";
import { Menu } from "../../indexLib";

export const Dynamic = () => {
  const [animals, setAnimals] = useState([
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Kangaroo" },
    { id: 3, name: "Snake" },
  ]);

  return (
    <Menu
      onAction={(key) => console.log(key)}
      items={animals}
      aria-label="Dynamic menu"
    >
      {(item) => (
        <Item>
          {item.name}
          {item.id}
        </Item>
      )}
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
        // @todo figure out the error without the as...
        onSelectionChange={(i) => setSelected(i as Set<string>)}
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
