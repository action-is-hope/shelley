import renderer from "react-test-renderer";
import Field from "../Field";

const fieldPropsTest = {
  "data-id": "field",
  label: "My field",
  labelProps: {
    id: "label-id",
    htmlFor: "test",
    data: "random",
  },
};

describe("Field", () => {
  it("Renders basic field", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest}>
          <input id="testField" type="text" aria-labelledby="label-id" />
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
