import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";

// You have to write data-testid
const ButtonTest = () => (
  <Button data-testid="hero-title">Gatsby is awesome!</Button>
);
test("Displays the correct title", () => {
  const { getByTestId } = render(<ButtonTest />);
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!");
  // --> Test will pass
});
// import React from "react";
// import renderer from "react-test-renderer";
// import Button from "../Button";
// describe("Button", () => {
//   it("renders correctly", () => {
//     const tree = renderer
//       .create(<Button data-testid="hero-title">Gatsby is awesome!</Button>)
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// import React from "react";
// import ReactDOM from "react-dom";
// import Button from "../Button";
// import { Theme as defaultTheme } from "../../../themes/default/";

// You have to write data-testid

// test("Displays the correct title", () => {
//   const { getByTestId } = render(
//     <Button data-testid="hero-title">Gatsby is awesome!</Button>
//   );
//   // Assertion
//   expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!");
//   // --> Test will pass
// });

// it("renders without crashing with props", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(
//     <div className={defaultTheme}>
//       <Button className="test">Text</Button>
//     </div>,
//     div
//   );
//   ReactDOM.unmountComponentAtNode(div);
// });

// it("should render text", () => {
//   const div = document.createElement("div");
//   const text = "hello";
//   ReactDOM.render(<Button type="hollow" children={text} />, div);
//   expect(div.getElementsByTagName("button")[0].textContent).toBe(text);
//   ReactDOM.unmountComponentAtNode(div);
// });

// it("should render sm size class", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Button children="Text" size="sm" />, div);
//   const el = div.getElementsByTagName("button")[0].className.includes("--sm");
//   expect(el).toBeTruthy();
// });
