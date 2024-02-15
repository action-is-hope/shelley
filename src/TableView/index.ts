export { TableView } from "./TableView";
import { Column, Cell } from "@react-stately/table";
import type { ColumnProps, CellProps } from "@react-types/table";
import type { ComponentBase } from "../typings/shared-types";

export interface ShelleyColumnProps<T>
  extends Omit<ColumnProps<T>, "allowsResizing">,
    ComponentBase {
  /**
   * The alignment of the column's contents relative to its allotted width.
   * @default 'start'
   */
  align?: "start" | "center" | "end" | "justify";
  /** Custom className */
  className?: string;
}

// Override TS for Column to support Shelley specific props.
const ShelleyColumn = Column as <T>(
  props: ShelleyColumnProps<T>
) => JSX.Element;
export { ShelleyColumn as Column };

export interface ShelleyCellProps
  extends Omit<CellProps, "allowsResizing">,
    ComponentBase {
  /**
   * The alignment of the column's contents relative to its allotted width.
   * @default 'start'
   */
  align?: "start" | "center" | "end" | "justify";
  /** Custom className */
  className?: string;
  /** Hold the value of the column to be used in responsive tables. */
  ["data-column-value"]?: string;
}

// Override TS for Cell to support Shelley specific props.
const ShelleyCell = Cell as (props: ShelleyCellProps) => JSX.Element;
export { ShelleyCell as Cell };

// export { TableHeader, TableBody, Section, Row } from "@react-stately/table";
export { TableHeader, TableBody, Row } from "@react-stately/table";

export type {
  TableHeaderProps,
  TableBodyProps,
  RowProps,
} from "@react-types/table";
export type { TableViewProps } from "./TableView";
