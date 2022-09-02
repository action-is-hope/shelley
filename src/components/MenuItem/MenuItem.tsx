/** MenuItem.tsx */
import React from "react";
import { useMenuItem, AriaMenuItemProps } from "@react-aria/menu";
import CheckIcon from "../icons/Check";
import type { TreeState } from "@react-stately/tree";
import type { Node } from "@react-types/shared/src/collections";
import { useFocusRing } from "react-aria";

/* = Style API. */
import { st, classes } from "./menuItem.st.css";

interface MenuItemProps extends AriaMenuItemProps {
  highlight?: boolean;
  state: TreeState<object>;
  item: Node<object>;
  className?: string;
  selectedIcon?: React.ReactNode;
}

const MenuItem = ({
  className: classNameProp,
  item,
  state,
  selectedIcon,
}: MenuItemProps) => {
  const ref = React.useRef(null);

  // Get props for the menu item element
  const isDisabled = state.disabledKeys.has(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isSelected = state.selectionManager.selectedKeys.has(item.key);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      isSelected,
    },
    state,
    ref
  );

  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );
  return (
    <li
      {...menuItemProps}
      {...focusProps}
      ref={ref}
      className={st(
        classes.root,
        {
          isFocused,
          isFocusVisible,
          isSelected,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{item.rendered}</span>
      {isSelected && icon}
    </li>
  );
};

export default MenuItem;
