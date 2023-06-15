import { Icon } from "../Icon";
import renderer from "react-test-renderer";

describe("Icons", () => {
  test("Vaadin icon", () => {
    const tree1 = renderer
      .create(
        <Icon aria-label="Vaadin icon example" style={{ fontSize: "2em" }}>
          <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
        </Icon>
      )
      .toJSON();
    expect(tree1).toMatchSnapshot();
  });
  test("Material icon", () => {
    const tree2 = renderer
      .create(
        <Icon
          aria-label="Material icon example"
          style={{ fontSize: "2em" }}
          viewBox="0 0 24 24"
        >
          <path d="M17 1.01 7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path>
        </Icon>
      )
      .toJSON();
    expect(tree2).toMatchSnapshot();
  });
  test("Majesticons icon", () => {
    const tree3 = renderer
      .create(
        <Icon
          aria-label="Majesticons icon example"
          style={{ fontSize: "2em", fill: "none" }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 19V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9 6.001V6m0 3.001V9m3 .001V9m0-2.999V6m3 .001V6m0 3.001V9m-6 3.001V12m3 .001V12"
          ></path>
        </Icon>
      )
      .toJSON();
    expect(tree3).toMatchSnapshot();
  });
});
