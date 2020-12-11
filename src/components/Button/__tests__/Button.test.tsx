import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Icon from "../../Icon/Icon";
import Link from "gatsby-link";

// import { MenuButton as ReachMenuButton } from "@reach/menu-button";
// import { Menu } from "../../Menu/Menu";

const buttonRef = React.createRef<HTMLButtonElement>();
const BigButtsString = "I love big buttons and I cannot lie...";

it("Button renders correctly as a basic button", () => {
  const tree = renderer
    .create(
      <Button
        data-testid="button-data-testid"
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

it("Button renders with stylable state prop overrides, tone, variant, vol and fullwidth", () => {
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

it("Button renders correctly as a basic anchor link via 'as' and 'to' props", () => {
  const tree = renderer
    .create(
      <Button
        as="a"
        data-testid="button-data-testid"
        onClick={() => console.log("onClick")}
        onMouseEnter={() => console.log("onMouseEnter")}
        to="http://shelley.earth"
        ref={buttonRef}
      >
        {BigButtsString}
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button renders as an anchor providing custom component via 'as' and 'to' props", () => {
  const tree = renderer
    .create(
      <Button
        as={Link}
        data-testid="button-data-testid"
        to="internal-link"
        ref={buttonRef}
      >
        {BigButtsString}
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button includes icon, divider and children", () => {
  const tree = renderer
    .create(
      <Button
        data-testid="button-data-testid"
        ref={buttonRef}
        icon={
          <Icon>
            <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
          </Icon>
        }
      >
        {BigButtsString}
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button includes icon as self closing tag, a11y text provided via icon alt", () => {
  const tree = renderer
    .create(
      <Button
        data-testid="button-data-testid"
        ref={buttonRef}
        variant={4}
        icon={
          <Icon alt={BigButtsString}>
            <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
          </Icon>
        }
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Button renders as disabled", () => {
  const DisabledButton = () => (
    <Button data-testid="button-data-testid" ref={buttonRef} disabled>
      {BigButtsString}
    </Button>
  );
  const { getByTestId } = render(<DisabledButton />);
  expect(getByTestId("button-data-testid")).toHaveAttribute("disabled");
});

// @todo fix jestconfig to map ONLY CSS files to identity-obj-proxy to support Reach CSS check.
// it("Button renders correctly with Reach Menu Button", () => {
//   const tree = renderer
//     .create(
//       <Menu>
//         <Button
//           as={ReachMenuButton}
//           data-testid="button-data-testid"
//           ref={buttonRef}
//         >
//           {BigButtsString}
//         </Button>
//       </Menu>
//     )
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
