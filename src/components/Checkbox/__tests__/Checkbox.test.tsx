import { Checkbox } from "../Checkbox";
import renderer from "react-test-renderer";

describe("Checkbox", () => {
  it("renders correctly with label", () => {
    const tree = renderer.create(<Checkbox>Subscribe</Checkbox>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with size '1'", () => {
    const tree = renderer
      .create(<Checkbox size={1}>Subscribe</Checkbox>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '2'", () => {
    const tree = renderer
      .create(<Checkbox size={2}>Subscribe</Checkbox>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '3'", () => {
    const tree = renderer
      .create(<Checkbox size={3}>Subscribe</Checkbox>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '4'", () => {
    const tree = renderer
      .create(<Checkbox size={4}>Subscribe</Checkbox>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '5'", () => {
    const tree = renderer
      .create(<Checkbox size={6}>Subscribe</Checkbox>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
