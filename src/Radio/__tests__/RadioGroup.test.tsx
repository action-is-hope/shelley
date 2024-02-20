import { Radio, RadioGroup } from "../";
import renderer from "react-test-renderer";
// useID breaks snapshots so using the SSrProvider.
import { SSRProvider } from "react-aria";

describe("Radio", () => {
  it("renders correctly with label", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1">One</Radio>
            <Radio value="test2">Two</Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as vertical", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group" orientation="vertical">
            <Radio value="test1">One</Radio>
            <Radio value="test2">Two</Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with size '1'", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1" size={1}>
              One
            </Radio>
            <Radio value="test2" size={1}>
              Two
            </Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '2'", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1" size={2}>
              One
            </Radio>
            <Radio value="test2" size={2}>
              Two
            </Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '3'", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1" size={3}>
              One
            </Radio>
            <Radio value="test2" size={3}>
              Two
            </Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '4'", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1" size={4}>
              One
            </Radio>
            <Radio value="test2" size={4}>
              Two
            </Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '5'", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1" size={5}>
              One
            </Radio>
            <Radio value="test2" size={5}>
              Two
            </Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '6'", () => {
    const tree = renderer
      .create(
        <SSRProvider>
          <RadioGroup label="Radio Group">
            <Radio value="test1" size={6}>
              One
            </Radio>
            <Radio value="test2" size={6}>
              Two
            </Radio>
          </RadioGroup>
        </SSRProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
