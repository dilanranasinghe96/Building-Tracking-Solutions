import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import CompanyAdminPage from "./pages/CompanyAdmin/CadminDashboard";
import CreatePlantUsers from "./pages/CompanyAdmin/Users/CreatePlantUsers";
import ManagePlantUsers from "./pages/CompanyAdmin/Users/ManagePlantUsers";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateAllUsers from "./pages/MainAdmin/CreateAllUsers";
import MainAdminPage from "./pages/MainAdmin/MainAdminPage";
import ManageAllUsers from "./pages/MainAdmin/ManageAllUsers";


function App() {
  // Get user role from localStorage
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      
      <div className="App" >
        <Navbar/>
    
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute allowedRoles={["plant user", "user"]} />}>
            <Route path="/home" element={<HomePage />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["company admin"]} />}>
            <Route path="/cadmindashboard" element={<CompanyAdminPage />} />
            <Route path="/createusers" element={<CreatePlantUsers />} />
            <Route path="/manageusers" element={<ManagePlantUsers />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["main admin"]} />}>
            <Route path="/mainadmin" element={<MainAdminPage />} />
            <Route path="/manageallusers" element={<ManageAllUsers />} />
            <Route path="/createallusers" element={<CreateAllUsers />} />

          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
