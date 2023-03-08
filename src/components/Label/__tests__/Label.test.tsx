import Label from "../Label";
import renderer from "react-test-renderer";

describe("Label", () => {
  it("renders as a basic label with custom #className", () => {
    const tree = renderer
      .create(
        <Label data-id="label-data-id" className="custom-classname">
          Label text
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an input correctly", () => {
    const tree = renderer
      .create(
        <Label
          htmlFor="field-id"
          inputControl={<input type="checkbox" id="field-id" />}
        >
          Label text with input
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders label position class 'start'", () => {
    const tree = renderer
      .create(
        <Label
          htmlFor="field-id"
          inputControl={<input type="checkbox" id="field-id" />}
          inputPosition="start"
        >
          Label text - start
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders label position class 'end'", () => {
    const tree = renderer
      .create(
        <Label
          htmlFor="field-id"
          inputControl={<input type="checkbox" id="field-id" />}
          inputPosition="end"
        >
          Label text - end
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders label position class 'top'", () => {
    const tree = renderer
      .create(
        <Label
          htmlFor="field-id"
          inputControl={<input type="checkbox" id="field-id" />}
          inputPosition="top"
        >
          Label text - top
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders label position class 'bottom'", () => {
    const tree = renderer
      .create(
        <Label
          htmlFor="field-id"
          inputControl={<input type="checkbox" id="field-id" />}
          inputPosition="bottom"
        >
          Label text - bottom
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders hidden label", () => {
    const tree = renderer
      .create(
        <Label
          htmlFor="field-id"
          inputControl={<input type="checkbox" id="field-id" />}
          visuallyHidden
        >
          Label text - hidden
        </Label>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
