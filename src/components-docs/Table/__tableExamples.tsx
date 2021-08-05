/* __table  Examples.tsx */
import type React from "react";

import CodeSample from "../../components-site/CodeSample/CodeSample";
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
