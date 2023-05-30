// Cypress component tests for TableView component
import { Cell, Column, Row, TableBody } from "react-stately";
import { TableHeader, TableView, TableViewProps } from "../../src/indexLib";

interface RowData {
  id: number;
  name: string;
  lastName: string;
  city: string;
}

interface ColumnData {
  name: string;
  uid: keyof RowData;
}

const columns: ColumnData[] = [
  { name: "First Name", uid: "name" },
  { name: "Last Name", uid: "lastName" },
  { name: "City", uid: "city" },
];

const rows: RowData[] = [
  { id: 1, name: "Gary", lastName: "Ford", city: "London" },
  { id: 2, name: "Mark", lastName: "Lexus", city: "Bristol" },
  { id: 3, name: "Tamas", lastName: "Bentley", city: "London" },
  { id: 4, name: "Cristina", lastName: "Yaris", city: "Unknown" },
  { id: 5, name: "Simon", lastName: "PeopleCarrier", city: "Remote" },
  { id: 6, name: "Robin", lastName: "BatMobile", city: "BeachTown" },
  { id: 7, name: "Lucja", lastName: "Pendolino", city: "London" },
  { id: 8, name: "Andrea", lastName: "Rayleigh", city: "London" },
  { id: 9, name: "Tu", lastName: "Creative", city: "London" },
  { id: 10, name: "Phil", lastName: "Aston", city: "London" },
];

const DynamicTable = function <T extends object>(props: TableViewProps<T>) {
  return (
    <TableView
      data-id="table"
      aria-label="Example table with dynamic content"
      {...props}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <Column key={column.uid} data-id="table-column">
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row>
            {(columnKey) => (
              <Cell data-id="table-cell">
                {item[columnKey as keyof RowData]}
              </Cell>
            )}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

const table = '[data-id="table"]';
const th = '[data-id="table-column"]';
const td = '[data-id="table-cell"]';

describe("TableView", () => {
  // Should render the table
  it("should render the table", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table).should("exist");
  });

  // Should render the table elements

  it("should render the table elements", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table).get("thead").should("exist");
    cy.get(table).get("tr").should("exist");
    cy.get(th).should("exist");
    cy.get(table).get("tbody").should("exist");
    cy.get(td).should("exist");
  });

  // Should render correct class names

  it("should render correct class names", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table).should("have.attr", "class").and("to.have.string", "table");
    cy.get(table)
      .get("thead")
      .should("have.attr", "class")
      .and("to.have.string", "thead");
    cy.get(table)
      .get("tbody")
      .should("have.attr", "class")
      .and("to.have.string", "tbody");
    cy.get(table)
      .get("tr")
      .should("have.attr", "class")
      .and("to.have.string", "headerRow");
    cy.get(th).should("have.attr", "class").and("to.have.string", "column");
    cy.get(td).should("have.attr", "class").and("to.have.string", "cell");
  });

  // Should render correct number of rows and columns

  it("should render correct number of rows and columns", () => {
    const trCount = rows.length + 1;
    const thCount = columns.length;
    const tdCount = rows.length * columns.length;
    const tbodyCount = 1;
    const theadCount = 1;
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table).get("thead").should("have.length", theadCount);
    cy.get(table).get("tbody").should("have.length", tbodyCount);
    cy.get(table).get("tr").should("have.length", trCount);
    cy.get(table).get("thead").get("tr").get(th).should("have.length", thCount);
    cy.get(table).get("tbody").get("tr").get(td).should("have.length", tdCount);
  });
});
