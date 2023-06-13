// import { Button, Dialog, DialogTrigger, TableViewProps } from "../../indexLib";
import {
  TableView,
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "../../indexLib";
import { MultipleSelectionManager, useAsyncList } from "react-stately";
import { useCollator } from "react-aria";

import React from "react";
import { classes } from "./tableView.st.css";
export const TableViewExample = () => {
  return (
    <TableView
      aria-label="Example table with static contents"
      selectionMode="multiple"
      vol={1}
      isResponsive
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
    lastName: string;
    city: string;
  }

  const columns = [
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

  return (
    <TableView
      data-id="table"
      aria-label="Example table with dynamic content"
      className={classes.layoutExample}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <Column
            key={column.uid}
            align={column.uid === "city" ? "end" : "start"}
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
      // style={{ height: "210px", maxWidth: "400px" }}
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

export const RowHeaderExample = () => {
  return (
    <TableView aria-label="Example table with static contents">
      <TableHeader>
        <Column isRowHeader>First Name</Column>
        <Column isRowHeader>Last Name</Column>
        <Column align="end">Age</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell>John</Cell>
          <Cell>Doe</Cell>
          <Cell>45</Cell>
        </Row>
        <Row>
          <Cell>Jane</Cell>
          <Cell>Doe</Cell>
          <Cell>37</Cell>
        </Row>
        <Row>
          <Cell>Joe</Cell>
          <Cell>Schmoe</Cell>
          <Cell>67</Cell>
        </Row>
      </TableBody>
    </TableView>
  );
};

interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: number;
}

export const AsyncExample = () => {
  const columns = [
    { name: "Name", key: "name" },
    { name: "Height", key: "height" },
    { name: "Mass", key: "mass" },
    { name: "Birth Year", key: "birth_year" },
  ];

  const list = useAsyncList<Character>({
    async load({ signal, cursor }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      const res = await fetch(
        cursor || `https://swapi.py4e.com/api/people/?search=`,
        { signal }
      );
      const json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <TableView
      aria-label="example async loading table"
      className={classes.layoutExample}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <Column align={column.key !== "name" ? "end" : "start"}>
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody
        items={list.items}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {(item) => (
          <Row key={item.name}>
            {(key) => <Cell>{item[key as keyof Character]}</Cell>}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const SelectionExample = (props: Partial<MultipleSelectionManager>) => {
  return (
    <TableView
      aria-label="Example table with multiple selection"
      selectionMode="multiple"
      // onRowAction={}
      // onRowAction={(key) => alert(`Opening item ${key}...`)}
      // onCellAction={(key) => alert(`s item ${key}...`)}
      defaultSelectedKeys={["2", "4"]}
      {...props}
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
          <Cell>100</Cell>
        </Row>
      </TableBody>
    </TableView>
  );
};

interface PokeCharacter {
  id: number;
  name: string;
  type: string;
  level: string;
}

export const ControlledSelectionExample = (
  props: Partial<MultipleSelectionManager>
) => {
  const columns = [
    { name: "Name", uid: "name" },
    { name: "Type", uid: "type" },
    { name: "Level", uid: "level" },
  ];

  const rows: PokeCharacter[] = [
    { id: 1, name: "Charizard", type: "Fire, Flying", level: "67" },
    { id: 2, name: "Blastoise", type: "Water", level: "56" },
    { id: 3, name: "Venusaur", type: "Grass, Poison", level: "83" },
    { id: 4, name: "Pikachu", type: "Electric", level: "100" },
  ];

  const [selectedKeys, setSelectedKeys] = React.useState<Iterable<React.Key>>(
    new Set([2, 4])
  );

  return (
    <TableView
      aria-label="Table with controlled selection"
      selectedKeys={selectedKeys}
      onSelectionChange={(selected) => setSelectedKeys(selected)}
      {...props}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <Column
            key={column.uid}
            align={column.uid === "level" ? "end" : "start"}
          >
            {column.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row>
            {(columnKey) => (
              <Cell>{item[columnKey as keyof PokeCharacter]}</Cell>
            )}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const AsyncSortExample = () => {
  const collator = useCollator({ numeric: true });

  const list = useAsyncList<Character>({
    async load({ signal }) {
      const res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      const json = await res.json();
      return {
        items: json.results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column as keyof Character];
          const second = b[sortDescriptor.column as keyof Character];
          let cmp = collator.compare(first as string, second as string);
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  return (
    <TableView
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      // height="size-3000"
    >
      <TableHeader>
        <Column key="name" allowsSorting>
          Name
        </Column>
        <Column key="height" allowsSorting>
          Height
        </Column>
        <Column key="mass" allowsSorting>
          Mass
        </Column>
        <Column key="birth_year" allowsSorting>
          Birth Year
        </Column>
      </TableHeader>
      <TableBody items={list.items} loadingState={list.loadingState}>
        {(item) => (
          <Row key={item.name}>
            {(columnKey) => <Cell>{item[columnKey as keyof Character]}</Cell>}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};
