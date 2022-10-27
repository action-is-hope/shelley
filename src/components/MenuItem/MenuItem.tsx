/** MenuItem.tsx */
import React, { useRef } from "react";
import { useMenuItem, AriaMenuItemProps } from "@react-aria/menu";
import CheckIcon from "../icons/Check";
import type { TreeState } from "@react-stately/tree";
import type { Node } from "@react-types/shared/src/collections";
import { mergeProps, useFocusRing } from "react-aria";

/* = Style API. */
import { st, classes } from "./menuItem.st.css";

interface MenuItemProps<T> extends AriaMenuItemProps {
  highlight?: boolean;
  state: TreeState<T>;
  item: Node<T>;
  className?: string;
  selectedIcon?: React.ReactNode;
}

export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  const ref = useRef(null);
  const { className: classNameProp, item, state, selectedIcon } = props;
  // Get props for the menu item element
  const { isFocusVisible, focusProps } = useFocusRing();
  const { menuItemProps, isFocused, isSelected, isDisabled } = useMenuItem(
    { key: item.key },
    state,
    ref
  );
  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={st(
        classes.root,
        {
          isFocused,
          isFocusVisible,
          isSelected,
          isDisabled,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{item.rendered}</span>
      {isSelected && icon}
    </li>
  );
}

export default MenuItem;
