import { Switch } from "../Switch";
import renderer from "react-test-renderer";

describe("Switch", () => {
  it("renders correctly with label", () => {
    const tree = renderer.create(<Switch>Label</Switch>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders with size '1'", () => {
    const tree = renderer
      .create(<Switch size={1}>Switch label</Switch>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '2'", () => {
    const tree = renderer
      .create(<Switch size={2}>Switch label</Switch>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '3'", () => {
    const tree = renderer
      .create(<Switch size={3}>Switch label</Switch>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '4'", () => {
    const tree = renderer
      .create(<Switch size={4}>Switch label</Switch>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Renders with size '5'", () => {
    const tree = renderer
      .create(<Switch size={6}>Switch label</Switch>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
