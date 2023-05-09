import { Button, Dialog, DialogTrigger } from "../../indexLib";
import {
  TableView,
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "../../indexLib";

import { st, classes } from "./tableView.st.css";
export const TableViewExample = () => {
  return (
    <TableView
      aria-label="Example table with static contents"
      selectionMode="multiple"
    >
      <TableHeader>
        <Column>Name</Column>
        <Column>Type</Column>
        <Column align="end">Date Modified</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell>Games</Cell>
          <Cell>File folder</Cell>
          <Cell>6/7/2020</Cell>
        </Row>
        <Row>
          <Cell>Program Files</Cell>
          <Cell>File folder</Cell>
          <Cell>4/7/2021</Cell>
        </Row>
        <Row>
          <Cell>bootmgr</Cell>
          <Cell>System file</Cell>
          <Cell>11/20/2010</Cell>
        </Row>
        <Row>
          <Cell>log.txt</Cell>
          <Cell>Text Document</Cell>
          <Cell>1/18/2016</Cell>
        </Row>
      </TableBody>
    </TableView>
  );
};

export const ContentExample = () => {
  interface RowData {
    id: number;
    name: string;
    date: string;
    type: string;
  }

  const columns = [
    { name: "Name", uid: "name" },
    { name: "Type", uid: "type" },
    { name: "Date Modified", uid: "date" },
  ];

  const rows: RowData[] = [
    { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
    { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
    { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
    { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  ];

  return (
    <TableView aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => (
          <Column
            key={column.uid}
            align={column.uid === "date" ? "end" : "start"}
          >
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row>
            {(columnKey) => <Cell>{item[columnKey as keyof RowData]}</Cell>}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const LayoutExample = () => {
  interface RowData {
    id: number;
    name: string;
    date: string;
    type: string;
  }

  const columns = [
    { name: "Name", uid: "name" },
    { name: "Type", uid: "type" },
    { name: "Date Modified", uid: "date" },
  ];

  const rows: RowData[] = [
    { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
    { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
    { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
    { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  ];

  return (
    <TableView
      aria-label="Example table with dynamic content"
      className={classes.layoutExample}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <Column
            key={column.uid}
            align={column.uid === "date" ? "end" : "start"}
          >
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row>
            {(columnKey) => <Cell>{item[columnKey as keyof RowData]}</Cell>}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const BasicTableView = () => {
  return (
    <TableView
      aria-label="Example static collection table"
      style={{ height: "210px", maxWidth: "400px" }}
    >
      <TableHeader>
        <Column data-id="Test">Name</Column>
        <Column className="test1">Type</Column>
        <Column align="end">Date Modified</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell className="test2">Games</Cell>
          <Cell data-column-value="colum">File folder</Cell>
          <Cell align="end">6/7/2020</Cell>
        </Row>
        <Row>
          <Cell>
            <span dangerouslySetInnerHTML={{ __html: "<em>Test</em>" }} />
          </Cell>
          <Cell>File folder</Cell>
          <Cell align="end">4/7/2021</Cell>
        </Row>
        <Row>
          <Cell>bootmgr</Cell>
          <Cell>System file</Cell>
          <Cell align="end">11/20/2010</Cell>
        </Row>
        <Row>
          <Cell>log.txt</Cell>
          <Cell>Text Document</Cell>
          <Cell align="end">1/18/2016</Cell>
        </Row>
        <Row>
          <Cell className="test2">Games</Cell>
          <Cell data-column-value="colum">File folder</Cell>
          <Cell align="end">6/7/2020</Cell>
        </Row>
        <Row>
          <Cell>
            <span dangerouslySetInnerHTML={{ __html: "<em>Test</em>" }} />
          </Cell>
          <Cell>File folder</Cell>
          <Cell align="end">4/7/2021</Cell>
        </Row>
        <Row>
          <Cell>bootmgr</Cell>
          <Cell>System file</Cell>
          <Cell align="end">11/20/2010</Cell>
        </Row>
        <Row>
          <Cell>log.txt</Cell>
          <Cell>Text Document</Cell>
          <Cell align="end">1/18/2016</Cell>
        </Row>
      </TableBody>
    </TableView>
  );
};

export const SelectionTableView = () => {
  return (
    <TableView
      aria-label="Table with selection"
      selectionMode="multiple"
      onRowAction={(key) => alert(`Opening item ${key}...`)}
    >
      <TableHeader>
        <Column>Name</Column>
        <Column>Type</Column>
        <Column align="end">Level</Column>
      </TableHeader>
      <TableBody>
        <Row key="1">
          <Cell>Charizard</Cell>
          <Cell>Fire, Flying</Cell>
          <Cell>67</Cell>
        </Row>
        <Row key="2">
          <Cell>Blastoise</Cell>
          <Cell>Water</Cell>
          <Cell>56</Cell>
        </Row>
        <Row key="3">
          <Cell>Venusaur</Cell>
          <Cell>Grass, Poison</Cell>
          <Cell>83</Cell>
        </Row>
        <Row key="4">
          <Cell>Pikachu</Cell>
          <Cell>Electric</Cell>
          <Cell>
            <DialogTrigger>
              <Button>HI</Button>
              <Dialog>CONTENT</Dialog>
            </DialogTrigger>
          </Cell>
        </Row>
      </TableBody>
    </TableView>
  );
};
