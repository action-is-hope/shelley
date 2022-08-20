/** MenuItem.tsx */
import React, { RefObject } from "react";
import { useMenuItem, AriaMenuItemProps } from "@react-aria/menu";

import type { TreeState } from "@react-stately/tree";
import type { Node } from "@react-types/shared/src/collections";

/* = Style API. */
import { st, classes } from "./menuItem.st.css";

interface MenuItemProps extends AriaMenuItemProps {
  highlight?: boolean;
  state: TreeState<object>;
  item: Node<object>;
  ref?: RefObject<HTMLElement>;
}

const MenuItem = ({
  item,
  state,
  onAction,
  onClose,
}: // ...rest
MenuItemProps) => {
  const ref = React.useRef(null);

  // Get props for the menu item element
  const isDisabled = state.disabledKeys.has(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      isSelected,
      onAction,
      onClose,
    },
    state,
    ref
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={st(classes.root, {
        isFocused,
        isSelected,
      })}
    >
      {item.rendered}
    </li>
  );
};

export default MenuItem;
