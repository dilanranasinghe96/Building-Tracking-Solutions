


// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const TableDisplay = () => {
//   const [items, setItems] = useState([]);
  
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userPlant = user?.plant;

//     axios
//       .get("http://localhost:3000/api/items/fg", {
//         params: { plant: userPlant }, // Pass plant as a query parameter
//       })
//       .then((response) => {
//         setItems(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
//       <table className="table table-bordered table-striped">
//         <thead className="table-dark sticky-top">
//           <tr>
//             <th>BNo</th>
//             <th>SO</th>
//             <th>Style</th>
//             <th>Style Name</th>
//             <th>Cut No</th>
//             <th>Colour</th>
//             <th>Size</th>
//             <th>BQty</th>
//             <th>Plant</th>
//             <th>Line</th>
//             <th>Damage Pcs</th>
//             <th>Cut Panel Shortage</th>
//             <th>Good Pcs</th>
//             <th>User</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.Id}>
//               <td>{item.bno}</td>
//               <td>{item.SO}</td>
//               <td>{item.Style}</td>
//               <td>{item.Style_Name}</td>
//               <td>{item.Cut_No}</td>
//               <td>{item.Colour}</td>
//               <td>{item.Size}</td>
//               <td>{item.BQty}</td>
//               <td>{item.Plant}</td>
//               <td>{item.Line}</td>
//               <td>{item.Damage_Pcs}</td>
//               <td>{item.Cut_Panel_Shortage}</td>
//               <td>{item.Good_Pcs}</td>
//               <td>{item.User}</td>
              // <td>
                // {(() => {
                //   const originalDate = new Date(item.Date);
                //   originalDate.setDate(originalDate.getDate() + 1); // Adjust date
                //   return originalDate.toISOString().split("T")[0];
                // })()}
              // </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableDisplay;


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table';

const TableDisplay = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userPlant = user?.plant;
  
    fetch(`http://localhost:8081/api/items/fg?plant=${encodeURIComponent(userPlant)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  const columns = useMemo(
    () => [
      { Header: 'BNo', accessor: 'bno' },
      { Header: 'SO', accessor: 'SO' },
      { Header: 'Style', accessor: 'Style' },
      { Header: 'Style Name', accessor: 'Style_Name' },
      { Header: 'Cut No', accessor: 'Cut_No' },
      { Header: 'Colour', accessor: 'Colour' },
      { Header: 'Size', accessor: 'Size' },
      { Header: 'BQty', accessor: 'BQty' },
      { Header: 'Plant', accessor: 'Plant' },
      { Header: 'Line', accessor: 'Line' },
      { Header: 'Damage Pcs', accessor: 'Damage_Pcs' },
      { Header: 'Cut Panel Shortage', accessor: 'Cut_Panel_Shortage' },
      { Header: 'Good Pcs', accessor: 'Good_Pcs' },
      { Header: 'User', accessor: 'User' },
      { 
        Header: 'Date',
        accessor: 'Date',
        Cell: ({ value }) => {
          const originalDate = new Date(value);
          originalDate.setDate(originalDate.getDate() + 1); // Adjust date
          return originalDate.toISOString().split("T")[0];
        }
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: items,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Container fluid>
      <div className="bg-white rounded shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">Finish Goods List</h2>
        
        <div className="table-responsive">
  <table
    {...getTableProps()}
    className="table table-bordered table-striped table-hover"
    style={{ tableLayout: "auto", width: "100%" }}
  >
    <thead className="table-dark text-center" >
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              style={{
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
                minWidth: "max-content",
              }}
            >
              {column.render("Header")}
              <span>
                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()} className='text-center'>
      {page.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <td
                {...cell.getCellProps()}
                style={{
                  whiteSpace: "nowrap",
                  minWidth: "max-content",
                }}
              >
                {cell.column.id === "Date" ? (
                  (() => {
                    const originalDate = new Date(cell.value);
                    originalDate.setDate(originalDate.getDate() + 1);
                    return originalDate.toISOString().split("T")[0];
                  })()
                ) : (
                  cell.render("Cell")
                )}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span>
              Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
            </span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="form-select d-inline-block w-auto ms-2"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>Show {size}</option>
              ))}
            </select>
          </div>

          <div className="btn-group">
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} variant="outline-primary">{'<<'}</Button>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage} variant="outline-primary">Previous</Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage} variant="outline-primary">Next</Button>
            <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} variant="outline-primary">{'>>'}</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TableDisplay;
