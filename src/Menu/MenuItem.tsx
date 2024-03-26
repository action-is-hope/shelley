"use client";
import React, { useRef } from "react";
import { useMenuItem, AriaMenuItemProps } from "react-aria";
import CheckIcon from "../icons/Check";
import type { TreeState } from "@react-stately/tree";
import type { Node } from "@react-types/shared/src/collections";
import type { SelectionMode } from "@react-types/shared/src/selection";
import { mergeProps, useFocusRing } from "react-aria";
import { st, classes } from "./menuItem.st.css";

export interface MenuItemProps<T> extends AriaMenuItemProps {
  highlight?: boolean;
  state: TreeState<T>;
  item: Node<T>;
  className?: string;
  selectedIcon?: React.ReactNode;
  selectionMode?: SelectionMode;
}

export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  const ref = useRef(null);
  const {
    className: classNameProp,
    item,
    state,
    selectedIcon,
    selectionMode,
  } = props;
  // Get props for the menu item element
  const { isFocusVisible, focusProps } = useFocusRing();
  const { menuItemProps, isFocused, isDisabled, isPressed, isSelected } =
    useMenuItem({ key: item.key }, state, ref);
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
          isDisabled,
          isFocused,
          isFocusVisible,
          isPressed,
          isSelected,
          selectionMode,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{item.rendered}</span>
      {isSelected && icon}
    </li>
  );
}
