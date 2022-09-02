/** Menu.tsx */
import { useRef, HTMLAttributes } from "react";
import type { AriaMenuProps } from "@react-types/menu";
import { useMenu } from "@react-aria/menu";
import { mergeProps } from "@react-aria/utils";
import { useTreeState, TreeProps } from "@react-stately/tree";
import MenuItem from "../MenuItem/MenuItem";
/* = Style API. */
import { st, classes } from "./menu.st.css";

export interface MenuProps<T> extends TreeProps<T>, AriaMenuProps<T> {
  /** Aria/DOM props spread to the internal list. */
  ariaProps?: HTMLAttributes<HTMLElement>;
  /** ClassName if you need/want a style hook. */
  className?: string;
  /** Handler that is called when the menu should close after selecting an item. */
  onClose?: () => void;
}

export function Menu<T extends object>(props: MenuProps<T>) {
  const { className, onAction, onClose, ariaProps = {} } = props;
  // Create menu state based on the incoming props.
  const state = useTreeState({
    ...props,
    // @todo: look to add support for diffrent selection modes.
    // selectionMode: "none",
  });
  const menuRef = useRef(null);

  // Create menu based on the incoming props.
  const { menuProps } = useMenu(
    { autoFocus: "first", ...props },
    state,
    menuRef
  );

  return (
    <ul
      {...mergeProps(menuProps, ariaProps)}
      className={st(classes.root, className)}
      ref={menuRef}
    >
      {[...state.collection].map((item) => (
        <MenuItem
          key={item.key}
          className={classes.item}
          item={item}
          state={state}
          onAction={onAction}
          onClose={onClose}
        />
      ))}
    </ul>
  );
}

export default Menu;
