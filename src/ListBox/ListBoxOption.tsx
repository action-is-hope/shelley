"use client";
import React, { useRef } from "react";
import CheckIcon from "../icons/Check";
import type { Node } from "@react-types/shared/src/collections";
import type { ListState } from "react-stately";
import { mergeProps, useHover, useOption } from "react-aria";
import { st, classes } from "./listBoxOption.st.css";

export interface ListBoxOptionProps<T> {
  state: ListState<T>;
  item: Node<T>;
  className?: string;
  selectedIcon?: React.ReactNode;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
}

export function ListBoxOption<T>(props: ListBoxOptionProps<T>) {
  const {
    className: classNameProp,
    item,
    state,
    selectedIcon,
    shouldSelectOnPressUp,
    shouldFocusOnHover,
  } = props;
  const ref = useRef(null);

  // Get props for the option
  const {
    optionProps,
    isFocused,
    isDisabled,
    isPressed,
    isSelected,
    isFocusVisible,
  } = useOption(
    {
      "aria-label": item["aria-label"],
      key: item.key,
      shouldSelectOnPressUp,
      shouldFocusOnHover,
    },
    state,
    ref
  );
  const { hoverProps, isHovered } = useHover({
    ...props,
    isDisabled,
  });

  const icon = selectedIcon || (
    <CheckIcon data-id="selected-icon" className={classes.selectedIcon} />
  );
  return (
    <li
      {...mergeProps(optionProps, hoverProps)}
      ref={ref}
      className={st(
        classes.root,
        {
          isDisabled,
          isFocused,
          isFocusVisible,
          isHovered,
          isPressed,
          isSelected,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{item.rendered}</span>
      {isSelected && icon}
    </li>
  );
}
