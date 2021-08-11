import React from "react";
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
        className={st(classes.root, { selected }, classNameProp)}
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
