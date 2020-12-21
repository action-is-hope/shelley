import React from "react";
import classnames from "classnames";
import { Volume, TextAlign } from "../types";
import { st, classes } from "./tableCell.st.css";

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  align?: TextAlign;
  /** Type of cell, set true for table header <th>. */
  header?: boolean;
  /** Set scope attribute. */
  scope?: string;
  /** Defines volumne/size. */
  vol?: Volume;
}
const TableCell = React.forwardRef(
  (
    {
      align = "start",
      children,
      className: classNameProp,
      header = false,
      scope: scopeProp,
      vol = 3,
      ...rest
    }: TableCellProps,
    ref?: React.Ref<HTMLTableCellElement>
  ) => {
    const Component = header ? "th" : "td";
    const scope = header && !scopeProp ? "col" : scopeProp;
    return (
      <Component
        className={st(classnames(classes.root, classNameProp), { vol, align })}
        scope={scope}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

TableCell.displayName = "TableCell";

export default TableCell;
