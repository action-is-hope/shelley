import Item from "../../components/Item/Item";
import Tabs from "../../components/Tabs/Tabs";

export const Example1 = () => {
  return (
    <Tabs data-id="tabs">
      <Item title="Tab title 1">Tab description 1</Item>
      <Item title="Tab title 2">Tab description 2</Item>
      <Item title="Tab title 3">Tab description 3</Item>
    </Tabs>
  );
};

const tabs = [
  { id: 1, title: "Tab 1", content: "Tab body 1" },
  { id: 2, title: "Tab 2", content: "Tab body 2" },
  { id: 3, title: "Tab 3", content: "Tab body 3" },
];

export const Example2 = () => {
  return (
    <Tabs aria-label="Dynamic tabs" items={tabs} data-id="tabs">
      {(item) => <Item title={item.title}>{item.content}</Item>}
    </Tabs>
  );
};

export const Example3 = () => {
  return (
    <Tabs aria-label="Dynamic tabs" items={tabs} isDisabled data-id="tabs">
      {(item) => <Item title={item.title}>{item.content}</Item>}
    </Tabs>
  );
};
