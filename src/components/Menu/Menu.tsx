/**
 * Menu.tsx
 *
 * This file wraps the awesome Reach UI 'MenuButton' collection.
 * https://reach.tech/menu-button
 *
 * Please do checkout the library, it is very good, it has been
 * very useful in developing this lib.
 *
 */

import React from "react";

import {
  Menu as ReachMenu,
  MenuButton as ReachMenuButton,
  MenuList as ReachMenuList,
  MenuItems as ReachMenuItems,
  MenuItem as ReachMenuItem,
  MenuPopover as ReachMenuPopover,
  MenuLink as ReachMenuLink,
  MenuProps as ReachMenuProps,
  MenuListProps as ReachMenuListProps,
  MenuItemsProps as ReachMenuItemsProps,
  MenuItemProps as ReachMenuItemProps,
  MenuPopoverProps as ReachMenuPopoverProps,
  MenuLinkProps as ReachMenuLinkProps,
} from "@reach/menu-button";

import Button, { ButtonProps } from "../Button/Button";
import { st as stList, classes as list } from "./menuList.st.css";
import { st as stItem, classes as item } from "./menuItem.st.css";
// import { st as stLink, classes as link } from "./menuLink.st.css";

export type MenuProps = ReachMenuProps;
export type MenuButtonProps = ButtonProps;
export interface MenuListProps extends ReachMenuListProps {
  className?: string;
  as?: any;
}
export type MenuItemsProps = ReachMenuItemsProps;
export interface MenuItemProps extends ReachMenuItemProps {
  className?: string;
  disabled?: boolean;
  as?: any;
}
export type MenuPopoverProps = ReachMenuPopoverProps;
export type MenuLinkProps = ReachMenuLinkProps;

/**
 * Reach UI Menu - Straight wrap and go of the main menu.
 */
export const Menu = ({ children, ...rest }: MenuProps) => (
  <ReachMenu {...rest}>{children}</ReachMenu>
);

/**
 * Reach UI MenuButton - Churned out as Shelley button which provides styles.
 */
export const MenuButton = React.forwardRef(
  (
    { children, ...rest }: MenuButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => (
    <Button as={ReachMenuButton} ref={ref} {...rest}>
      {children}
    </Button>
  )
);
MenuButton.displayName = "MenuButton";

/**
 * Reach UI MenuList - Decorated with stylable stylesheet.
 */
export const MenuList = React.forwardRef(
  (
    { className, children, ...rest }: MenuListProps,
    ref?: React.Ref<HTMLDivElement>
  ) => (
    <ReachMenuList className={stList(list.root, className)} ref={ref} {...rest}>
      {children}
    </ReachMenuList>
  )
);
MenuList.displayName = "MenuList";

/**
 * Reach UI MenuItems - see Reach docs, custom uses cases so no class provided.
 */
export const MenuItems = React.forwardRef(
  ({ children, ...rest }: MenuItemsProps, ref?: React.Ref<HTMLDivElement>) => (
    <ReachMenuItems ref={ref} {...rest}>
      {children}
    </ReachMenuItems>
  )
);
MenuItems.displayName = "MenuItems";

/**
 * Reach UI MenuItem - Decorated with stylable stylesheet.
 */
export const MenuItem = React.forwardRef(
  (
    { className, children, as = "div", ...rest }: MenuItemProps,
    ref?: React.Ref<HTMLDivElement>
  ) => (
    <ReachMenuItem className={stItem(item.root, className)} ref={ref} {...rest}>
      {children}
    </ReachMenuItem>
  )
);
MenuItem.displayName = "MenuItem";

/**
 * Reach UI MenuPopover - see Reach docs for custom use cases, straight wrap.
 */
export const MenuPopover = React.forwardRef(
  (
    { children, ...rest }: MenuPopoverProps,
    ref?: React.Ref<HTMLDivElement>
  ) => (
    <ReachMenuPopover ref={ref} {...rest}>
      {children}
    </ReachMenuPopover>
  )
);
MenuPopover.displayName = "MenuPopover";

/**
 * Reach UI MenuLink - Decorated with stylable stylesheet.
 */
// export const MenuLink = React.forwardRef(
//   (
//     { className, children, as = "div", ...rest }: MenuLinkProps,
//     ref?: React.Ref<HTMLLIElement | HTMLDivElement>
//   ) => (
//     <ReachMenuLink
//       className={stItem(item.root, className)}
//       ref={ref}
//       {...rest}
//     >
//       {children}
//     </ReachMenuLink>
//   )
// );
// MenuLink.displayName = "MenuLink";

/**
 * Reach UI MenuLink - see Reach docs, custom uses cases so no class provided.
 */
export const MenuLink = React.forwardRef(
  (
    { children, ...rest }: MenuLinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => (
    <ReachMenuLink ref={ref} {...rest}>
      {children}
    </ReachMenuLink>
  )
);
MenuLink.displayName = "MenuLink";
