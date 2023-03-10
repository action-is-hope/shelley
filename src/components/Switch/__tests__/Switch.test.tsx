import { Switch } from "../Switch";
import renderer from "react-test-renderer";

describe("Switch", () => {
  it("renders correctly with label", () => {
    const tree = renderer.create(<Switch>Label</Switch>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom label", () => {
    const tree = renderer
      .create(
        <>
          <label htmlFor="test123"></label>
          <Switch id="test123" />
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
