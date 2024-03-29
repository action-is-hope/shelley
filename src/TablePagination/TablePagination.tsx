import React, { forwardRef } from "react";
import { st, classes } from "./tablePagination.st.css";
import { Text } from "../Text";
import { AppBar } from "../AppBar";
import AngleLeft from "../icons/AngleLeft";
import AngleRight from "../icons/AngleRight";
import { Button, ButtonProps } from "../Button";
import type { PressEvent } from "react-aria";

export interface rowsPerPageOption {
  value: number;
  label: string;
  index: number;
}

export type labelDisplayedRowsArgs = {
  from: number;
  to: number;
  count: number;
};
export interface TablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  count: number;
  currentPage: number;
  onRowsPerPageChange: (value: string) => void;
  rowsPerPage: number;
  rowsPerPageOptions: Array<any | rowsPerPageOption>;
  labelRowsPerPage?: string;
  labelDisplayedRows?: (args: labelDisplayedRowsArgs) => React.ReactNode;
  "data-testid"?: string;
  iconPrev?: React.ReactNode;
  iconNext?: React.ReactNode;
  onPageChange: (event: PressEvent, requestedPage: number) => void;
  prevIconButtonProps?: ButtonProps;
  nextIconButtonProps?: ButtonProps;
}

const defaultLabelDisplayedRows = ({
  from,
  to,
  count,
}: labelDisplayedRowsArgs) => {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
};

function TablePagination(
  props: TablePaginationProps,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    className: classNameProp,
    children,
    // ActionsComponent = TablePaginationActions,
    count,
    iconPrev = <AngleLeft alt="Previous" />,
    iconNext = <AngleRight alt="Next" />,
    id = "tablePagination",
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = "Rows per page:",
    nextIconButtonProps,
    onPageChange,
    "data-testid": dataTestId,
    currentPage,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    onRowsPerPageChange,
    prevIconButtonProps,
    // showFirstButton = false,
    // showLastButton = false,
    ...rest
  } = props;

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) return (currentPage + 1) * rowsPerPage;
    return rowsPerPage === -1
      ? count
      : Math.min(count, (currentPage + 1) * rowsPerPage);
  };

  // const handleFirstPageButtonPress = (
  //   event: PressEvent
  // ) => {
  //   onPageChange(event, 0);
  // };

  const handlePrevButtonPress = (event: PressEvent) => {
    onPageChange(event, currentPage - 1);
  };

  const handleNextButtonPress = (event: PressEvent) => {
    onPageChange(event, currentPage + 1);
  };

  // const handleLastPageButtonPress = (
  //   event: PressEvent
  // ) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  return (
    <div
      className={st(classes.root, classNameProp)}
      data-testid={dataTestId}
      {...{ id, ref, ...rest }}
    >
      <AppBar align="end">
        <Text
          elementType="span"
          data-testid={dataTestId && `${dataTestId}RowsButtonLabel`}
          id={`${id}RowsButtonLabel`}
          vol={1}
        >
          {labelRowsPerPage}
        </Text>
        {/* <Menu>
            <MenuButton
              variant={3}
              tone={10}
              vol={4}
              data-testid={dataTestId && `${dataTestId}RowsMenuButton`}
              aria-labelledby={`${id}RowsButtonLabel`}
            >
              {rowsPerPage} <span aria-hidden>▾</span>
            </MenuButton>
            <MenuList>
              {rowsPerPageOptions.map(
                (rowsPerPageOption: rowsPerPageOption) => (
                  <MenuItem
                    key={
                      rowsPerPageOption.value
                        ? `${rowsPerPageOption.value}`
                        : `${rowsPerPageOption}`
                    }
                    onSelect={() =>
                      onRowsPerPageChange(
                        rowsPerPageOption.value
                          ? `${rowsPerPageOption.value}`
                          : `${rowsPerPageOption}`
                      )
                    }
                  >
                    {rowsPerPageOption.label
                      ? rowsPerPageOption.label
                      : rowsPerPageOption}
                  </MenuItem>
                )
              )}
            </MenuList>
          </Menu> */}
        <Text
          elementType="span"
          data-testid={dataTestId && `${dataTestId}labelDisplayedRows`}
          vol={1}
        >
          {labelDisplayedRows({
            from: count === 0 ? 0 : currentPage * rowsPerPage + 1,
            to: getLabelDisplayedRowsTo(),
            count: count === -1 ? -1 : count,
            // currentPage
          })}
        </Text>

        {/* {showFirstButton && ()} */}
        <Button
          data-testid={dataTestId && `${dataTestId}PrevButton`}
          tone="contrast"
          variant="fab"
          vol={3}
          iconPos={"end"}
          onPress={handlePrevButtonPress}
          disabled={currentPage === 0}
          {...prevIconButtonProps}
        >
          {iconPrev}
        </Button>
        <Button
          data-testid={dataTestId && `${dataTestId}NextButton`}
          tone="contrast"
          variant="fab"
          vol={3}
          iconPos={"end"}
          onPress={handleNextButtonPress}
          disabled={
            count !== -1
              ? currentPage >= Math.ceil(count / rowsPerPage) - 1
              : false
          }
          {...nextIconButtonProps}
        >
          {iconNext}
        </Button>
        {/* {showLastButton && ()} */}
      </AppBar>
    </div>
  );
}
TablePagination.displayName = "TablePagination";

/**
 * @todo TablePaginations - needs refactor.
 */
const _TablePagination = forwardRef(TablePagination);
export { _TablePagination as TablePagination };
