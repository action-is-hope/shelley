"use client";
import React, { ReactNode, forwardRef } from "react";
import CheckIcon from "../icons/Check";
import { useId } from "react-aria";
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
  /** The unique key for the menu item. */
  // key?: string;
  children?: ReactNode;
}

function ComboBoxMultiSelectItem(
  props: ComboBoxMultiSelectItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  // const ref = useRef(null);
  const {
    className: classNameProp,
    selectedIcon,
    isFocused,
    isSelected,
    isDisabled,
    children,
    // key,
    ...rest
  } = props;

  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );

  return (
    <li
      {...rest}
      ref={ref}
      // key={key}
      // key={useId(key)}
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
 * ComboBoxMultiSelectItem can be used to group related buttons in various orientations.
 */
const _ComboBoxMultiSelectItem = forwardRef(ComboBoxMultiSelectItem);
export { _ComboBoxMultiSelectItem as ComboBoxMultiSelectItem };
