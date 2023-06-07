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
    cy.get(table + " thead").should("exist");
    cy.get(table + " tr").should("exist");
    cy.get(th).should("exist");
    cy.get(table + " tbody").should("exist");
    cy.get(td).should("exist");
  });

  // Should render correct class names

  it("should render correct class names", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table).should("have.attr", "class").and("to.have.string", "table");
    cy.get(table + " thead")
      .should("have.attr", "class")
      .and("to.have.string", "thead");
    cy.get(table + " tbody")
      .should("have.attr", "class")
      .and("to.have.string", "tbody");
    cy.get(table + " tr")
      .should("have.attr", "class")
      .and("to.have.string", "headerRow");
    cy.get(th).should("have.attr", "class").and("to.have.string", "column");
    cy.get(td).should("have.attr", "class").and("to.have.string", "cell");
    cy.get(table)
      .parent()
      .should("have.attr", "class")
      .and("to.have.string", "isHeaderSticky");
  });

  // Should render correct number of rows and columns

  it("should render correct number of rows and columns", () => {
    const trCount = rows.length + 1;
    const thCount = columns.length;
    const tdCount = rows.length * columns.length;
    const tbodyCount = 1;
    const theadCount = 1;
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table + " thead").should("have.length", theadCount);
    cy.get(table + " tbody").should("have.length", tbodyCount);
    cy.get(table + " tr").should("have.length", trCount);
    cy.get(table + " thead tr " + th).should("have.length", thCount);
    cy.get(table + " tbody tr " + td).should("have.length", tdCount);
  });

  // Should render correct content

  it("should render correct content", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table + " thead tr " + th)
      .eq(0)
      .should("have.text", "First Name");
    cy.get(table + " thead tr " + th)
      .eq(1)
      .should("have.text", "Last Name");
    cy.get(table + " thead tr " + th)
      .eq(2)
      .should("have.text", "City");
    cy.get(table + " tbody tr " + td)
      .eq(0)
      .should("have.text", "Gary");
    cy.get(table + " tbody tr " + td)
      .eq(1)
      .should("have.text", "Ford");
    cy.get(table + " tbody tr " + td)
      .eq(2)
      .should("have.text", "London");
    cy.get(table + " tbody tr " + td)
      .eq(3)
      .should("have.text", "Mark");
    cy.get(table + " tbody tr " + td)
      .eq(4)
      .should("have.text", "Lexus");
    cy.get(table + " tbody tr " + td)
      .eq(5)
      .should("have.text", "Bristol");
  });

  // Should render correct aria-label

  it("should render correct aria-label", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table)
      .should("have.attr", "aria-label", "Example table with dynamic content")
      .should("have.attr", "role", "grid")
      .should("have.attr", "aria-describedby");
    cy.get(table + " thead").should("have.attr", "role", "rowgroup");
    cy.get(table + " tbody").should("have.attr", "role", "rowgroup");
    cy.get(table + " tr").should("have.attr", "role", "row");
    cy.get(th).should("have.attr", "role", "columnheader");
    cy.get(table + " tbody td:first-child").should(
      "have.attr",
      "role",
      "rowheader"
    );
    cy.get(table + " tbody td:not(:first-child)").should(
      "have.attr",
      "role",
      "gridcell"
    );
  });

  // should be scrollable

  it("should be scrollable", () => {
    cy.mount(<DynamicTable data-id="table" />);
    cy.get(table).parent().should("have.css", "overflow", "auto");
  });

  // Should render correct volume classes

  it("should render correct volume classes", () => {
    cy.mount(<DynamicTable vol={2} data-id="table" />);
    cy.get(table)
      .parent()
      .should("have.attr", "class")
      .and("to.have.string", "vol-1-2");
  });

  // Should render correct density classes

  it("should render correct density classes", () => {
    cy.mount(<DynamicTable density="compact" data-id="table" />);
    cy.get(table)
      .parent()
      .should("have.attr", "class")
      .and("to.have.string", "density-7-compact");
    cy.mount(<DynamicTable density="spacious" data-id="table" />);
    cy.get(table)
      .parent()
      .should("have.attr", "class")
      .and("to.have.string", "density-8-spacious");
  });

  // Should render responsive table

  it("should render responsive table", () => {
    cy.mount(<DynamicTable isResponsive data-id="table" />);
    cy.get(table)
      .parent()
      .should("have.attr", "class")
      .and("to.contain", "isResponsive");
  });
});

const SelectionTable = function <T extends object>(props: TableViewProps<T>) {
  return (
    <TableView
      data-id="table"
      aria-label="Example table with multiple selection"
      selectionMode="multiple"
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
          <Row key={item.id}>
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

describe("Selection table", () => {
  // Should render label

  it("should render checkbox in header", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " thead tr th:first-child > label")
      .should("have.attr", "class")
      .and("to.have.string", "root")
      .and("to.have.string", "hasInput")
      .and("to.have.string", "size-1-1")
      .and("to.have.string", "columnCheckbox");
    cy.get(table + " tbody tr td:first-child > label")
      .should("have.attr", "class")
      .and("to.have.string", "root")
      .and("to.have.string", "hasInput")
      .and("to.have.string", "size-1-1")
      .and("to.have.string", "cellCheckbox");
  });

  // Should render span inside label

  it("should render span in header", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " thead tr th:first-child > label > span")
      .should("have.attr", "class")
      .and("to.have.string", "inputContainer");
    cy.get(table + " tbody tr td:first-child > label > span")
      .should("have.attr", "class")
      .and("to.have.string", "inputContainer");
  });

  // Should render checkbox inside span

  it("should render checkbox in header", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " thead tr th:first-child > label > span > input")
      .should("have.attr", "type", "checkbox")
      .should("have.attr", "aria-label", "Select All")
      .should("have.attr", "class")
      .and("to.have.string", "input");
    cy.get(table + " tbody tr td:first-child > label > span > input")
      .should("have.attr", "type", "checkbox")
      .should("have.attr", "aria-label", "Select")
      .should("have.attr", "class")
      .and("to.have.string", "input");
  });

  // Should select all rows when header checkbox is checked

  it("should select all rows when header checkbox is checked", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " thead tr th:first-child > label > span > input").check();
    cy.get(table + " tbody tr td:first-child > label > span > input").should(
      "be.checked"
    );
  });

  // Should unselect all rows when header checkbox is unchecked

  it("should unselect all rows when header checkbox is unchecked", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " thead tr th:first-child > label > span > input").check();
    cy.get(table + " thead tr th:first-child > label > span > input").uncheck();
    cy.get(table + " tbody tr td:first-child > label > span > input").should(
      "not.be.checked"
    );
  });

  // Should select a row when checkbox is checked

  it("should select a row when checkbox is checked", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(
      table + " tbody tr:nth-child(3) > td:first-child > label > span > input"
    ).check();
    cy.get(table + " tbody tr:nth-child(3)")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.have.string", "isSelected")
      .get("tr:nth-child(3) > td:first-child > label > span > input")
      .should("be.checked");
    cy.get(table + " tbody tr:nth-child(5)")
      .should("have.attr", "aria-selected", "false")
      .should("not.have.attr", "class", "isSelected")
      .get("tr:nth-child(5) > td:first-child > label > span > input")
      .should("not.be.checked");
  });

  // Should unselect a row when checkbox is unchecked

  it("should unselect a row when checkbox is unchecked", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(
      table + " tbody tr:first-child > td:first-child > label > span > input"
    ).uncheck();
    cy.get(table + " tbody tr:first-child")
      .should("not.have.attr", "aria-selected", "true")
      .should("not.have.attr", "class", "isSelected")
      .get("td:first-child > label > span > input")
      .should("not.be.checked");
  });

  // Should select a row when row is clicked

  it("should select a row when row is clicked", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " tbody tr:nth-child(5)").click({ multiple: true });
    cy.get(table + " tbody tr:nth-child(5)")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.have.string", "isSelected")
      .get("td:first-child > label > span > input")
      .should("be.checked");
  });

  // Should unselect a row when row is clicked twice

  it("should unselect a row when row is clicked twice", () => {
    cy.mount(<SelectionTable data-id="table" />);
    cy.get(table + " tbody tr:nth-child(6)").dblclick({ multiple: true });
    cy.get(table + " tbody tr:nth-child(6)")
      .should("not.have.attr", "aria-selected", "true")
      .should("not.have.attr", "class", "isSelected")
      .get("td:first-child > label > span > input")
      .should("not.be.checked");
  });

  // Row 2 and 4 should be selected by default

  it("row 2 and 4 should be selected by default", () => {
    cy.mount(
      <SelectionTable
        selectionMode="multiple"
        defaultSelectedKeys={["2", "4"]}
        data-id="table"
      />
    );
    cy.get(table + " tbody tr:nth-child(2)")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.have.string", "isSelected")
      .get("td:first-child > label > span > input")
      .should("be.checked");
    cy.get(table + " tbody tr:nth-child(4)")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.have.string", "isSelected")
      .get("td:first-child > label > span > input")
      .should("be.checked");
  });

  // Disabled rows should not be selectable

  it("disabled rows should not be selectable", () => {
    cy.mount(
      <SelectionTable
        selectionMode="multiple"
        data-id="table"
        disabledKeys={["2"]}
      />
    );
    cy.get(table + " tbody tr:nth-child(2)")
      .should("not.have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled")
      .get("td:first-child > label > span > input")
      .should("have.attr", "type", "checkbox")
      .should("be.disabled");
  });
});
