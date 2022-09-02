import React from "react";
import type { Volume, TextAlign } from "../types";
import { st, classes } from "./tableCell.st.css";

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: TextAlign;
  /** Type of cell, set true for table header <th>. */
  header?: boolean;
  /** Set scope attribute. */
  scope?: string;
  /** Defines volumne/size. */
  vol?: Volume;
  padding?: "standard" | "none" | "checkbox";
  sortDirection?: "ascending" | "descending" | false;
}
const TableCell = React.forwardRef(
  (
    {
      align = "start",
      padding = "standard",
      children,
      className: classNameProp,
      header = false,
      scope: scopeProp,
      sortDirection,
      vol = 3,
      ...rest
    }: TableCellProps,
    ref?: React.Ref<HTMLTableCellElement>
  ) => {
    const Component = header ? "th" : "td";
    const scope = header && !scopeProp ? "col" : scopeProp;
    return (
      <Component
        className={st(classes.root, { vol, align, padding }, classNameProp)}
        scope={scope}
        ref={ref}
        aria-sort={sortDirection || undefined}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

TableCell.displayName = "TableCell";

export default TableCell;
