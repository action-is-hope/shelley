import { CheckboxGroup } from "../";
import { Checkbox } from "../Checkbox";
import renderer from "react-test-renderer";
// useID breaks snapshots so using the SSrProvider.
import { SSRProvider } from "react-aria";

describe("Checkbox", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <CheckboxGroup id="cbg1" label="Field Label">
            <Checkbox id="cb1" value="cb1">
              Label1
            </Checkbox>
            <Checkbox id="cb2" value="cb2">
              Label2
            </Checkbox>
          </CheckboxGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom labelled checkboxes", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <CheckboxGroup id="cbg1" label="Field Label">
            <label htmlFor="cb1" id="lb1">
              Label1
            </label>
            <Checkbox id="cb1" value="cb1" aria-labelledby="lb1" />
            <label htmlFor="cb2" id="lb2">
              Label2
            </label>
            <Checkbox id="cb2" value="cb2" aria-labelledby="lb2" />
          </CheckboxGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
