import React from "react";
import DefaultLayout from "../layouts";
import { P, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import { classes as text } from "../styles/default/text.st.css";
import Table from "../components/Table/Table";
import TableBody from "../components/TableBody/TableBody";
import TableCell from "../components/TableCell/TableCell";
import TableContainer from "../components/TableContainer/TableContainer";
import TableHead from "../components/TableHead/TableHead";
import TableRow from "../components/TableRow/TableRow";
import TablePagination from "../components/TablePagination/TablePagination";

import {
  // meta,
  QuickRef
  // ComponentDemo,
  // ComponentHTML,
  // ComponentCSS
} from "../components/Table/__tableExamples";

import { classes as grid } from "../styles/default/grid.st.css";
import InputSelection from "../components/InputSelection/InputSelection";

const createData = (
  name: string,
  topSpeed: number,
  maxLength: number,
  maxWeight: number,
  lifeSpan: number
) => {
  return { name, topSpeed, maxLength, maxWeight, lifeSpan };
};

const rows = [
  createData("Red Fox", 48, 0.9, 11, 14),
  createData("Artic Fox", 40, 0.6, 8, 12),
  createData("Grey Wolf", 70, 1.6, 80, 20),
  createData("African Wild dog", 56, 1.1, 36, 12),
  createData("Doge", 356, 16, 300, 999)
];

const LabelsDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Tables</PageTitle>

      <Grid variant={1} tag="main" formatted>
        <P vol={4} className={text.intro}>
          Tables are for data d-d-data, d-d-data, never for layout...
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <div className={grid.pen}>
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
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell header scope="row">
                      <InputSelection
                        id={row.name}
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
              onRowsPerPageChange={e => console.log(e)}
              // ActionsComponent={TablePaginationActions}
            />
          </TableContainer>
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
