// import React from "react";
import Button from "../../Button/Button";
import ButtonGroup from "../ButtonGroup";

import renderer from "react-test-renderer";

describe("ButtonGroup", () => {
  it("renders as a basic primary button group", () => {
    const tree = renderer
      .create(
        <ButtonGroup variant="primary">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders child buttons with style classes for #tone, #variant, #vol and #buttonClassName", () => {
    const tree = renderer
      .create(
        <ButtonGroup
          variant="secondary"
          tone={6}
          vol={6}
          buttonClassName="button-group-test"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders vertical button group", () => {
    const tree = renderer
      .create(
        <ButtonGroup variant="quiet" orientation="vertical" vol={1}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders button group with all buttons disabled", () => {
    const tree = renderer
      .create(
        <ButtonGroup disabled>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders buttons with correct style class if overridden", () => {
    const tree = renderer
      .create(
        <ButtonGroup tone={2} vol={4} buttonClassName="btn-group">
          <Button>One</Button>
          <Button tone={3} vol={5} className="btn-group-btn-override">
            Two
          </Button>
          <Button>Three</Button>
        </ButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders buttons with additional class name", () => {
    const tree = renderer
      .create(
        <ButtonGroup vol={4} buttonClassName="btn-group-group-applied">
          <Button>One</Button>
          <Button vol={5} className="btn-group-btn-item-applied">
            Two
          </Button>
          <Button>Three</Button>
        </ButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
