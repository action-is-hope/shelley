import React from "react";
import { st, classes } from "./tablePagination.st.css";
import Text from "../Text/Text";
import Toolbar from "../Toolbar/Toolbar";

import AngleLeft from "../icons/AngleLeft";
import AngleRight from "../icons/AngleRight";
import Button, { ButtonProps } from "../Button/Button";

interface rowsPerPageOption {
  value: number;
  label: string;
  index: number;
}

type labelDisplayedRowsArgs = {
  from: number;
  to: number;
  count: number;
};
interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    requestedPage: number
  ) => void;
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

const TablePagination = React.forwardRef(
  (
    {
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
    }: TablePaginationProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const getLabelDisplayedRowsTo = () => {
      if (count === -1) return (currentPage + 1) * rowsPerPage;
      return rowsPerPage === -1
        ? count
        : Math.min(count, (currentPage + 1) * rowsPerPage);
    };

    // const handleFirstPageButtonClick = (
    //   event: React.MouseEvent<HTMLButtonElement>
    // ) => {
    //   onPageChange(event, 0);
    // };

    const handlePrevButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, currentPage - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, currentPage + 1);
    };

    // const handleLastPageButtonClick = (
    //   event: React.MouseEvent<HTMLButtonElement>
    // ) => {
    //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    // };

    return (
      <div
        className={st(classes.root, classNameProp)}
        data-testid={dataTestId}
        {...{ id, ref, ...rest }}
      >
        <Toolbar align="end">
          <Text
            as="span"
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
            as="span"
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
            tone={10}
            variant="fab"
            vol={3}
            iconPos={"end"}
            onClick={handlePrevButtonClick}
            disabled={currentPage === 0}
            {...prevIconButtonProps}
          >
            {iconPrev}
          </Button>
          <Button
            data-testid={dataTestId && `${dataTestId}NextButton`}
            tone={10}
            variant="fab"
            vol={3}
            iconPos={"end"}
            onClick={handleNextButtonClick}
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
        </Toolbar>
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";

export default TablePagination;
