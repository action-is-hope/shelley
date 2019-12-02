import React from "react";
import Button from "../Button";
import { render } from "@testing-library/react";

// You have to write data-testid
const ButtonTest = () => (
  <Button data-testid="button-text">Gatsby is awesome!</Button>
);
test("Displays the correct button text.", () => {
  const { getByTestId } = render(<ButtonTest />);
  // Assertion
  expect(getByTestId("button-text")).toHaveTextContent("Gatsby is awesome!");
  // --> Test will pass
});
