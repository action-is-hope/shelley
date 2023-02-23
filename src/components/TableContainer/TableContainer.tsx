import React from "react";
import { st, classes } from "./tableContainer.st.css";

const TableContainer = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      ...rest
    }: React.HTMLAttributes<HTMLDivElement>,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div className={st(classes.root, classNameProp)} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

TableContainer.displayName = "TableContainer";

export default TableContainer;
