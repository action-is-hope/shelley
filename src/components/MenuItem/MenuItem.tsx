/** MenuItem.tsx */
import React, { RefObject } from "react";
import {
  // useMenu,
  useMenuItem,
  // useMenuTrigger,
  AriaMenuItemProps,
} from "@react-aria/menu";

import { mergeProps } from "@react-aria/utils";
import { useFocus } from "@react-aria/interactions";

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
  ...rest
}: MenuItemProps) => {
  // Get props for the menu item element
  const ref = React.useRef(null);
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled: item.isDisabled,
      onAction,
      onClose,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  const [isFocused, setFocused] = React.useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });
  console.log(focusProps);
  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={st(classes.root, {
        isFocused,
      })}
    >
      {item.rendered}
    </li>
  );
};

export default MenuItem;
