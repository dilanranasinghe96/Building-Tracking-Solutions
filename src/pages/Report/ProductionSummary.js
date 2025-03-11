
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useEffect, useMemo, useState } from "react";
// import { Container, Table } from 'react-bootstrap';
// import { useSortBy, useTable } from 'react-table';

// const SummaryTable = ({ title, data }) => {
//   const columns = useMemo(() => [
//     { Header: 'Style Name', accessor: 'Style_Name' },
//     { Header: 'Finished Goods', accessor: 'finish_goods' }
//   ], []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({ columns, data }, useSortBy);

//   const grandTotal = data.reduce((sum, row) => sum + row.finish_goods, 0);

//   return (


//     <Container fluid className="d-flex justify-content-center mb-4">
//   <div className="bg-white rounded shadow-lg p-4 text-center">

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

// const ProductionSummary = () => {
//   const [allData, setAllData] = useState([]);
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const user = JSON.parse(localStorage.getItem("user"));
//     const userPlant = user?.plant;
//     const userRole = user?.role;

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/items/allProductionSummary`)
//       .then(response => response.json())
//       .then(data => setAllData(data))
//       .catch(error => console.error("Error fetching data:", error));
//   }, [BASE_URL]);

//   const groupedAllData = {
//     "All Plants": allData,
//     "CTM-M": allData.filter(item => item.Plant === "CTM-M"),
//     "CTM-P": allData.filter(item => item.Plant === "CTM-P"),
//     "CTM-D": allData.filter(item => item.Plant === "CTM-D")
//   };
  

  // return (
  //   <div 
  //   style={{
  //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
  //     minHeight: '100vh', 
  //     padding: '20px 0'
  //   }}
  // >
  //     <Container fluid className="mt-4">
  //     <h3 className="text-white mb-4 text-center">Finish Good Stock Summary</h3>
      
      
  //     {userRole === 'main admin' || userRole === 'company admin' || userRole === 'all view' ? (
  //       Object.entries(groupedAllData).map(([title, data]) => (
  //         <SummaryTable key={title} title={title} data={data} />
  //       ))
  //     ) : (
  //       <SummaryTable key={userPlant} title={userPlant} data={groupedAllData[userPlant] || []} />
  //     )}
  //   </Container>
  //   </div>
  // );
  
// };

// export default ProductionSummary;



import 'bootstrap/dist/css/bootstrap.min.css';
import { Download } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Table } from 'react-bootstrap';
import { useSortBy, useTable } from 'react-table';
import * as XLSX from 'xlsx';

const SummaryTable = ({ title, data, onDownload }) => {
  const columns = useMemo(() => [
    { Header: 'Style Name', accessor: 'Style_Name' },
    { Header: 'Finished Goods', accessor: 'finish_goods' }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  const grandTotal = data.reduce((sum, row) => sum + row.finish_goods, 0);

  return (
    <Container fluid className="d-flex justify-content-center mb-4">
      <div className="bg-white rounded shadow-lg p-4 text-center w-100" style={{ maxWidth: '800px' }}>
        <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-primary m-0">{title}</h4>
            <Button 
              variant="success" 
              onClick={() => onDownload(data, title)} 
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

const ProductionSummary = () => {
  const [allData, setAllData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  const userPlant = user?.plant;
  const userRole = user?.role;

  useEffect(() => {
    fetch(`${BASE_URL}/api/items/allProductionSummary`)
      .then(response => response.json())
      .then(data => setAllData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [BASE_URL]);

  const groupedAllData = {
    "All Plants": allData,
    "CTM-M": allData.filter(item => item.Plant === "CTM-M"),
    "CTM-P": allData.filter(item => item.Plant === "CTM-P"),
    "CTM-D": allData.filter(item => item.Plant === "CTM-D")
  };


    // Function to download table data as Excel file
    const downloadExcel = (data, title) => {
      // Create a copy of data with grand total row included
      const grandTotal = data.reduce((sum, row) => sum + row.finish_goods, 0);
      const dataWithTotal = [
        ...data,
        { Style_Name: 'Grand Total', finish_goods: grandTotal }
      ];
  
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(dataWithTotal);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, title);
      
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, `${title}_Production_Summary.xlsx`);
    };


  // Function to download all data as Excel with multiple sheets
  const downloadAllExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Add a sheet for each group
    Object.entries(groupedAllData).forEach(([title, data]) => {
      // Include grand total row
      const grandTotal = data.reduce((sum, row) => sum + row.finish_goods, 0);
      const dataWithTotal = [
        ...data,
        { Style_Name: 'Grand Total', finish_goods: grandTotal }
      ];
      
      const ws = XLSX.utils.json_to_sheet(dataWithTotal);
      XLSX.utils.book_append_sheet(wb, ws, title);
    });
    
    // Generate Excel file with all sheets
    XLSX.writeFile(wb, "Complete_Finish_Good_Stock_Summary.xlsx");
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
      
     
      <div className="mb-4">
  <h3 className="text-white mb-3 text-center w-100">Finish Good Stock Summary</h3>
  
  <div className="w-100 d-flex justify-content-end">
    {(userRole === 'main admin' || userRole === 'company admin' || userRole === 'all view') && (
      <Button 
        variant="success" 
        onClick={downloadAllExcel} 
        className="d-flex align-items-center gap-2"
      >
        <Download size={18} />
        <span>Download All</span>
      </Button>
    )}
  </div>
</div>




{userRole === 'main admin' || userRole === 'company admin' || userRole === 'all view' ? (
          Object.entries(groupedAllData).map(([title, data]) => (
            <SummaryTable 
              key={title} 
              title={title} 
              data={data} 
              onDownload={downloadExcel}
            />
          ))
        ) : (
          <SummaryTable 
            key={userPlant} 
            title={userPlant} 
            data={groupedAllData[userPlant] || []} 
            onDownload={downloadExcel}
          />
        )}  
      
      
      
    </Container>
    </div>
  );
};

export default ProductionSummary;