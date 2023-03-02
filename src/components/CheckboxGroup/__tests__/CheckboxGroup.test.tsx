import { CheckboxGroup } from "../CheckboxGroup";
import Checkbox from "../../Checkbox/Checkbox";
import renderer from "react-test-renderer";

describe("Checkbox", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <CheckboxGroup label="Field Label">
          <Checkbox value="cb1">Label1</Checkbox>
          <Checkbox value="cb2">Label2</Checkbox>
        </CheckboxGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom labelled checkboxes", () => {
    const tree = renderer
      .create(
        <CheckboxGroup label="Field Label">
          <label htmlFor="cb1">Label1</label>
          <Checkbox id="cb1" />
          <label htmlFor="cb2">Label2</label>
          <Checkbox id="cb2" />
        </CheckboxGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
