/* Table.examples.tsx */
// https://www.worldwildlife.org/species/directory?direction=desc&sort=extinction_status
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputSelection,
  // InputSelectionControl,
} from "../../indexLib";

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

export const Example1 = () => {
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
                {row.name}
              </TableCell>
              <TableCell align="end">{row.topSpeed}</TableCell>
              <TableCell align="end">{row.maxLength}</TableCell>
              <TableCell align="end">{row.maxWeight}</TableCell>
              <TableCell align="end">{row.lifeSpan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// export const Example2 = () => {
//   const rows = [
//     createData("1-1", "Red Fox", 48, 0.9, 11, 14),
//     createData("1-2", "Artic Fox", 40, 0.6, 8, 12),
//     createData("1-3", "Grey Wolf", 70, 1.6, 80, 20),
//     createData("1-4", "African Wild dog", 56, 1.1, 36, 12),
//     createData("1-5", "Doge", 356, 16, 300, 999),
//   ];

//   return (
//     <TableContainer>
//       <Table className={"simple-table"} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell header>Animal</TableCell>
//             <TableCell header align="end">
//               Top speed (kph)
//             </TableCell>
//             <TableCell header align="end">
//               Max length (m)
//             </TableCell>
//             <TableCell header align="end">
//               Max weight (kg)
//             </TableCell>
//             <TableCell header align="end">
//               Lifespan (years)
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell header scope="row">
//                 <InputSelection
//                   id={row.id}
//                   label={row.name}
//                   type="checkbox"
//                   variant={1}
//                   vol={1}
//                   inputPos="start"
//                   error="Form item error message"
//                 />
//               </TableCell>
//               <TableCell align="end">{row.topSpeed}</TableCell>
//               <TableCell align="end">{row.maxLength}</TableCell>
//               <TableCell align="end">{row.maxWeight}</TableCell>
//               <TableCell align="end">{row.lifeSpan}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

export const Example3 = () => {
  const rows = [
    createData("1-1", "Red Fox", 48, 0.9, 11, 14),
    createData("1-2", "Artic Fox", 40, 0.6, 8, 12),
    createData("1-3", "Grey Wolf", 70, 1.6, 80, 20),
    createData("1-4", "African Wild dog", 56, 1.1, 36, 12),
    createData("1-5", "Doge", 356, 16, 300, 999),
  ];

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <TableContainer>
      <Table className={"simple-table"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell header style={{ width: 50 }}>
              <InputSelection
                id={"example-2-header-checkbox"}
                label={"Select all"}
                type="checkbox"
                variant={1}
                vol={1}
                inputPos="start"
                error="Form item error message"
                labelVisuallyHidden
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell header padding="none">
              Animal
            </TableCell>
            <TableCell header align="end" sortDirection="ascending">
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
          {rows.map((row) => {
            const isItemSelected = isSelected(row.name);
            return (
              <TableRow
                key={row.name}
                onClick={(event) => handleClick(event, row.name)}
              >
                <TableCell>
                  <InputSelection
                    type="checkbox"
                    aria-labelledby={row.id}
                    checked={isItemSelected}
                    vol={1}
                  />
                </TableCell>
                <TableCell header scope="row" padding="none" id={row.id}>
                  {row.name}
                </TableCell>
                {/* <TableCell header scope="row">
                <InputSelectionControl
                  type="checkbox"
                  id={row.id}
                />
              </TableCell>
              <TableCell header scope="row" id={row.id}>
                <label htmlFor={row.id}>{row.name}</label>
              </TableCell> */}
                <TableCell align="end">{row.topSpeed}</TableCell>
                <TableCell align="end">{row.maxLength}</TableCell>
                <TableCell align="end">{row.maxWeight}</TableCell>
                <TableCell align="end">{row.lifeSpan}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Example4 = () => {
  const rows = [
    createData("1-1", "Red Fox", 48, 0.9, 11, 14),
    createData("1-2", "Artic Fox", 40, 0.6, 8, 12),
    createData("1-3", "Grey Wolf", 70, 1.6, 80, 20),
    createData("1-4", "African Wild dog", 56, 1.1, 36, 12),
    createData("1-5", "Doge", 356, 16, 300, 999),
  ];

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <TableContainer>
      <Table className={"simple-table"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell header style={{ width: 50 }}>
              <InputSelection
                id={"example-2-header-checkbox"}
                label={"Select all"}
                type="checkbox"
                variant={1}
                vol={1}
                inputPos="start"
                error="Form item error message"
                labelVisuallyHidden
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell header padding="none">
              Animal
            </TableCell>
            <TableCell header align="end" sortDirection="ascending">
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
          {rows.map((row) => {
            const isItemSelected = isSelected(row.name);
            return (
              <TableRow
                key={row.name}
                onClick={(event) => handleClick(event, row.name)}
              >
                <TableCell>
                  <InputSelection
                    type="checkbox"
                    aria-labelledby={row.id}
                    checked={isItemSelected}
                    vol={1}
                  />
                </TableCell>
                <TableCell header scope="row" padding="none" id={row.id}>
                  {row.name}
                </TableCell>

                <TableCell align="end">{row.topSpeed}</TableCell>
                <TableCell align="end">{row.maxLength}</TableCell>
                <TableCell align="end">{row.maxWeight}</TableCell>
                <TableCell align="end">{row.lifeSpan}</TableCell>
              </TableRow>
            );
          })}
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
