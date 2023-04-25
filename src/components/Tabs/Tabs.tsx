import React from "react";
import { st, classes } from "./tabs.st.css";

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

const Tabs = () => {
  return (
    <div aria-label="History of Ancient Rome">
      {(item: Tab) => <Item>{item.name}</Item>}
      <TabPanels>{(item: Tab) => <Item>{item.children}</Item>}</TabPanels>
    </div>
  );
};

export default Tabs;
