/** MenuItem.tsx */
import React, { RefObject } from "react";
import {
  // useMenu,
  useMenuItem,
  // useMenuTrigger,
  AriaMenuItemProps,
} from "@react-aria/menu";

// import { mergeProps } from "@react-aria/utils";
// import { useFocus } from "@react-aria/interactions";

/* = Style API. */
import { st, classes } from "./menuItem.st.css";

// export type ButtonProps<P extends React.ElementType = "button"> = {
//   /** Custom element to render such as an anchor "a" or a router "Link" component. */
//   as?: P;
// } & MergeElementProps<P, ButtonBaseProps>;

interface MenuItemProps extends AriaMenuItemProps {
  highlight?: boolean;
  state: any;
  item: any;
  ref?: RefObject<HTMLElement>;
}

const MenuItem = ({
  item,
  state,
  onAction,
  onClose,
}: // ...rest
MenuItemProps) => {
  // Get props for the menu item element
  const ref = React.useRef(null);

  const isDisabled = state.disabledKeys.has(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      // isDisabled: item.isDisabled,
      isDisabled,
      isSelected,
      onAction,
      onClose,
    },
    state,
    ref
  );
  // console.log(menuItemProps);
  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  // const [isFocused, setFocused] = React.useState(false);

  // const { focusProps } = useFocus({ onFocusChange: setFocused });
  return (
    <li
      // {...mergeProps(menuItemProps, focusProps)}
      {...menuItemProps}
      ref={ref}
      className={st(classes.root, {
        isFocused,
        isSelected,
      })}
    >
      {item.rendered}
    </li>
  );
};

export default MenuItem;
