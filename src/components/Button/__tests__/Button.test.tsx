import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";

const buttonRef = React.createRef<HTMLButtonElement>();
// const onButtonClick = () => {
//   const node = buttonRef.current;
//   // `current` points to the mounted text input element
//   node && node.focus();
// };

// You have to write data-testid
const ButtonTest = () => (
  <Button data-testid="button-text" ref={buttonRef}>
    Gatsby is awesome!
  </Button>
);
test("Displays the correct button text.", () => {
  const { getByTestId } = render(<ButtonTest />);
  // Assertion
  expect(getByTestId("button-text")).toHaveTextContent("Gatsby is awesome!");
  // --> Test will pass
});
