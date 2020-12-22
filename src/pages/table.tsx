import React from "react";
import DefaultLayout from "../layouts";
import { P, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import { classes as text } from "../styles/default/text.st.css";

import Blockquote from "../components/Blockquote/Blockquote";

import Table from "../components/Table/Table";
import TableBody from "../components/TableBody/TableBody";
import TableCell from "../components/TableCell/TableCell";
import TableContainer from "../components/TableContainer/TableContainer";
import TableHead from "../components/TableHead/TableHead";
import TableRow from "../components/TableRow/TableRow";
import TablePagination from "../components/TablePagination/TablePagination";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Blockquote/__blockquoteExamples";

import StyleInfo from "../components_site/StyleInfo/StyleInfo";
import { classes as grid } from "../styles/default/grid.st.css";
import InputSelection from "../components/InputSelection/InputSelection";

const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
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
            <Table className={"hello"} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell header>Dessert (100g serving)</TableCell>
                  <TableCell header align="end">
                    Calories
                  </TableCell>
                  <TableCell header align="end">
                    Fat&nbsp;(g)
                  </TableCell>
                  <TableCell header align="end">
                    Carbs&nbsp;(g)
                  </TableCell>
                  <TableCell header align="end">
                    Protein&nbsp;(g)
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
                    <TableCell align="end">{row.calories}</TableCell>
                    <TableCell align="end">{row.fat}</TableCell>
                    <TableCell align="end">{row.carbs}</TableCell>
                    <TableCell align="end">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              id="myTable"
              data-testid="hello"
              count={48}
              currentPage={0}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              // colSpan={3}
              // count={rows.length}
              rowsPerPage={10}
              // page={page}
              // SelectProps={{
              //   inputProps: { "aria-label": "rows per page" },
              //   native: true
              // }}
              // onChangePage={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
              onRowsPerPageChange={e => console.log(e)}
              // ActionsComponent={TablePaginationActions}
            />
          </TableContainer>
        </div>
        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#mid-structure-separation-programmatic">
              Labels or Instructions: Understanding SC 3.3.2
            </a>
          }
          variant={2}
        >
          <H2 vol={4}>
            1.3.1 Info and Relationships: Information, structure, and
            relationships conveyed through presentation can be programmatically
            determined or are available in text. (Level A)
          </H2>
          <P>
            ...ensure that information and relationships that are implied by
            visual or auditory formatting are preserved when the presentation
            format changes. For example, the presentation format changes when
            the content is read by a screen reader or when a user style sheet is
            substituted for the style sheet provided by the author.
          </P>
          <P>
            ...a change in voice pitch or speech rate may be used to emphasize
            important information or to indicate quoted text; etc.
          </P>
        </Blockquote>

        <P>
          This one is pretty simple to grasp... Visually, quotes allow people to
          see that we switch voices. We need to enable screen readers so that
          they too can &apos;see&apos; quotes as quotes. Semantics!
        </P>

        <P>
          A life of listening to a monotone screen reader without any emotion is
          dull. We must give the assistive tech the hooks so that they can relay
          a more true experiance, as the author intended.
        </P>

        <P>
          They will have other uses too, perhaps being pulled out as snippets by
          search bots or ranked as keywords. Let the content be the king though,
          don&apos;t try to manipulate the bots by loading them with too many
          keywords.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
