import { Eye, EyeOff, Lock, User } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "company admin" || user.role === "main admin" || user.role === "all view" || user.role === "plant view") {
        navigate("/cadmindashboard");       
      }
      else if (user.role === "plant user") {
        navigate("/cadmindashboard");
      }
       else if (user.role === "cut in") {
        navigate("/cutintag");
      }
      
      else if (user.role === "cutting view") {
        navigate("/WipCutting");
      }
      
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const data = await response.json();
      
      const userData = {
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
        plant: data.user.plant,
      };
  
      localStorage.setItem("user", JSON.stringify(userData));
  
      // Show success alert
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        
  
        // Navigate based on role
        if (userData.role === "company admin" || userData.role === "main admin" || userData.role === "all view" || userData.role === "plant view")  {
          navigate("/cadmindashboard");
        } else if (userData.role === "plant user") {
          navigate("/cadmindashboard");
        }  else if (userData.role === "cut in") {
          navigate("/cutintag");
        }        
        else if (userData.role === "cutting view") {
          navigate("/WipCuttingSummary");
        }
      }, 1500);
      
    } catch (error) {
      setError(error.message);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container 
        className="d-flex justify-content-center align-items-center"
        style={{ maxWidth: '500px' }}
      >
        <div 
          className="card shadow-lg" 
          style={{ 
            width: '100%', 
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '15px',
            padding: '30px'
          }}
        >
          <div className="text-center mb-4">
            <Lock color="#764ba2" size={40} className="mb-3" />
            <h2 className="text-primary">Login</h2>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <User size={20} />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock size={20} />
                </span>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 mb-3 btn"
            >
              Login
            </Button>
          </Form>
        </div>
      </Container>

       {/* Success Alert */}
       <Alert 
         show={showSuccessAlert} 
        variant="success" 
        className="position-absolute top-50 start-50 translate-middle-x p-2 px-4"
      >
         Login Successfully!
      </Alert>

    </div>

    
  );
}

export default LoginPage;