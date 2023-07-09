"use client";
import { useRef, forwardRef } from "react";
import { useTab, useFocusRing } from "react-aria";
import type { Node } from "@react-types/shared";
import type { TabListState } from "react-stately";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { st, classes } from "./tabs.st.css";
import type { ComponentBase } from "../typings/shared-types";
export interface TabProps<T> extends ComponentBase {
  /** An item from a react-stately collection. */
  item: Node<T>;
  /** Selection state from react-stately */
  state: TabListState<T>;
}

function Tab<T extends object>(
  { item, state, "data-id": dataId }: TabProps<T>,
  ref?: React.Ref<HTMLDivElement>
) {
  const { key, rendered } = item;
  const localRef = useRef<HTMLDivElement>(null);
  const { tabProps, isSelected, isDisabled, isPressed } = useTab(
    { key },
    state,
    localRef
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
      ref={ref ? mergeRefs(ref, localRef) : localRef}
      data-id={dataId}
    >
      {rendered}
    </div>
  );
}
Tab.displayName = "Tab";

const _Tab = forwardRef(Tab);
export { _Tab as Tab };
