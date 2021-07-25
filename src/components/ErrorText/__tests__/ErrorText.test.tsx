// import React from "react";
// import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import ErrorText from "../ErrorText";

const errorMessage = "Error message";

describe("Error", () => {
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
