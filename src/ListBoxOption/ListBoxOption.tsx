"use client";
import React, { useRef } from "react";
import CheckIcon from "../icons/Check";
import type { Node } from "@react-types/shared/src/collections";
import type { ListState } from "react-stately";
import { mergeProps, useFocusRing, useHover, useOption } from "react-aria";
import { st, classes } from "./listBoxOption.st.css";

interface OptionProps<T> {
  state: ListState<T>;
  item: Node<T>;
  className?: string;
  selectedIcon?: React.ReactNode;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
}

export function ListBoxOption<T>(props: OptionProps<T>) {
  const {
    className: classNameProp,
    item,
    state,
    selectedIcon,
    shouldSelectOnPressUp,
    shouldFocusOnHover,
  } = props;
  const ref = useRef(null);
  const { isFocusVisible, focusProps } = useFocusRing();
  // Get props for the option
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
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
      {...mergeProps(
        optionProps,
        shouldFocusOnHover ? {} : hoverProps,
        focusProps
      )}
      ref={ref}
      className={st(
        classes.root,
        {
          isFocused,
          isFocusVisible,
          isSelected,
          isDisabled,
          isHovered,
        },
        classNameProp
      )}
    >
      <span className={classes.text}>{item.rendered}</span>
      {isSelected && icon}
    </li>
  );
}
