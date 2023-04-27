/** Menu.tsx */
import { useRef } from "react";
import type { AriaMenuProps } from "@react-types/menu";
import { useMenu } from "react-aria";
import { useTreeState } from "@react-stately/tree";
import MenuItem from "../MenuItem/MenuItem";
import type { ComponentBase } from "../types";
/* = Style API. */
import { st, classes } from "./menu.st.css";

export interface MenuProps<T> extends AriaMenuProps<T>, ComponentBase {
  /** ClassName if you need/want a style hook. */
  className?: string;
}

export function Menu<T extends object>(props: MenuProps<T>) {
  const { className, "data-id": dataId } = props;
  // Create menu state based on the incoming props.
  const state = useTreeState({ ...props });
  const menuRef = useRef(null);

  // Create menu based on the incoming props.
  const { menuProps } = useMenu(
    { autoFocus: "first", ...props },
    state,
    menuRef
  );

  return (
    <ul
      className={st(classes.root, className)}
      {...menuProps}
      ref={menuRef}
      data-id={dataId}
    >
      {[...state.collection].map((item) => (
        <MenuItem
          key={item.key}
          className={classes.item}
          item={item}
          state={state}
        />
      ))}
    </ul>
  );
}

export default Menu;
