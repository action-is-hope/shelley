/** MenuPopup.tsx */
import React from "react";
import { useMenu } from "@react-aria/menu";
import { FocusScope } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useOverlay, DismissButton } from "@react-aria/overlays";
import { useTreeState } from "@react-stately/tree";
import MenuItem from "../MenuItem/MenuItem";
/* = Style API. */
import { st, classes } from "./menuPopup.st.css";

export interface MenuPopupProps extends React.HTMLAttributes<HTMLBaseElement> {
  /** HTML as to render as this Text item. */
  as: string;
}

export type Ref = any;

export const MenuPopup = React.forwardRef((props: any, ref: any) => {
  // Create menu state based on the incoming props
  const state = useTreeState({ ...props, selectionMode: "none" });

  // Get props for the menu element
  const menuRef = React.useRef(null);
  const { menuProps } = useMenu(props, state, menuRef);

  // Handle events that should cause the menu to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const overlayRef = ref;
  const { overlayProps } = useOverlay(
    {
      onClose: props.onClose,
      shouldCloseOnBlur: true,
      isOpen: true,
      isDismissable: true,
    },
    overlayRef
  );
  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the menu is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        className={st(classes.root)}
        style={props.style}
        ref={overlayRef}
      >
        <DismissButton onDismiss={props.onClose} />
        <ul
          {...mergeProps(menuProps, props.domProps)}
          className={classes.list}
          ref={menuRef}
        >
          {[...state.collection].map((item) => (
            <MenuItem
              key={item.key}
              item={item}
              state={state}
              onAction={props.onAction}
              onClose={props.onClose}
            />
          ))}
        </ul>
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusScope>
  );
});
MenuPopup.displayName = "MenuPopup";

export default MenuPopup;
