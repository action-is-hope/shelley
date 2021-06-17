/* __tableExamples.tsx */
import React from "react";

import CodeSample from "../../components_site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";

export const meta = {
  name: "Table"
};

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination } from "@actionishope/shelley";\n
TBC`}</CodeSample>
);

export const ComponentHTML = () => (
  <CodeSample language="html">{`TBC`}</CodeSample>
);

export const ComponentCSS = () => <CodeSample fixedHeight>{`TBC`}</CodeSample>;
