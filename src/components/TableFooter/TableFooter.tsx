import React from "react";
import { st, classes } from "./tableFooter.st.css";

const TableFooter = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      ...rest
    }: React.HTMLAttributes<HTMLTableSectionElement>,
    ref?: React.Ref<HTMLTableSectionElement>
  ) => {
    return (
      <div className={st(classes.root, classNameProp)} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

TableFooter.displayName = "TableFooter";

export default TableFooter;
