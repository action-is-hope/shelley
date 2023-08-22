import renderer from "react-test-renderer";
import { SpeedDial } from "../SpeedDial";

jest.mock("../speedDial.st.css", () => {
  const originalSt: object = jest.requireActual("../speedDial.st.css");

  return {
    ...originalSt,
    st: () => {
      return `speedDial___mock`;
    },
  } as object;
});

describe("SpeedDial", () => {
  it("renders correctly when closed", () => {
    const tooltipTitleMock = "Tooltip Test";
    const childrenMock = <span>Child Content</span>;

    const tree = renderer
      .create(
        <SpeedDial tooltipTitle={tooltipTitleMock}>{childrenMock}</SpeedDial>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
