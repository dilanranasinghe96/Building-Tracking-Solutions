import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AutoLogout from "./components/AutoLogout/AutoLogout";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import CompanyAdminPage from "./pages/CompanyAdmin/CadminDashboard";
import CreatePlantUsers from "./pages/CompanyAdmin/Users/CreatePlantUsers";
import ManagePlantUsers from "./pages/CompanyAdmin/Users/ManagePlantUsers";
import CutInTag from "./pages/CutInTag/CutInTag";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateAllUsers from "./pages/MainAdmin/CreateAllUsers";
import MainAdminPage from "./pages/MainAdmin/MainAdminPage";
import ManageAllUsers from "./pages/MainAdmin/ManageAllUsers";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FgStock from "./pages/Report/FgStock";
import FgSummary from "./pages/Report/FgSummary";
import ProductionSummary from "./pages/Report/ProductionSummary";
import WipCutting from "./pages/Report/WipCutting";
import WipCuttingSummary from "./pages/Report/WipCuttingSummary";
import WipProducton from "./pages/Report/WipProducton";
import WipProductonSummary from "./pages/Report/WipProductonSummary";
import WipSummaryPlant from "./pages/Report/WipSummaryPlant";



function App() {
  // Get user role from localStorage
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      
      <div className="App" >
      <AutoLogout />
        <Navbar/>
    
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute allowedRoles={["plant user", "company admin","main admin","all view","plant view"]} />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/fgStock" element={<FgStock />} />
            <Route path="/FgSummary" element={<FgSummary />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["company admin","main admin"]} />}>
           
            <Route path="/createusers" element={<CreatePlantUsers />} />
            <Route path="/manageusers" element={<ManagePlantUsers />} />
            
          </Route>

          <Route element={<PrivateRoute allowedRoles={["company admin","main admin","all view","plant view"]} />}>
            <Route path="/cadmindashboard" element={<CompanyAdminPage />} />            
          </Route>


          <Route element={<PrivateRoute allowedRoles={["company admin","main admin","plant user","all view","plant view"]} />}>           
            <Route path="/ProductionSummary" element={<ProductionSummary />} />
            <Route path="/WipProducton" element={<WipProducton />} />
            <Route path="/WipProductonSummary" element={<WipProductonSummary />} />
            <Route path="/WipSummaryPlant" element={<WipSummaryPlant />} />
            
          </Route>

          <Route element={<PrivateRoute allowedRoles={["company admin","main admin","all view","cutting view","cut in"]} />}>
            <Route path="/WipCutting" element={<WipCutting />} />      
            <Route path="/WipCuttingSummary" element={<WipCuttingSummary />} />      
          </Route>




          <Route element={<PrivateRoute allowedRoles={["main admin"]} />}>
            <Route path="/mainadmin" element={<MainAdminPage />} />
            <Route path="/manageallusers" element={<ManageAllUsers />} />
            <Route path="/createallusers" element={<CreateAllUsers />} />
            
          </Route>
          <Route element={<PrivateRoute allowedRoles={["cut in","company admin","main admin"]} />}>
            <Route path="/cutintag" element={<CutInTag />} />
           
          </Route>

          

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
