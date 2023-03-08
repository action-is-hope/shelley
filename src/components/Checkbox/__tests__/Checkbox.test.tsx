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
          <label htmlFor="test123"></label>
          <Checkbox id="test123" />
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
