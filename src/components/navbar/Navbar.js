import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  Printer,
  Proportions,
  QrCode,
  UserPlus,
  Users
} from "lucide-react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import ManualAddItems from "../ManuallAddItems/ManualAddItems";
import ScannerWithForm from '../ScannerWithForm';



const NavbarStyles = {
  background: 'linear-gradient(to right, #2c3e50, #3498db)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',  
};

const CustomNavbar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showManualDialog, setShowManualDialog] = useState(false);

  const [showScanner, setShowScanner] = useState(false);


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
    setShowScanner(true);
  };


  const handleScannerClose = () => {
    setShowScanner(false);
  };




  const handleManualAdd = () => {
    setShowManualDialog(true);
  };

  const closeManualAdd = () => {
    setShowManualDialog(false);
  };

  const PlantUserNavbar = () => (
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        
      
        <Navbar.Toggle aria-controls="plant-navbar-nav"/>
        <Navbar.Collapse id="plant-navbar-nav">
          <Nav className="ms-auto align-items-center">
          

            <div className="d-flex flex-column flex-md-row gap-3 p-2">
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
            <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cadmindashboard")}>
                <LayoutDashboard size={20} />
                Dashboard
              </Button>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleAddClick}>
                <QrCode size={20} />
                QR Scan
              </Button>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleManualAdd}>
                <Plus size={20} />
                Manual Add
              </Button>
              {/* <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" href="/fgStock">
              <Package size={20} />
                Fg Stock
              </Button> */}
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/home")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg List
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/fgStock")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/FgSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Summary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ProductionSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock Summary
                </NavDropdown.Item> 

                <NavDropdown.Item onClick={() => navigate("/WipProducton")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production
                </NavDropdown.Item> 
 
                <NavDropdown.Item onClick={() => navigate("/WipSummaryPlant")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production Summary
                </NavDropdown.Item> 
               
              </NavDropdown>
              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );




  //cutin navbar
  const CutInNavbar = () => (
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/cutintag" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="plant-navbar-nav" />
        <Navbar.Collapse id="plant-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <div className="d-flex flex-column flex-md-row gap-3 p-2">
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
            <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                
                <NavDropdown.Item onClick={() => navigate("/WipCutting")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipCuttingSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting Summary
                </NavDropdown.Item>              
               
              </NavDropdown>
              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  const CompanyAdminNavbar = () => (
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="company-admin-nav" />
        <Navbar.Collapse id="company-admin-nav">
          <Nav className="ms-auto align-items-center">
            <div className="d-flex flex-column flex-md-row gap-2 p-2">
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cadmindashboard")}>
                <LayoutDashboard size={20} />
                Dashboard
              </Button>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleManualAdd}>
                <Plus size={20} />
                Add Item
              </Button>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/home")}>
                <Package size={20} />
                Finish Goods
              </Button>
              
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cutintag")}>
                <Printer size={20} />
                Print Tag
              </Button>
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/fgStock")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/FgSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Summary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ProductionSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock Summary
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipProducton")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production
                </NavDropdown.Item> 
 
                <NavDropdown.Item onClick={() => navigate("/WipSummaryPlant")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production Summary
                </NavDropdown.Item>  
                
                
                <NavDropdown.Item onClick={() => navigate("/WipCutting")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipCuttingSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting Summary
                </NavDropdown.Item>              
               
              </NavDropdown>             
               
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Users size={20} className="me-2 "/>
                    {userName}
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/manageusers")} className="d-flex align-items-center gap-2">
                  <Users size={20}/>
                  Manage Users
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/createusers")} className="d-flex align-items-center gap-2">
                  <UserPlus  size={20}/>
                  Create Users
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20}/>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  const MainAdminNavbar = () =>(
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="company-admin-nav" />
        <Navbar.Collapse id="company-admin-nav">
          <Nav className="ms-auto align-items-center">
            <div className="d-flex flex-column flex-md-row gap-2 p-2">
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cadmindashboard")}>
                <LayoutDashboard size={20} />
                Dashboard
              </Button>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleManualAdd}>
                <Plus size={20} />
                Add Item
              </Button>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/home")}>
                <Package size={20} />
                Finish Goods
              </Button>
              
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cutintag")}>
                <Printer size={20} />
                Print Tag
              </Button>
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/fgStock")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/FgSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Summary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ProductionSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock Summary
                </NavDropdown.Item>     

                <NavDropdown.Item onClick={() => navigate("/WipProducton")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production
                </NavDropdown.Item> 
 
                <NavDropdown.Item onClick={() => navigate("/WipSummaryPlant")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production Summary
                </NavDropdown.Item>  
                <NavDropdown.Item onClick={() => navigate("/WipCutting")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipCuttingSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting Summary
                </NavDropdown.Item>       
               
              </NavDropdown>
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Users size={20} className="me-2 "/>
                    {userName}
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/manageallusers")} className="d-flex align-items-center gap-2">
                  <Users size={20}/>
                  Manage Users
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/createallusers")} className="d-flex align-items-center gap-2">
                  <UserPlus  size={20}/>
                  Create Users
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20}/>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

    
  const AllViewNavbar = () => (
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="company-admin-nav" />
        <Navbar.Collapse id="company-admin-nav">
          <Nav className="ms-auto align-items-center">
            <div className="d-flex flex-column flex-md-row gap-2 p-2">
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cadmindashboard")}>
                <LayoutDashboard size={20} />
                Dashboard
              </Button>
             
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/home")}>
                <Package size={20} />
                Finish Goods
              </Button>
              
             
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/fgStock")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/FgSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Summary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ProductionSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock Summary
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipProducton")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production
                </NavDropdown.Item> 
 
                <NavDropdown.Item onClick={() => navigate("/WipSummaryPlant")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production Summary
                </NavDropdown.Item>    
                <NavDropdown.Item onClick={() => navigate("/WipCutting")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipCuttingSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting Summary
                </NavDropdown.Item>                 
               
              </NavDropdown>

              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20}/>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  const PlantViewNavbar = () => (
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/cadmindashboard" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="company-admin-nav" />
        <Navbar.Collapse id="company-admin-nav">
          <Nav className="ms-auto align-items-center">
            <div className="d-flex flex-column flex-md-row gap-2 p-2">
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/cadmindashboard")}>
                <LayoutDashboard size={20} />
                Dashboard
              </Button>
             
              <Button variant="outline-light" className="px-3 py-2 d-flex align-items-center gap-2" onClick={() => navigate("/home")}>
                <Package size={20} />
                Finish Goods
              </Button>
              
             
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                <NavDropdown.Item onClick={() => navigate("/fgStock")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/FgSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Summary
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/ProductionSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Fg Stock Summary
                </NavDropdown.Item>  
                <NavDropdown.Item onClick={() => navigate("/WipProducton")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production
                </NavDropdown.Item> 
 
                <NavDropdown.Item onClick={() => navigate("/WipSummaryPlant")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Production Summary
                </NavDropdown.Item>              
               
              </NavDropdown>

              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20}/>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );



  const CuttingViewNavbar = () => (
    <Navbar style={NavbarStyles} variant="dark" expand="lg" sticky="top" className="py-2">
      <Container fluid>
        <Navbar.Brand href="/WipCuttingSummary" className="fw-bold fs-3 text-center">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
          BTS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="company-admin-nav" />
        <Navbar.Collapse id="company-admin-nav">
          <Nav className="ms-auto align-items-center">
            <div className="d-flex flex-column flex-md-row gap-2 p-2">
              
            <Navbar.Text className="fw-semi-bold text-white fs-5 pe-4 ">
              Welcome {userName}
            </Navbar.Text>
             
              <NavDropdown 
                title={
                  <span className="text-white align-items-center gap-2 ">
                    <Proportions size={20} className="me-2 "/>
                    Report
                  </span>
                } 
                id="users-dropdown" 
                className="me-2 border-0"
              >
                
                <NavDropdown.Item onClick={() => navigate("/WipCutting")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting
                </NavDropdown.Item> 
                <NavDropdown.Item onClick={() => navigate("/WipCuttingSummary")} className="d-flex align-items-center gap-2">
                  <Package size={20}/>
                  Wip Cutting Summary
                </NavDropdown.Item>              
               
              </NavDropdown>

              <Button variant="warning" className="px-3 py-2 d-flex align-items-center gap-2" onClick={handleLogout}>
                <LogOut size={20}/>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  



  return (
    <>
      {userRole === "company admin" && <CompanyAdminNavbar />}
      {(userRole === "plant user") && <PlantUserNavbar />}
      {userRole === "main admin" && <MainAdminNavbar />}
      {userRole === "cut in" && <CutInNavbar />}
      {userRole === "all view" && <AllViewNavbar />}
      {userRole === "plant view" && <PlantViewNavbar />}
      {userRole === "cutting view" && <CuttingViewNavbar />}
      {children}
      {showScanner && (
        <ScannerWithForm onClose={handleScannerClose} />
      )}
           {showManualDialog && (
        <ManualAddItems onClose={closeManualAdd} />
       )}          
     
    </>
  );
};

export default CustomNavbar;