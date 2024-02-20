import React from "react";
import { Button, ButtonBase } from "../Button";
import renderer from "react-test-renderer";
import { Icon } from "../../Icon/Icon";
import { Router, Link } from "react-router-dom";
import { createMemoryHistory } from "history";

const buttonRef = React.createRef<HTMLButtonElement>();

const buttonRefAnchor = React.createRef<HTMLAnchorElement>();
const btnText = "Button text";
const iconPath = <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>;

describe("Button", () => {
  it("renders as a basic button with custom #className", () => {
    const tree = renderer
      .create(
        <Button
          data-id="button-data-id"
          className="button-class"
          ref={buttonRef}
        >
          {btnText}
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with stylable state prop classes, #tone, #variant, #vol and #fullwidth", () => {
    const tree = renderer
      .create(
        <Button
          data-id="button-data-id"
          ref={buttonRef}
          tone="danger"
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
        <ButtonBase
          data-id="button-data-id"
          href="http://shelley.earth"
          elementType="a"
          className="button-class"
        >
          {btnText}
        </ButtonBase>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as third party (react-router) anchor provided via #elementType and #to props", () => {
    const memHistory = createMemoryHistory();
    const tree = renderer
      .create(
        <Router history={memHistory}>
          <Button
            elementType={Link}
            data-id="button-data-id"
            to="internal-link"
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
          data-id="button-data-id"
          ref={buttonRef}
          icon={
            <Icon
              // https://github.com/svg/svgo/issues/1011 Still best practice for buttons?
              focusable="false"
            >
              {iconPath}
            </Icon>
          }
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
          data-id="button-data-id"
          ref={buttonRef}
          variant="secondary"
          aria-label={btnText}
          icon={
            <Icon
              // https://github.com/svg/svgo/issues/1011 Still best practice?
              focusable="false"
            >
              {iconPath}
            </Icon>
          }
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
