import {
  mergeProps,
  useFocusRing,
  useTable,
  useTableRowGroup,
  useTableHeaderRow,
  AriaTableProps,
  GridRowProps,
} from "react-aria";
import { GridNode } from "@react-types/grid";

import { Cell, Column, Row, TableBody, TableHeader } from "react-stately";

import {
  TableState,
  TableColumnResizeState,
  useTableState,
} from "@react-stately/table";
import { useRef, forwardRef, HTMLProps } from "react";
import type { ColumnSize, TableProps } from "@react-types/table";
import { st, classes } from "./actionButton.st.css";
import type { ComponentBase } from "../types";

export interface TableViewProps<T> extends AriaTableProps<T>, ComponentBase {
  selectionMode?: "none" | "single" | "multiple";
  selectionBehavior?: "replace" | "toggle";
}

function TableView<T extends object>(
  props: TableViewProps<T>
  // ref: React.Ref<HTMLButtonElement>
) {
  const { selectionMode = "none", selectionBehavior = "toggle" } = props;
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  const ref = useRef(null);
  const { collection } = state;
  const { gridProps } = useTable(props, state, ref);

  return (
    <table {...gridProps} ref={ref} style={{ borderCollapse: "collapse" }}>
      <TableRowGroup type="thead">
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <TableSelectAllCell
                  key={column.key}
                  column={column}
                  state={state}
                />
              ) : (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  state={state}
                />
              )
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...collection.body.childNodes].map((row) => (
          <TableRow key={row.key} item={row} state={state}>
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <TableCell key={cell.key} cell={cell} state={state} />
              )
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}

/**
 * Tables are containers for displaying information. They allow users to quickly
 * scan, sort, compare, and take action on large amounts of data.
 */
const _TableView = forwardRef(TableView);
export { _TableView as TableView };

/**
 * TableRowGroup
 */
export interface TableRowGroupProps
  extends ComponentBase,
    Omit<HTMLProps<HTMLElement>, "type"> {
  type: React.ElementType;
}

function TableRowGroup({ type: Element, children }: TableRowGroupProps) {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element
      {...rowGroupProps}
      style={
        Element === "thead"
          ? { borderBottom: "2px solid var(--spectrum-global-color-gray-800)" }
          : null
      }
    >
      {children}
    </Element>
  );
}

/**
 * TableHeaderRow
 */
export interface TableHeaderRow<T>
  extends GridRowProps<T>,
    ComponentBase,
    Omit<HTMLProps<HTMLTableRowElement>, "type"> {
  type: React.ElementType;
  state: TableState<T>;
  item: GridNode<unknown>;
}

function TableHeaderRow<T extends object>({
  item,
  state,
  children,
}: TableHeaderRow<T>) {
  const ref = useRef(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}
