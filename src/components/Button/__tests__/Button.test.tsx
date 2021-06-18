import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Icon from "../../Icon/Icon";
// import { Link } from "react-router-dom";

import { MenuButton as ReachMenuButton } from "@reach/menu-button";
import { Menu } from "../../Menu/Menu";

const buttonRef = React.createRef<HTMLButtonElement>();
const BigButtsString = "I love big buttons and I cannot lie...";
const iconPath = <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>;

describe("Button", () => {
  it("renders as a basic button with custom #className", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          className="for-which-nobody-can-deny"
          onClick={() => console.log("onClick")}
          onMouseEnter={() => console.log("onMouseEnter")}
          ref={buttonRef}
        >
          {BigButtsString}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as disabled", () => {
    const DisabledButton = () => (
      <Button data-testid="button-data-testid" ref={buttonRef} disabled>
        {BigButtsString}
      </Button>
    );
    const { getByTestId } = render(<DisabledButton />);
    expect(getByTestId("button-data-testid")).toHaveAttribute("disabled");
  });

  it("renders with stylable state prop classes, #tone, #variant, #vol and #fullwidth", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          onClick={() => console.log("onClick")}
          onMouseEnter={() => console.log("onMouseEnter")}
          ref={buttonRef}
          tone={6}
          variant={6}
          vol={6}
          fullWidth
        >
          {BigButtsString}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as a basic anchor link via #href prop", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          onClick={() => console.log("onClick")}
          onMouseEnter={() => console.log("onMouseEnter")}
          href="http://shelley.earth"
          ref={buttonRef}
        >
          {BigButtsString}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("renders as third party anchor provided via #as and #t props", () => {
  //   const tree = renderer
  //     .create(
  //       <Button
  //         as={Link}
  //         data-testid="button-data-testid"
  //         to="internal-link"
  //         ref={buttonRef}
  //       >
  //         {BigButtsString}
  //       </Button>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it("includes #icon via prop positioned via #iconPos divider and children", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          ref={buttonRef}
          icon={<Icon>{iconPath}</Icon>}
          iconPos="start"
        >
          {BigButtsString}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("includes #icon, no children, visually hidden label text provided via Icon alt prop", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          ref={buttonRef}
          variant={4}
          icon={<Icon alt={BigButtsString}>{iconPath}</Icon>}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // @todo fix jestconfig to map ONLY CSS files to identity-obj-proxy to support Reach CSS check.
  it("supports Reach Menu Button via #as", () => {
    const tree = renderer
      .create(
        <Menu>
          <Button
            as={ReachMenuButton}
            data-testid="button-data-testid"
            ref={buttonRef}
          >
            {BigButtsString}
          </Button>
        </Menu>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
