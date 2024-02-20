"use client";
import { useRef, forwardRef } from "react";
import type { AriaMenuProps } from "@react-types/menu";
import { mergeRefs } from "@react-aria/utils";
import { useMenu } from "react-aria";
import { useTreeState } from "@react-stately/tree";
import { MenuItem } from ".";
import type { ComponentBase } from "../typings/shared-types";
import { st, classes } from "./menu.st.css";

export interface MenuProps<T> extends AriaMenuProps<T>, ComponentBase {
  /** ClassName if you need/want a style hook. */
  className?: string;
}

function Menu<T extends object>(
  props: MenuProps<T>,
  ref?: React.Ref<HTMLUListElement>
) {
  const { className, "data-id": dataId } = props;
  // Create menu state based on the incoming props.
  const state = useTreeState({ ...props });
  const menuRef = useRef(null);

  // Create menu based on the incoming props.
  const { menuProps } = useMenu(
    { autoFocus: "first", ...props },
    state,
    menuRef
  );

  return (
    <ul
      className={st(classes.root, className)}
      {...menuProps}
      ref={ref ? mergeRefs(ref, menuRef) : menuRef}
      data-id={dataId}
    >
      {[...state.collection].map((item) => (
        <MenuItem
          key={item.key}
          className={classes.item}
          item={item}
          state={state}
          selectionMode={props.selectionMode}
        />
      ))}
    </ul>
  );
}
Menu.displayName = "Menu";

const _Menu = forwardRef(Menu);
export { _Menu as Menu };
