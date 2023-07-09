import { useState } from "react";
import { Item } from "../../Item";
import { Tabs } from "../../Tabs/Tabs";
import { Button, P } from "../../indexLib";

export const BasicTabs = () => {
  return (
    <Tabs data-id="Tabs" vol={1} aria-label="History of Ancient Rome">
      <Item key="FoR" title="Founding of Rome">
        <>
          <P vol={2}>Arma virumque cano, Troiae qui primus ab oris.</P>
        </>
      </Item>
      <Item key="MaR" title="Monarchy and Republic">
        <>
          <P vol={2}>Senatus Populusque Romanus.</P>
        </>
      </Item>
      <Item key="Emp" title="Empire">
        <>
          <P vol={2}>Alea jacta est.</P>
        </>
      </Item>
    </Tabs>
  );
};

export const DefaultSelectedExample = () => {
  return (
    <Tabs aria-label="Input settings" defaultSelectedKey="keyboard">
      <Item key="mouse">Mouse Settings</Item>
      <Item key="keyboard">Keyboard Settings</Item>
      <Item key="gamepad">Gamepad Settings</Item>
    </Tabs>
  );
};
export const ControlledSelectionExample = () => {
  const [timePeriod, setTimePeriod] = useState("triassic");
  return (
    <>
      <Tabs
        aria-label="Mesozoic time periods"
        selectedKey={timePeriod}
        onSelectionChange={(i) => setTimePeriod(i as string)}
      >
        <Item key="triassic" title="Triassic">
          The Triassic ranges roughly from 252 million to 201 million years ago,
          preceding the Jurassic Period.
        </Item>
        <Item key="jurassic" title="Jurassic">
          The Jurassic ranges from 200 million years to 145 million years ago.
        </Item>
        <Item key="cretaceous" title="Cretaceous">
          The Cretaceous is the longest period of the Mesozoic, spanning from
          145 million to 66 years ago.
        </Item>
      </Tabs>
      <P vol={1}>Selected time period: {timePeriod}</P>
    </>
  );
};

export const FocusableContentExample = () => {
  return (
    <Tabs aria-label="Notes app">
      <Item key="item1" title="Jane Doe">
        <label>
          Leave a note for Jane: <input type="text" />
        </label>
      </Item>
      <Item key="item2" title="John Doe">
        Senatus Populusque Romanus.
      </Item>
      <Item key="item3" title="Joe Bloggs">
        Alea jacta est.
      </Item>
    </Tabs>
  );
};

export const DynamicItemsExample = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Tab 1", content: "Tab body 1" },
    { id: 2, title: "Tab 2", content: "Tab body 2" },
    { id: 3, title: "Tab 3", content: "Tab body 3" },
  ]);
  const addTab = () => {
    setTabs((tabs) => [
      ...tabs,
      {
        id: tabs.length + 1,
        title: `Tab ${tabs.length + 1}`,
        content: `Tab Body ${tabs.length + 1}`,
      },
    ]);
  };
  const removeTab = () => {
    if (tabs.length > 1) {
      setTabs((tabs) => tabs.slice(0, -1));
    }
  };
  return (
    <>
      <Button variant="quiet" onPress={addTab}>
        Add tab
      </Button>
      <Button variant="quiet" onPress={removeTab}>
        Remove tab
      </Button>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => <Item title={item.title}>{item.content}</Item>}
      </Tabs>
    </>
  );
};

export const KeyboardActivationExample = () => {
  return (
    <Tabs aria-label="Input settings" keyboardActivation="manual">
      <Item key="mouse">Mouse Settings</Item>
      <Item key="keyboard">Keyboard Settings</Item>
      <Item key="gamepad">Gamepad Settings</Item>
    </Tabs>
  );
};

export const OrientationExample = () => {
  return (
    <Tabs aria-label="Chat log orientation example" orientation="vertical">
      <Item key="item1" title="John Doe">
        There is no prior chat history with John Doe.
      </Item>
      <Item key="item2" title="Jane Doe">
        There is no prior chat history with Jane Doe.
      </Item>
      <Item key="item3" title="Joe Bloggs">
        There is no prior chat history with Joe Bloggs.
      </Item>
    </Tabs>
  );
};

export const DisabledExample = () => {
  return (
    <Tabs aria-label="Input settings" isDisabled>
      <Item key="mouse">Mouse Settings</Item>
      <Item key="keyboard">Keyboard Settings</Item>
      <Item key="gamepad">Gamepad Settings</Item>
    </Tabs>
  );
};

export const DisabledItemsExample = () => {
  return (
    <Tabs aria-label="Input settings" disabledKeys={["gamepad"]}>
      <Item key="mouse">Mouse Settings</Item>
      <Item key="keyboard">Keyboard Settings</Item>
      <Item key="gamepad">Gamepad Settings</Item>
    </Tabs>
  );
};

export const VolumeExample = () => {
  return (
    <>
      <Tabs aria-label="Input settings" vol={1}>
        <Item key="mouse">Mouse Settings</Item>
        <Item key="keyboard">Keyboard Settings</Item>
        <Item key="gamepad">Gamepad Settings *vol=1</Item>
      </Tabs>
      <br />
      <Tabs aria-label="Input settings" vol={2}>
        <Item key="mouse">Mouse Settings</Item>
        <Item key="keyboard">Keyboard Settings</Item>
        <Item key="gamepad">Gamepad Settings *vol=2</Item>
      </Tabs>
      <br />
      <Tabs aria-label="Input settings" vol={3}>
        <Item key="mouse">Mouse Settings</Item>
        <Item key="keyboard">Keyboard Settings</Item>
        <Item key="gamepad">Gamepad Settings *vol=3</Item>
      </Tabs>
    </>
  );
};
