"use client";
import { useRef, ReactNode } from "react";
import type { ListState } from "react-stately";
import { useFocusRing, useHover } from "react-aria";
import { useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import type { Node } from "@react-types/shared/src/collections";
import CheckIcon from "../icons/Check";
import { st, classes as optionClasses } from "./listBoxOption.st.css";
interface OptionProps<T> {
  state: ListState<T>;
  item: Node<T>;
  /** Override the default selected Icon. */
  selectedIcon?: ReactNode;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
}

interface OptionProps<T> {
  state: ListState<T>;
  item: Node<T>;
  /** Override the default selected Icon. */
  selectedIcon?: ReactNode;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
}

export function ListBoxOption<T>(props: OptionProps<T>) {
  const {
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
    <CheckIcon data-id="selected-icon" className={optionClasses.selectedIcon} />
  );
  return (
    <li
      {...mergeProps(
        optionProps,
        shouldFocusOnHover ? {} : hoverProps,
        focusProps
      )}
      ref={ref}
      className={st(optionClasses.root, {
        isFocused,
        isFocusVisible,
        isSelected,
        isDisabled,
        isHovered,
      })}
    >
      <span className={optionClasses.text}>{item.rendered}</span>
      {isSelected && icon}
    </li>
  );
}
