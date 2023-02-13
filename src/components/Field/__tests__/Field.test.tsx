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

const sampleField = (
  <input id="testField" type="text" aria-labelledby="label-id" />
);

describe("Field", () => {
  it("Renders default field as variant 'outlined', labelPosition 'over', volume '1'", () => {
    const tree = renderer
      .create(<Field {...fieldPropsTest}>{sampleField}</Field>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renderd as variant 'outlined'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} variant="outlined">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renderd as variant 'filled'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} variant="filled">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders as variant 'quiet'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} variant="quiet">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with no variant 'false'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} variant={false}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with labelPosition 'top'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} labelPosition="top">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with labelPosition 'side'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} labelPosition="side">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with labelPosition 'over'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} labelPosition="over">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with labelPosition 'hidden'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} labelPosition="hidden">
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with volume '1'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={1}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with volume '2'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={2}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with volume '3'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={3}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with volume '4'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={4}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with volume '5'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={5}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with volume '6'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={6}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with no volume 'undefined'", () => {
    const tree = renderer
      .create(
        <Field {...fieldPropsTest} vol={undefined}>
          {sampleField}
        </Field>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
