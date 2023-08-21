import { Tooltip } from "../Tooltip";
import renderer from "react-test-renderer";

const tooltipText = "Tooltip text";
const tooltipStateMock = {
  isOpen: false,
  close: jest.fn(),
  open: jest.fn(),
};

describe("Tooltip", () => {
  it("renders with given text", () => {
    const tree = renderer
      .create(
        <Tooltip state={tooltipStateMock} id="test-tooltip">
          {tooltipText}
        </Tooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with custom state", () => {
    const customState = {
      ...tooltipStateMock,
      isOpen: true,
    };
    const tree = renderer
      .create(
        <Tooltip state={customState} id="test-tooltip-open">
          {tooltipText}
        </Tooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
