import React from "react";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover
} from "../Menu";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Link from "gatsby-link";

import Text from "../../Text/Text";

const buttonRef = React.createRef<HTMLButtonElement>();
const BigButtsString = "I love big buttons and I cannot lie...";

describe("Menu", () => {
  // @todo fix jestconfig to map ONLY CSS files to identity-obj-proxy to support Reach CSS check.
  it("supports Reach Menu Button via #as", () => {
    const tree = renderer
      .create(
        <Menu>
          <MenuButton data-testid="button-data-testid" ref={buttonRef}>
            {BigButtsString}
          </MenuButton>
          <MenuList>
            <Text as="label" uppercase vol={1}>
              Change status
            </Text>
            <MenuItem disabled onSelect={() => alert("selected!")}>
              Publish
            </MenuItem>
            <MenuItem onSelect={() => alert("selected!")}>Archive</MenuItem>
            <MenuItem onSelect={() => alert("selected!")}>Delete</MenuItem>
          </MenuList>
        </Menu>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
