import React from "react";
import ReactDOM from "react-dom";
import InputAdornment from "../InputAdornment";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<InputAdornment />, div);
  ReactDOM.unmountComponentAtNode(div);
});
