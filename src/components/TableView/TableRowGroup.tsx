import {
  mergeProps,
  useFocusRing,
  useTable,
  useTableRowGroup,
} from "react-aria";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  useTableState,
} from "react-stately";
import { useRef, forwardRef } from "react";
import type { ColumnSize, TableProps } from "@react-types/table";
import { st, classes } from "./actionButton.st.css";
import type { ComponentBase } from "../types";

export interface TableViewProps<T> extends TableProps<T>, ComponentBase {
  selectionMode?: "none" | "single" | "multiple";
  selectionBehavior?: "replace" | "toggle";
}

function TableView<T extends object>(
  props: TableViewProps<T>,
  ref: React.Ref<HTMLButtonElement>
) {
  const { selectionMode = "none", selectionBehavior = "toggle" } = props;
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  const ref = useRef();
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
 * TableViews allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _TableView = forwardRef(TableView);
export { _TableView as TableView };

function TableRowGroup({ type: Element, children }) {
  let { rowGroupProps } = useTableRowGroup();
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
