import React from "react";
import { st, classes } from "./tableContainer.st.css";

export interface TableContainerProps
  extends React.HTMLAttributes<HTMLBaseElement> {
  as?: any;
}
const TableContainer = React.forwardRef(
  (
    { as, className: classNameProp, children, ...rest }: TableContainerProps,
    ref?: React.Ref<HTMLBaseElement>
  ) => {
    const Component = as || "div";
    return (
      <Component
        className={st(classes.root, classNameProp)}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

TableContainer.displayName = "TableContainer";

export default TableContainer;
