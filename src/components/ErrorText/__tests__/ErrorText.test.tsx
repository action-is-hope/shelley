// import React from "react";
import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import ErrorText from "../ErrorText";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorText />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const errorMessage = "Error message";

describe("Button", () => {
  it("renders as a basic button with custom #className", () => {
    const tree = renderer
      .create(
        <ErrorText className="custom-class" data-testid="error-data-testid">
          {errorMessage}
        </ErrorText>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
