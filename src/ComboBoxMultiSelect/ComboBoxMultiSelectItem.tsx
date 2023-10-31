"use client";
import React, { ReactNode, forwardRef } from "react";
import CheckIcon from "../icons/Check";
import { st, classes } from "./comboBoxMultiSelectItem.st.css";

export interface ComboBoxMultiSelectItemProps {
  /** Custom className */
  className?: string;
  /** Icon to use for Selected Item. */
  selectedIcon?: React.ReactNode;
  /** Whether the menu item is disabled. */
  isDisabled?: boolean;
  /** Whether the menu item is selected. */
  isSelected?: boolean;
  /** Whether the menu item is focused. */
  isFocused?: boolean;
  /** A screen reader only label for the menu item. */
  "aria-label"?: string;
  children?: ReactNode;
}

function ComboBoxMultiSelectItem(
  props: ComboBoxMultiSelectItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const {
    className: classNameProp,
    selectedIcon,
    isFocused,
    isSelected,
    isDisabled,
    children,
    ...rest
  } = props;

  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );

  return (
    <li
      {...rest}
      ref={ref}
      className={st(
        classes.root,
        {
          isFocused,
          isSelected,
          isDisabled,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{children}</span>
      {isSelected && icon}
    </li>
  );
}

/**
 * ComboBoxMultiSelectItem is used in conjuntion with ComboBoxMultiSelect.
 */
const _ComboBoxMultiSelectItem = forwardRef(ComboBoxMultiSelectItem);
export { _ComboBoxMultiSelectItem as ComboBoxMultiSelectItem };
