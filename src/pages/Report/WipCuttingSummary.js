

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useMemo, useState } from "react";
// import { Container, Table } from 'react-bootstrap';
// import { useSortBy, useTable } from 'react-table';

// const SummaryTable = ({ title, data }) => {
//   const columns = useMemo(() => [
//     { Header: 'Style Name', accessor: 'Style_Name' },
//     { Header: 'Available Qty', accessor: 'Available_Qty' }
//   ], []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({ columns, data }, useSortBy);

//   const grandTotal = data.reduce((sum, row) => sum + row.Available_Qty, 0);

//   return (


//     <Container fluid className="d-flex justify-content-center mb-4 ">
//   <div className="bg-white rounded shadow-lg p-4  text-center">

//        <div className="mb-4">
//       <h4 className="text-primary text-center mb-4">{title}</h4>
//       <Table striped bordered hover {...getTableProps()}>
//         <thead className="table-dark">
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render("Header")}
//                   <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => (
//                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                 ))}
//               </tr>
//             );
//           })}
//           <tr className="table-warning fw-bold">
//             <td>Grand Total</td>
//             <td>{grandTotal}</td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//        </div>
//     </Container>
  
//   );
// };

// const WipCuttingSummary = () => {
//   const [allData, setAllData] = useState([]);
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const user = JSON.parse(localStorage.getItem("user"));
//     const userPlant = user?.plant;
//     const userRole = user?.role;

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/items/wip-cutting-summary`)
//       .then(response => response.json())
//       .then(data => setAllData(data))
//       .catch(error => console.error("Error fetching data:", error));
//   }, [BASE_URL]);




//   return (
//     <div 
//       style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
//         minHeight: '100vh', 
//         padding: '20px 0'
//       }}
//     >
//       <Container fluid className="mt-4">
//         <h3 className="text-white mb-4 text-center">WIP Cutting Summary</h3>
        
//         <SummaryTable title="" data={allData} />
        
//       </Container>
//     </div>
//   );
  
  
// };

// export default WipCuttingSummary;




import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useMemo, useState } from "react";
import { Container, Table, Button } from 'react-bootstrap';
import { useSortBy, useTable } from 'react-table';
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';

const SummaryTable = ({ title, data, onDownload }) => {
  const columns = useMemo(() => [
    { Header: 'Style Name', accessor: 'Style_Name' },
    { Header: 'Available Qty', accessor: 'Available_Qty' }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  const grandTotal = data.reduce((sum, row) => sum + row.Available_Qty, 0);

  return (
    <Container fluid className="d-flex justify-content-center mb-4">
      <div className="bg-white rounded shadow-lg p-4 text-center" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-primary m-0">{title || 'WIP Cutting Summary'}</h4>
            <Button 
              variant="success" 
              onClick={() => onDownload(data)} 
              className="d-flex align-items-center gap-2"
              size="sm"
            >
              <Download size={16} />
              {/* <span>Download Excel</span> */}
            </Button>
          </div>
          
          <Table striped bordered hover {...getTableProps()}>
            <thead className="table-dark">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-start">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
              <tr className="table-warning fw-bold">
                <td>Grand Total</td>
                <td>{grandTotal}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

const WipCuttingSummary = () => {
  const [allData, setAllData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  const userPlant = user?.plant;
  const userRole = user?.role;

  useEffect(() => {
    fetch(`${BASE_URL}/api/items/wip-cutting-summary`)
      .then(response => response.json())
      .then(data => setAllData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [BASE_URL]);

  // Function to download table data as Excel file
  const downloadExcel = (data) => {
    // Include the grand total row in the Excel file
    const grandTotal = data.reduce((sum, row) => sum + row.Available_Qty, 0);
    const dataWithTotal = [
      ...data,
      { Style_Name: 'Grand Total', Available_Qty: grandTotal }
    ];

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataWithTotal);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "WIP Cutting Summary");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "WIP_Cutting_Summary.xlsx");
  };

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh', 
        padding: '20px 0'
      }}
    >
      <Container fluid className="mt-4">
        <h3 className="text-white mb-4 text-center">WIP Cutting Summary</h3>
        
        <SummaryTable 
          title="" 
          data={allData} 
          onDownload={downloadExcel}
        />
        
      </Container>
    </div>
  );
};

export default WipCuttingSummary;