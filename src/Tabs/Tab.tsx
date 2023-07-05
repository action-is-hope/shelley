"use client";
import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTab, useFocusRing } from "react-aria";
import type { Node } from "@react-types/shared";
import type { TabListState } from "react-stately";
import { mergeProps } from "@react-aria/utils";
import { st, classes } from "./tabs.st.css";
import type { ComponentBase } from "../typings/shared-types";
export interface TabProps<T> extends ComponentBase {
  /** An item from a react-stately collection. */
  item: Node<T>;
  /** Selection state from react-stately */
  state: TabListState<T>;
}

function Tab<T extends object>({
  item,
  state,
  "data-id": dataId,
}: TabProps<T>) {
  const { key, rendered } = item;
  const ref = useRef<HTMLDivElement>(null);
  const { tabProps, isSelected, isDisabled, isPressed } = useTab(
    { key },
    state,
    ref
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      className={st(classes.tab, {
        isSelected,
        isDisabled,
        isPressed,
        isFocusVisible,
      })}
      {...mergeProps(tabProps, focusProps)}
      ref={ref}
      data-id={dataId}
    >
      {rendered}
    </div>
  );
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Tab = forwardRef(Tab) as <T>(
  props: TabProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _Tab as Tab };
