import React from "react";
import ReactDOM from "react-dom";
import InputError from "../InputError";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<InputError />, div);
  ReactDOM.unmountComponentAtNode(div);
});
