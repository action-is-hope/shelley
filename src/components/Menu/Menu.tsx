/** Menu.tsx */
import { useRef } from "react";
import type { AriaMenuProps } from "@react-types/menu";
import { useMenu } from "@react-aria/menu";
// import { mergeProps } from "@react-aria/utils";
import { useTreeState } from "@react-stately/tree";
import type { TreeProps } from "@react-stately/tree/dist/types";
import MenuItem from "../MenuItem/MenuItem";
/* = Style API. */
import { st, classes } from "./menu.st.css";

export interface MenuProps<T> extends TreeProps<T>, AriaMenuProps<T> {
  /** ClassName if you need/want a style hook. */
  className?: string;
  /** Handler that is called when the menu should close after selecting an item. */
  onClose?: () => void;
}

export function Menu<T extends object>(props: MenuProps<T>) {
  const { className, onAction, onClose } = props;
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
    <ul className={st(classes.root, className)} {...menuProps} ref={menuRef}>
      {[...state.collection].map((item) => (
        <MenuItem
          key={item.key}
          className={classes.item}
          item={item}
          state={state}
          // Do we need these now?
          // onAction={onAction}
          // onClose={onClose}
        />
      ))}
    </ul>
  );
}

export default Menu;
