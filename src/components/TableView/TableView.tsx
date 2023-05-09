import {
  AriaTableProps,
  GridRowProps,
  mergeProps,
  useFocusRing,
  useHover,
  useTable,
  useTableRowGroup,
  useTableHeaderRow,
  useTableColumnHeader,
  useTableRow,
  useTableCell,
  useTableSelectionCheckbox,
  useTableSelectAllCheckbox,
} from "react-aria";
import type { GridNode } from "@react-types/grid";
import Checkbox from "../Checkbox/Checkbox";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

import {
  TableState,
  useTableState,
  TableStateProps,
} from "@react-stately/table";
import { Key, useRef, forwardRef, HTMLProps } from "react";
import { st, classes } from "./tableView.st.css";
import type { ComponentBase } from "../types";

import type { Node } from "@react-types/shared";
import { mergeRefs } from "@react-aria/utils";

export interface TableViewProps<T>
  extends AriaTableProps<T>,
    TableStateProps<T>,
    Omit<React.HTMLProps<HTMLTableElement>, "children">,
    ComponentBase {}

function TableView<T extends object>(
  props: TableViewProps<T>,
  ref: React.Ref<HTMLTableElement>
) {
  const {
    selectionMode = "none",
    selectionBehavior = "toggle",
    className: classNameProp,
    onRowAction: onAction,
  } = props;
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  const localRef = useRef(null);
  const { collection } = state;
  const { gridProps } = useTable(props, state, localRef);

  return (
    <div className={st(classes.root, { isHeaderSticky: true }, classNameProp)}>
      <div
        className={st(classes.table)}
        {...gridProps}
        ref={ref ? mergeRefs(ref, localRef) : localRef}
      >
        <TableRowGroup type="thead" className={classes.thead}>
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
              {/* https://github.com/adobe/react-spectrum/discussions/4348 */}
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
        <TableRowGroup type="tbody" className={classes.tbody}>
          {/* https://github.com/adobe/react-spectrum/discussions/4348 */}
          {[...collection.body.childNodes].map((row) => (
            <TableRow
              key={row.key}
              item={row}
              state={state}
              hasActions={onAction}
            >
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
      </div>
    </div>
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
interface TableRowGroupProps extends ComponentBase, HTMLProps<HTMLElement> {}

function TableRowGroup({ children, className }: TableRowGroupProps) {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <div {...rowGroupProps} className={className}>
      {children}
    </div>
  );
}

/**
 * TableHeaderRow
 */
interface TableHeaderRowProps<T>
  extends Partial<GridRowProps<T>>,
    ComponentBase,
    HTMLProps<HTMLTableRowElement> {
  state: TableState<T>;
  item: GridNode<unknown>;
}

function TableHeaderRow<T extends object>({
  item,
  state,
  children,
}: TableHeaderRowProps<T>) {
  const ref = useRef(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);
  return (
    <div {...rowProps} className={classes.headerRow} ref={ref}>
      {children}
    </div>
  );
}

/**
 * TableHeaderRow
 */
interface TableColumnHeaderProps<T>
  extends ComponentBase,
    HTMLProps<HTMLTableCellElement> {
  state: TableState<T>;
  column: GridNode<unknown>;
}

function TableColumnHeader<T extends object>({
  column,
  state,
}: TableColumnHeaderProps<T>) {
  const ref = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";
  const align = column?.props?.align || "start";

  return (
    <div
      {...mergeProps(columnHeaderProps, focusProps)}
      // colSpan={column?.colspan}
      className={st(
        classes.column,
        {
          isFocusVisible,
          align: column?.colspan
            ? column?.colspan > 1
              ? "center"
              : align
            : align,
        },
        column?.props?.className
      )}
      data-id={column?.props?.["data-id"]}
      ref={ref}
    >
      {column?.rendered}
      {column?.props.allowsSorting && (
        <span
          aria-hidden="true"
          className={classes.sorter}
          style={{
            visibility:
              state.sortDescriptor?.column === column.key
                ? "visible"
                : "hidden",
          }}
        >
          {arrowIcon}
        </span>
      )}
    </div>
  );
}

/**
 * TableRow
 */

interface TableRowProps<T>
  extends Partial<GridRowProps<T>>,
    ComponentBase,
    HTMLProps<HTMLTableCellElement> {
  state: TableState<T>;
  hasActions?: (key: Key) => void;
  item: Node<T>;
}

function TableRow<T extends object>({
  item,
  children,
  state,
  hasActions,
}: TableRowProps<T>) {
  const ref = useRef(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  const allowsInteraction =
    state.selectionManager.selectionMode !== "none" || hasActions;
  const isDisabled = !allowsInteraction || state.disabledKeys.has(item.key);

  const { hoverProps, isHovered } = useHover({ isDisabled });

  return (
    <div
      className={st(classes.row, {
        isFocusVisible,
        isSelected,
        isPressed,
        isHovered,
      })}
      {...mergeProps(rowProps, focusProps, hoverProps)}
      ref={ref}
    >
      {children}
    </div>
  );
}

/**
 * TableCell
 */

interface TableCellProps<T> extends ComponentBase {
  state: TableState<T>;
  cell: GridNode<T>;
}
function TableCell<T extends object>({ cell, state }: TableCellProps<T>) {
  const ref = useRef(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  console.log("cell", cell?.column?.props?.align);
  return (
    <div
      {...mergeProps(gridCellProps, focusProps)}
      className={st(
        classes.cell,
        {
          isFocusVisible,
          // align: cell?.props?.align,
          align: cell?.props?.align || cell?.column?.props?.align,
        },
        cell?.props?.className
      )}
      data-id={cell?.props?.["data-id"]}
      data-column-value={cell.props?.["data-column-value"]}
      ref={ref}
    >
      {cell.rendered}
    </div>
  );
}

/**
 * TableCheckboxCell
 */

interface TableCheckboxCellProps<T>
  extends ComponentBase,
    HTMLProps<HTMLTableCellElement> {
  state: TableState<T>;
  cell: Node<T>;
}

function TableCheckboxCell<T extends object>({
  cell,
  state,
}: TableCheckboxCellProps<T>) {
  const ref = useRef(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey || 0 },
    state
  );

  return (
    <div
      {...gridCellProps}
      className={st(classes.cell, {
        hasCheckbox: true,
      })}
      ref={ref}
    >
      <Checkbox {...checkboxProps} className={classes.cellCheckbox} />
    </div>
  );
}

/**
 * TableSelectAllCell
 */

interface TableSelectAllCellProps<T>
  extends ComponentBase,
    HTMLProps<HTMLTableCellElement> {
  state: TableState<T>;
  column: GridNode<unknown>;
}
function TableSelectAllCell<T extends object>({
  column,
  state,
}: TableSelectAllCellProps<T>) {
  const ref = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <div
      {...columnHeaderProps}
      className={st(classes.column, {
        hasCheckbox: true,
      })}
      ref={ref}
    >
      {state.selectionManager.selectionMode === "single" ? (
        <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} className={classes.columnCheckbox} />
      )}
    </div>
  );
}
