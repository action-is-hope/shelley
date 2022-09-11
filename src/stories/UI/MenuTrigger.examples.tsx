import { useState } from "react";
import { Item } from "@react-stately/collections";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuTriggerProps,
  Icon,
} from "../../indexLib";

export const BasicMenuTrigger = (args: MenuTriggerProps) => {
  return (
    <MenuTrigger portalSelector="#portal" {...args}>
      <Button>Edit</Button>
      <Menu onAction={(info) => alert(info)}>
        <Item key="cut">Cut</Item>
        <Item key="copy">Copy</Item>
        <Item key="paste">Paste</Item>
      </Menu>
    </MenuTrigger>
  );
};

export function ControlledMenuTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <MenuTrigger portalSelector="#portal" isOpen={open} onOpenChange={setOpen}>
      <Button>View</Button>
      <Menu selectionMode="multiple">
        <Item key="side">Side bar</Item>
        <Item key="options">Page options</Item>
        <Item key="edit">Edit Panel</Item>
      </Menu>
    </MenuTrigger>
  );
}

export const IconTriggerMenu = (args: MenuTriggerProps) => {
  return (
    <MenuTrigger
      portalSelector="#portal"
      // onOpenChange={() => console.log("Menu closeed")}
      // closeOnSelect={false}
      // trigger="longPress"
      {...args}
    >
      <Button
        icon={
          <Icon alt="Block settings">
            <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
          </Icon>
        }
      >
        Actions
      </Button>
      <Menu onAction={(i) => console.log("Menu onAction", i)}>
        <Item key="page">Page</Item>
        <Item key="blog">Blog post</Item>
        <Item key="event">Event</Item>
      </Menu>
    </MenuTrigger>
  );
};

export const MultipleSelectionMenuTrigger = () => {
  return (
    <MenuTrigger
      portalSelector="#portal"
      onOpenChange={(isOpen) => console.log("isOpen:", isOpen)}
      // Automatic if the menus selection type is multiple it will be false but you can override.
      // closeOnSelect={false}
    >
      <Button
        tone={10}
        variant="fab"
        vol={1}
        icon={
          <Icon alt="Block settings">
            <g id="ellipsis-dots-h">
              <path d="M4 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
              <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
              <path d="M16 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            </g>
          </Icon>
        }
      />
      <Menu
        selectionMode="multiple"
        onSelectionChange={(keys) => console.log("selection change", keys)}
      >
        <Item key="side">Side bar</Item>
        <Item key="options">Page options</Item>
        <Item key="edit">Edit Panel</Item>
      </Menu>
    </MenuTrigger>
  );
};

export const ButtonGroupTriggerMenu = () => {
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
