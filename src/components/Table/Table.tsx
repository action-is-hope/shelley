import React from "react";
import classnames from "classnames";
import { Variant, Volume } from "../types";
import { st, classes } from "./table.st.css";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Variant index, defines the 'look'. */
  variant?: Variant;
  /** Defines volumne/size. */
  vol?: Volume;
}
const Table = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      variant = 1,
      vol = 3,
      ...rest
    }: TableProps,
    ref?: React.Ref<HTMLTableElement>
  ) => {
    return (
      <table
        className={st(classnames(classes.root, classNameProp), {
          variant,
          vol
        })}
        ref={ref}
        {...rest}
      >
        {children}
      </table>
    );
  }
);

Table.displayName = "Table";

export default Table;
