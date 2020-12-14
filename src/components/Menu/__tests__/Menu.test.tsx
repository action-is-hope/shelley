import React from "react";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem
  // MenuItems,
  // MenuPopover
} from "../Menu";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";

const buttonRef = React.createRef<HTMLButtonElement>();
const BigButtsString = "I love big buttons and I cannot lie...";

afterEach(cleanup);

/** Most if the functionality is covered by Reach so these are smoke tests for happy paths. */
describe("Menu", () => {
  // @todo fix jestconfig to map ONLY CSS files to identity-obj-proxy to support Reach CSS check.
  it("renders the MenuButton as an array with MenuList elsewhere.", () => {
    const handleOnSelect = jest.fn();
    const tree = renderer
      .create(
        <Menu>
          <MenuButton data-testid="button-data-testid" ref={buttonRef}>
            {BigButtsString}
          </MenuButton>
          <MenuList>
            <MenuItem onSelect={handleOnSelect}>Menu Item</MenuItem>
          </MenuList>
        </Menu>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders MenuList in portal and activates onKeyDown properly via hidden attribute", async () => {
    const handleOnSelect = jest.fn();
    const handleOnKeyDown = jest.fn();

    // Arrange
    const MenuExample = () => (
      <Menu>
        <MenuButton
          onKeyDown={handleOnKeyDown}
          data-testid="button-data-testid"
          ref={buttonRef}
        >
          Activate
        </MenuButton>
        <MenuList>
          <MenuItem onSelect={handleOnSelect}>Menu Item</MenuItem>
        </MenuList>
      </Menu>
    );
    const { getByText } = render(<MenuExample />);

    // Assert: Item renders and Menu Popover (item's parent.parent) is hidden.
    expect(
      getByText("Menu Item").parentElement?.parentElement?.hidden
    ).toBeTruthy();

    // Act: Invoke Menu.
    fireEvent.keyDown(getByText(/Activate/i), { key: "ArrowDown" });

    // Assert: KeyDown called once.
    expect(handleOnKeyDown).toHaveBeenCalledTimes(1);

    // Assert: Visibiliy of Menu Popover has changed to not hidden (visible).
    await waitFor(() => {
      expect(
        getByText("Menu Item").parentElement?.parentElement?.hidden
      ).toBeFalsy();
    });
  });
});
