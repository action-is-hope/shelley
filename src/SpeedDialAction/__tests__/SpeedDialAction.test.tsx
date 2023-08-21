import renderer from "react-test-renderer";
import { SpeedDialAction } from "../SpeedDialAction";

describe("SpeedDialAction", () => {
  it("renders correctly", () => {
    const tooltipTitleMock = "Tooltip Test";
    const iconMock = <span>Test Icon</span>;
    const tree = renderer
      .create(
        <SpeedDialAction
          tooltipTitle={tooltipTitleMock}
          icon={iconMock}
          onMouseDown={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
