import Checkbox from "../Checkbox";
import renderer from "react-test-renderer";

describe("Checkbox", () => {
  it("renders correctly with label", () => {
    const tree = renderer.create(<Checkbox>Subscribe</Checkbox>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom label", () => {
    const tree = renderer
      .create(
        <>
          <label id="test456" htmlFor="test123">
            Label
          </label>
          <Checkbox id="test123" aria-labelledby="test456" />
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
