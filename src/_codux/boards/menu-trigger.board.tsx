import { createBoard } from "@wixc3/react-board";
import { MenuTrigger } from "../../MenuTrigger";
import { Menu } from "../../Menu";
import { Item } from "../../Item";
import { Button } from "../../Button";

export default createBoard({
  name: "Menu Trigger",
  Board: () => (
    <MenuTrigger>
      <Button>Edit</Button>
      <Menu onAction={(info) => alert(info)}>
        <Item key="cut">Cut</Item>
        <Item key="copy">Copy</Item>
        <Item key="paste">Paste</Item>
      </Menu>
    </MenuTrigger>
  ),
});
