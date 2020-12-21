import React from "react";
import classnames from "classnames";
import { st, classes } from "./tablePagination.st.css";
import Text from "../Text/Text";

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover
} from "../Menu/Menu";
import Toolbar from "../Toolbar/Toolbar";

interface rowsPerPageOption {
  value: number;
  label: string;
  index: number;
}

interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  onRowsPerPageChange: () => void;
  rowsPerPage: number;
  rowsPerPageOptions: Array<any | rowsPerPageOption>;
}
const TablePagination = React.forwardRef(
  (
    {
      className: classNameProp,
      children,

      // ActionsComponent = TablePaginationActions,
      // backIconButtonProps,
      // colSpan: colSpanProp,
      // component: Component = TableCell,
      // count,
      // getItemAriaLabel = defaultGetAriaLabel,
      // labelDisplayedRows = defaultLabelDisplayedRows,
      // labelRowsPerPage = 'Rows per page:',
      // nextIconButtonProps,
      // onPageChange,
      // onRowsPerPageChange,
      // page,
      rowsPerPage,
      rowsPerPageOptions = [10, 25, 50, 100],
      onRowsPerPageChange,
      // SelectProps = {},
      // showFirstButton = false,
      // showLastButton = false,

      ...rest
    }: TablePaginationProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    // if (Component === TableCell || Component === 'td') {
    //   colSpan = colSpanProp || 1000; // col-span over everything
    // }

    // const selectId = useId(SelectProps.id);
    // const labelId = useId(SelectProps.labelId);
    // const MenuItemComponent = SelectProps.native ? 'option' : MenuItem;

    // const getLabelDisplayedRowsTo = () => {
    //   if (count === -1) return (page + 1) * rowsPerPage;
    //   return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
    // };

    return (
      <div
        className={st(classnames(classes.root, classNameProp), {})}
        {...rest}
        ref={ref}
      >
        <Toolbar>
          <Text as="span" vol={1}>
            Rows per page:
          </Text>
          <Menu>
            <MenuButton variant={3} tone={10} vol={4}>
              {rowsPerPage} ▾
            </MenuButton>
            <MenuList>
              {rowsPerPageOptions.map(
                (rowsPerPageOption: rowsPerPageOption) => (
                  <MenuItem
                    className={classes.menuItem}
                    key={
                      `${rowsPerPageOption.value}`
                        ? `${rowsPerPageOption.value}`
                        : `${rowsPerPageOption}`
                    }
                    onSelect={onRowsPerPageChange}
                    // value={
                    //   rowsPerPageOption.value
                    //     ? rowsPerPageOption.value
                    //     : rowsPerPageOption
                    // }
                  >
                    {rowsPerPageOption.label
                      ? rowsPerPageOption.label
                      : rowsPerPageOption}
                  </MenuItem>
                )
              )}
            </MenuList>
          </Menu>
          {children}
        </Toolbar>
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";

export default TablePagination;

// <Component className={clsx(classes.root, className)} colSpan={colSpan} ref={ref} {...other}>
// <Toolbar className={classes.toolbar}>
//   <div className={classes.spacer} />
//   {rowsPerPageOptions.length > 1 && (
//     <Typography color="inherit" variant="body2" className={classes.caption} id={labelId}>
//       {labelRowsPerPage}
//     </Typography>
//   )}

//   {rowsPerPageOptions.length > 1 && (
//     <Select
//       classes={{
//         select: classes.select,
//         icon: classes.selectIcon,
//       }}
//       input={<InputBase className={clsx(classes.input, classes.selectRoot)} />}
//       value={rowsPerPage}
//       onChange={onRowsPerPageChange}
//       id={selectId}
//       labelId={labelId}
//       {...SelectProps}
//     >
// {rowsPerPageOptions.map((rowsPerPageOption) => (
//   <MenuItemComponent
//     className={classes.menuItem}
//     key={rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption}
//     value={rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption}
//   >
//     {rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption}
//   </MenuItemComponent>
// ))}
//     </Select>
//   )}

//   <Typography color="inherit" variant="body2" className={classes.caption}>
//     {labelDisplayedRows({
//       from: count === 0 ? 0 : page * rowsPerPage + 1,
//       to: getLabelDisplayedRowsTo(),
//       count: count === -1 ? -1 : count,
//       page,
//     })}
//   </Typography>
//   <ActionsComponent
//     className={classes.actions}
//     backIconButtonProps={backIconButtonProps}
//     count={count}
//     nextIconButtonProps={nextIconButtonProps}
//     onPageChange={onPageChange}
//     page={page}
//     rowsPerPage={rowsPerPage}
//     showFirstButton={showFirstButton}
//     showLastButton={showLastButton}
//     getItemAriaLabel={getItemAriaLabel}
//   />
// </Toolbar>
// </Component>
