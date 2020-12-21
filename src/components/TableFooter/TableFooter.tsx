import React from "react";
import classnames from "classnames";
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
      <div
        className={st(classnames(classes.root, classNameProp))}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TableFooter.displayName = "TableFooter";

export default TableFooter;
