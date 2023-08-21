import { TooltipButton } from "../TooltipButton";
import renderer from "react-test-renderer";

const buttonPropsMock = {
  className: "test-button",
  children: "Click me!",
};

const tooltipText = "Tooltip info";

describe("TooltipButton", () => {
  it("renders without tooltip showing", () => {
    const tree = renderer
      .create(
        <TooltipButton buttonProps={buttonPropsMock} tooltip={tooltipText} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with tooltip showing", () => {
    const MockedTooltipButton = (props: any) => {
      const mockState = {
        isOpen: true,
        close: jest.fn(),
        open: jest.fn(),
      };

      return <TooltipButton {...props} state={mockState} />;
    };

    const tree = renderer
      .create(
        <MockedTooltipButton
          buttonProps={buttonPropsMock}
          tooltip={tooltipText}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
