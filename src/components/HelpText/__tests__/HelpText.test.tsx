import renderer from "react-test-renderer";
import { HelpText } from "../HelpText";

const description = "Help text";
const errorMessage = "Error message";

describe("HelpText", () => {
  it("renders help text", () => {
    const tree = renderer
      .create(
        <HelpText
          className="custom-class"
          data-testid="help-text-id"
          description={description}
          errorMessage={errorMessage}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
