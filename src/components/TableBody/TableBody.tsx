import React from "react";
import classnames from "classnames";
import { st, classes } from "./tableBody.st.css";

const TableBody = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      ...rest
    }: React.HTMLAttributes<HTMLTableSectionElement>,
    ref?: React.Ref<HTMLTableSectionElement>
  ) => {
    return (
      <tbody
        className={st(classnames(classes.root, classNameProp))}
        ref={ref}
        {...rest}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

export default TableBody;
