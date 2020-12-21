import React from "react";
import classnames from "classnames";
import { st, classes } from "./tableRow.st.css";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Defines volumne/size. */
  selected?: boolean;
}
const TableRow = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      selected = false,
      ...rest
    }: TableRowProps,
    ref?: React.Ref<HTMLTableRowElement>
  ) => {
    return (
      <tr
        className={st(classnames(classes.root, classNameProp), { selected })}
        ref={ref}
        {...rest}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

export default TableRow;
