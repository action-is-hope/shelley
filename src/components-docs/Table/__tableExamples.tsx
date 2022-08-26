/* __table  Examples.tsx */
import type React from "react";

import CodeSample from "../../components-site/CodeSample/CodeSample";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputSelection,
} from "../../indexLib";

import { classes as grid } from "../../styles/default/grid.st.css";

export const meta = {
  name: "Table",
};

export const QuickRef: React.VFC = () => (
  <CodeSample className={grid.mid}>{`import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination } from "@actionishope/shelley";\n
TODO`}</CodeSample>
);

export const ComponentHTML: React.VFC = () => (
  <CodeSample language="html">{`TBC`}</CodeSample>
);

export const ComponentCSS = () => <CodeSample fixedHeight>{`TBC`}</CodeSample>;

export const Example1 = () => {
  const createData = (
    id: string,
    name: string,
    topSpeed: number,
    maxLength: number,
    maxWeight: number,
    lifeSpan: number
  ) => {
    return { id, name, topSpeed, maxLength, maxWeight, lifeSpan };
  };

  const rows = [
    createData("1-1", "Red Fox", 48, 0.9, 11, 14),
    createData("1-2", "Artic Fox", 40, 0.6, 8, 12),
    createData("1-3", "Grey Wolf", 70, 1.6, 80, 20),
    createData("1-4", "African Wild dog", 56, 1.1, 36, 12),
    createData("1-5", "Doge", 356, 16, 300, 999),
  ];

  return (
    <TableContainer>
      <Table className={"simple-table"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell header>Animal</TableCell>
            <TableCell header align="end">
              Top speed (kph)
            </TableCell>
            <TableCell header align="end">
              Max length (m)
            </TableCell>
            <TableCell header align="end">
              Max weight (kg)
            </TableCell>
            <TableCell header align="end">
              Lifespan (years)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell header scope="row">
                <InputSelection
                  id={row.id}
                  label={row.name}
                  type="checkbox"
                  variant={1}
                  vol={3}
                  inputPos="start"
                  error="Form item error message"
                />
              </TableCell>
              <TableCell align="end">{row.topSpeed}</TableCell>
              <TableCell align="end">{row.maxLength}</TableCell>
              <TableCell align="end">{row.maxWeight}</TableCell>
              <TableCell align="end">{row.lifeSpan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        id="myTablePage"
        data-testid="basicExample"
        count={48}
        currentPage={0}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        rowsPerPage={10}
        // SelectProps={{
        //   inputProps: { "aria-label": "rows per page" },
        //   native: true
        // }}
        onPageChange={(e, num) => console.log(e, num, "boom")}
        onRowsPerPageChange={(e) => console.log(e)}
        // ActionsComponent={TablePaginationActions}
      />
    </TableContainer>
  );
};
