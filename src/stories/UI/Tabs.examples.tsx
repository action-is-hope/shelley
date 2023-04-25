import * as React from "react";
import Item from "../../components/Item/Item";
import { Tabs } from "../../components/Tabs/Tabs";

const tabsData = [
  {
    id: 1,
    name: "Founding of Rome",
    children: "Arma virumque cano, Troiae qui primus ab oris.",
  },
  {
    id: 2,
    name: "Monarchy and Republic",
    children: "Senatus Populusque Romanus.",
  },
  { id: 3, name: "Empire", children: "Alea jacta est." },
];

export const Example1 = () => {
  return (
    <Tabs>
      <Item title="Tab title 1">Tab description 1</Item>
      <Item title="Tab title 2">Tab description 2</Item>
      <Item title="Tab title 3">Tab description 3</Item>
    </Tabs>
  );
};
