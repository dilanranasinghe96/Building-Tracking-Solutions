

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table';

import { Search } from "lucide-react";



const WipCutting = () => {
  const [items, setItems] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  

  useEffect(() => {
   // Fetch data function
  
    const user = JSON.parse(localStorage.getItem("user"));
    const userPlant = user?.plant;
    const userRole = user?.role;

    const url =  `${BASE_URL}/api/items/wip-cutting`;
    

    fetch(url)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  
  }, [BASE_URL]);

  // Table Columns
  const columns = useMemo(
    () => [
      
      { Header: 'SO', accessor: 'SO' },
      { Header: 'Style', accessor: 'Style'},
      { Header: 'Style Name', accessor: 'Style_Name' },
      { Header: 'Cut No', accessor: 'Cut_No'},
      { Header: 'Colour', accessor: 'Colour' },
      { Header: 'Size', accessor: 'Size'},
      { Header: 'Available Qty', accessor: 'Available_Qty'}
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
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
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
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '20px 0' }}>
      <Container className="mt-4">
        <div className="bg-white rounded shadow-lg p-4">
          <h3 className="text-primary mb-4 text-center">WIP Cutting</h3>

          {/* Search Input */}
          <div className="d-flex justify-content-end mb-3">
  <div className="input-group shadow-sm" style={{ maxWidth: "300px" }}>
    <span className="input-group-text bg-primary text-white">
    <Search size={20} />
    </span>
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  </div>
</div>

          

          <div className="table-responsive">
            <table {...getTableProps()} className="table table-bordered table-striped table-hover" style={{ tableLayout: "auto", width: "100%" }}>
              <thead className="table-dark text-center">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ cursor: "pointer", userSelect: "none" }}>
                        {column.render("Header")}
                        <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
            <div className="d-flex align-items-center">
              <span className="me-2">Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
              <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="form-select d-inline-block w-auto">
                {[10, 20, 30, 50, 100].map(size => (
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
    </div>
  );
};

export default WipCutting;
