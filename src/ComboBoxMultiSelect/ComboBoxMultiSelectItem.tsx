"use client";
import React, { ReactNode, forwardRef } from "react";
import CheckIcon from "../icons/Check";
import { st, classes } from "./comboBoxMultiSelectItem.st.css";
import { usePress } from "react-aria";

export interface ComboBoxMultiSelectItemProps
  extends React.HTMLProps<HTMLElement> {
  /** Custom className */
  className?: string;
  /** Icon to use for Selected Item. */
  selectedIcon?: React.ReactNode;
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
    disabled: isDisabled,
    children,
    ...rest
  } = props;

  const usePressProps = { onPress: props?.onClick as () => void };
  const { pressProps, isPressed } = usePress(usePressProps);

  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );

  return (
    <li
      {...rest}
      {...pressProps}
      ref={ref}
      className={st(
        classes.root,
        {
          isDisabled,
          isFocused,
          isSelected,
          isPressed,
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
