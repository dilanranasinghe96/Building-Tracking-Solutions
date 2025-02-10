

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Navbar from "react-bootstrap/Navbar";
// import { useLocation, useNavigate } from "react-router-dom";
// import AddItemDialog from "../AddItemDialog/AddItemDialog";
// import QRCodeScanner from "../QrCodeScanner/QrCodeScanner";

// const CustomNavbar = ({ children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openScanner, setOpenScanner] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [bNumber, setBNumber] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userRole = user?.role;

//   const isAuthPage = ["/login", "/register", "/"].includes(location.pathname);

//   if (isAuthPage) {
//     return children;
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleAddClick = () => {
//     setOpenScanner(true);
//   };

//   const handleScannerClose = () => {
//     setOpenScanner(false);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//   };

//   const handleScanComplete = (scannedBNumber) => {
//     setBNumber(scannedBNumber);
//     setOpenScanner(false);
//     setOpenDialog(true);
//   };

//   const PlantUserNavbar = () => (
//     <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
//       <Container>
//         <Navbar.Brand href="/home">BTS Inventory</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Button className="me-2" variant="primary" onClick={handleAddClick}>
//               Add
//             </Button>
//             <Button variant="danger" onClick={handleLogout}>
//               Logout
//             </Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );

//   const CompanyAdminNavbar = () => (
//     <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
//       <Container>
//         <Navbar.Brand href="/cadmindashboard">Admin Panel</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Button variant="dark" className="me-2" onClick={() => navigate("/cadmindashboard")}>
//               Dashboard
//             </Button>
//             <NavDropdown title="Users" id="users-dropdown" className="me-2">
//               <NavDropdown.Item onClick={() => navigate("/manageusers")}>Manage Users</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => navigate("/createusers")}>Create Users</NavDropdown.Item>
//             </NavDropdown>
//             <Button variant="outline-light" onClick={handleLogout}>
//               Logout
//             </Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );

//   const MainAdminNavbar = () => (
//     <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
//       <Container>
//         <Navbar.Brand href="/cadmindashboard">Main Admin Panel</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Button variant="dark" className="me-2" onClick={() => navigate("/cadmindashboard")}>
//               Dashboard
//             </Button>
//             <NavDropdown title="Users" id="users-dropdown" className="me-2">
//               <NavDropdown.Item onClick={() => navigate("/manageallusers")}>Manage Users</NavDropdown.Item>
//               <NavDropdown.Item onClick={() => navigate("/createallusers")}>Create Users</NavDropdown.Item>
//             </NavDropdown>
//             <Button variant="outline-light" onClick={handleLogout}>
//               Logout
//             </Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );

//   return (
//     <>
//       {userRole === "company admin" && <CompanyAdminNavbar />}
//       {(userRole === "plant user" || userRole === "user") && <PlantUserNavbar />}
//       {userRole === "main admin" && <MainAdminNavbar />}
//       {children}
//       {openScanner && (
//         <QRCodeScanner onScanComplete={handleScanComplete} onClose={handleScannerClose} />
//       )}
//       {openDialog && (
//         <AddItemDialog onClose={handleDialogClose} bNumber={bNumber} />
//       )}
//     </>
//   );
// };

// export default CustomNavbar;





import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import AddItemDialog from "../AddItemDialog/AddItemDialog";
import ManualAddItems from "../ManuallAddItems/ManualAddItems";
import QRCodeScanner from "../QrCodeScanner/QrCodeScanner";


const NavbarStyles = {
  background: 'linear-gradient(to right, #2c3e50, #3498db)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};


const CustomNavbar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openScanner, setOpenScanner] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [bNumber, setBNumber] = useState(null);
  const [showManualDialog, setShowManualDialog] = useState(false);


  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;
  const userName = user?.username;

  const isAuthPage = ["/login", "/register", "/"].includes(location.pathname);

  if (isAuthPage) {
    return children;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddClick = () => {
    setOpenScanner(true);
  };

  const handleScannerClose = () => {
    setOpenScanner(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleScanComplete = (scannedBNumber) => {
    setBNumber(scannedBNumber);
    setOpenScanner(false);
    setOpenDialog(true);
  };

  
  const handleManualAdd = () => {
    setShowManualDialog(true);
  };

  const closeManualAdd = () => {
    setShowManualDialog(false);
  };

  const PlantUserNavbar = () => (
    <Navbar 
    style={NavbarStyles} 
    variant="dark" 
    expand="lg" 
    sticky="top" 
    className="py-3"
  >
    <Container fluid>
    <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3">
  <img 
    src={logo}
    width="50" 
    height="50" 
    className="d-inline-block align-top me-2" 
    alt="Logo" 
  />
  BTS
</Navbar.Brand>
      <Navbar.Toggle aria-controls="plant-navbar-nav" />
      <Navbar.Collapse id="plant-navbar-nav">
        <Nav className="ms-auto align-items-center">
          <Button 
            variant="outline-light" 
            className="me-2" 
            onClick={handleAddClick}
          >
            Add Item
          </Button>
          <Button 
            variant="danger" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );

  const CompanyAdminNavbar = () => (
    <Navbar 
    style={NavbarStyles} 
    variant="dark" 
    expand="lg" 
    sticky="top" 
    className="py-3"
  >
    <Container fluid>
    <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3">
  <img 
    src={logo}
    width="50" 
    height="50" 
    className="d-inline-block align-top me-2" 
    alt="Logo" 
  />
  BTS
</Navbar.Brand>

      <Navbar.Toggle aria-controls="company-admin-nav" />
      <Navbar.Collapse id="company-admin-nav">
        <Nav className="ms-auto align-items-center">
          <Button 
            variant="outline-light" 
            className="me-2" 
            onClick={() => navigate("/cadmindashboard")}
          >
            Dashboard
          </Button>
          <Button 
            variant="outline-light" 
            className="me-2" 
            onClick={handleManualAdd}
          >
            Add Item
          </Button>
          <NavDropdown 
              title={<span className="fs-5 text-white">{userName}</span>} 
              id="users-dropdown" 
              className="me-2"
            >
            <NavDropdown.Item onClick={() => navigate("/manageusers")}>
              Manage Users
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/createusers")}>
              Create Users
            </NavDropdown.Item>
          </NavDropdown>
          <Button 
            variant="danger" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );

  const MainAdminNavbar = () => (
    <Navbar 
    style={NavbarStyles} 
    variant="dark" 
    expand="lg" 
    sticky="top" 
    className="py-3"
  >
    <Container fluid>
    <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3">
  <img 
    src={logo}
    width="50" 
    height="50" 
    className="d-inline-block align-top me-2" 
    alt="Logo" 
  />
  BTS
</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-admin-nav" />
      <Navbar.Collapse id="main-admin-nav">
        <Nav className="ms-auto align-items-center">
          <Button 
            variant="outline-light" 
            className="me-2" 
            onClick={() => navigate("/mainadmin")}
          >
            Dashboard
          </Button>
          <NavDropdown 
              title={<span className="fs-5 text-white">{userName}</span>} 
              id="users-dropdown" 
              className="me-2"
            >
            <NavDropdown.Item onClick={() => navigate("/manageallusers")}>
              Manage Users
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/createallusers")}>
              Create Users
            </NavDropdown.Item>
          </NavDropdown>
          <Button 
            variant="danger" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );

  return (
    <>
      {userRole === "company admin" && <CompanyAdminNavbar />}
      {(userRole === "plant user" || userRole === "user") && <PlantUserNavbar />}
      {userRole === "main admin" && <MainAdminNavbar />}
      {children}
      {openScanner && (
        <QRCodeScanner onScanComplete={handleScanComplete} onClose={handleScannerClose} />
      )}
      {openDialog && (
        <AddItemDialog onClose={handleDialogClose} bNumber={bNumber} />
      )}
 {showManualDialog && (
        <ManualAddItems onClose={closeManualAdd} />
      )}        </>
  );
};

export default CustomNavbar;
