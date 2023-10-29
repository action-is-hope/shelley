"use client";
import React, { useRef, Key, ReactNode, Children } from "react";
import CheckIcon from "../icons/Check";
import type { SelectionMode } from "@react-types/shared/src/selection";
import { mergeProps, useFocusRing } from "react-aria";
import { st, classes } from "./multiSelectItem.st.css";

export interface AriaMenuItemProps {
  /**
   * Whether the menu item is disabled.
   * @deprecated - pass disabledKeys to useTreeState instead.
   */
  isDisabled?: boolean;
  /**
   * Whether the menu item is selected.
   * @deprecated - pass selectedKeys to useTreeState instead.
   */
  isSelected?: boolean;
  /** A screen reader only label for the menu item. */
  "aria-label"?: string;
  /** The unique key for the menu item. */
  key?: Key;
  /**
   * Handler that is called when the menu should close after selecting an item.
   * @deprecated - pass to the menu instead.
   */
  onClose?: () => void;
  /**
   * Whether the menu should close when the menu item is selected.
   * @default true
   */
  closeOnSelect?: boolean;
  /** Whether the menu item is contained in a virtual scrolling menu. */
  isVirtualized?: boolean;
  /**
   * Handler that is called when the user activates the item.
   * @deprecated - pass to the menu instead.
   */
  onAction?: (key: Key) => void;
  /** What kind of popup the item opens. */
  "aria-haspopup"?: "menu" | "dialog";
}

export interface MultiSelectItemProps<T> extends AriaMenuItemProps {
  highlight?: boolean;
  // state: TreeState<T>;
  // item: Node<T>;
  className?: string;
  selectedIcon?: React.ReactNode;
  selectionMode?: SelectionMode;
  isSelected?: boolean;
  isFocusVisible?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
}

export function MultiSelectItem<T extends object>(
  props: MultiSelectItemProps<T>
) {
  const ref = useRef(null);
  const {
    className: classNameProp,
    // item,
    selectedIcon,
    selectionMode,
    isFocused,
    isSelected,
    isDisabled,
    children,
    isFocusVisible,
    ...rest
  } = props;
  // Get props for the menu item element
  // const { isFocusVisible, focusProps } = useFocusRing();
  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );

  return (
    <li
      // {...mergeProps(rest, focusProps)}
      {...rest}
      ref={ref}
      className={st(
        classes.root,
        {
          isFocused,
          isFocusVisible,
          isSelected,
          isDisabled,
          selectionMode,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{children}</span>
      {isSelected && icon}
    </li>
  );
}
