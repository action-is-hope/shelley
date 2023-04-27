import { useState } from "react";
import { Item } from "@react-stately/collections";
import {
  Button,
  ButtonGroup,
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
      <Button>
        <Icon alt="Block settings">
          <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
        </Icon>
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
      hideArrow
    >
      <Button tone={10} variant="fab" vol={1}>
        <Icon alt="Block settings">
          <g id="ellipsis-dots-h">
            <path d="M4 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M16 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          </g>
        </Icon>
      </Button>
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
    <ButtonGroup vol={3} tone={2} variant="primary" splitButton>
      {/* // fullWidth */}
      <Button fullWidth>Publish</Button>
      <MenuTrigger portalSelector="#portal" className="TEST">
        <Button tone={2} variant="primary" vol={2}>
          <Icon alt="Change status">
            <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
          </Icon>
        </Button>
        <Menu onAction={(key) => console.log("onAcion change", key)}>
          <Item key="publish">Publish</Item>
          <Item key="archive">Archive</Item>
          <Item key="delete">Delete</Item>
        </Menu>
      </MenuTrigger>
    </ButtonGroup>
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
