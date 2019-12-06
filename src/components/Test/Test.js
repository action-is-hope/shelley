/** Button.tsx Button component */
import React, { ReactNode } from "react";

const Test = ({ children, className, ...rest }) => {
  return (
    <button className={className} {...rest}>
      <span className="test">{children}</span>
    </button>
  );
};
export default Test;
