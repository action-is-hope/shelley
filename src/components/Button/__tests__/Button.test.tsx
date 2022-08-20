import React from "react";
import Button from "../ButtonARIA";
// import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Icon from "../../Icon/Icon";
import { Router, Link } from "react-router-dom";

import { createMemoryHistory } from "history";
// import { StaticRouter } from 'react-router'

// import { MenuButton as ReachMenuButton } from "@reach/menu-button";
// import { Menu } from "../../Menu/Menu";

const buttonRef = React.createRef<HTMLButtonElement>();

const buttonRefAnchor = React.createRef<HTMLAnchorElement>();
const btnText = "I love big buttons and I cannot lie...";
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
          {btnText}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("renders as disabled", () => {
  //   const DisabledButton = () => (
  //     <Button data-testid="button-data-testid" ref={buttonRef} disabled>
  //       {btnText}
  //     </Button>
  //   );
  //   const { getByTestId } = render(<DisabledButton />);
  //   expect(getByTestId("button-data-testid")).toHaveAttribute("disabled");
  // });

  it("renders with stylable state prop classes, #tone, #variant, #vol and #fullwidth", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          onClick={() => console.log("onClick")}
          onMouseEnter={() => console.log("onMouseEnter")}
          ref={buttonRef}
          tone={6}
          variant="primary"
          vol={6}
          fullWidth
        >
          {btnText}
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
          // onClick={() => console.log("onClick")}
          // onMouseEnter={() => console.log("onMouseEnter")}
          href="http://shelley.earth"
          as="a"
          // ref={buttonRefAnchor}
        >
          {btnText}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as third party (react-router) anchor provided via #as and #to props", () => {
    const memHistory = createMemoryHistory();
    const tree = renderer
      .create(
        <Router history={memHistory}>
          <Button
            as={Link}
            data-testid="button-data-testid"
            to="internal-link"
            // onPress={() => console.log("hi")}
            ref={buttonRefAnchor}
          >
            {btnText}
          </Button>
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("includes #icon via prop positioned via #iconPos divider and children", () => {
    const tree = renderer
      .create(
        <Button
          data-testid="button-data-testid"
          ref={buttonRef}
          icon={<Icon>{iconPath}</Icon>}
          iconPos="start"
        >
          {btnText}
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
          variant="secondary"
          icon={<Icon alt={btnText}>{iconPath}</Icon>}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // @todo fix jestconfig to map ONLY CSS files to identity-obj-proxy to support Reach CSS check.
  // it("supports Reach Menu Button via #as", () => {
  //   const tree = renderer
  //     .create(
  //       // <Menu>
  //       <Button
  //         as={ReachMenuButton}
  //         data-testid="button-data-testid"
  //         ref={buttonRef}
  //       >
  //         {btnText}
  //       </Button>
  //       // </Menu>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
