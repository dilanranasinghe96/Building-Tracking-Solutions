
import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateAllUsers() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [plant, setPlant] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setError("Password must be at least 8 characters long and contain at least one letter, one number, and one special character");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address");
      return false;
    }
    if (role === "plant user" && !plant) {
      setError("Please select a plant");
      return false;
    }
    return true;
  };

 const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          phone,
          role,
          plant: role === "plant user" ? plant : " ",
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.message === "User registered successfully") {
        navigate("/ManageAllUsers");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed");
    }
  };

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center'
      }}>
        <Container  className="d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" 
          style={{ 
            maxWidth: '500px', 
            width: '100%', 
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '15px',
            padding: '30px'
          }}>
        <h2 className="text-center text-primary mb-4">Register Users</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mb-3" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-3" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-3" />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mb-3" />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mb-3" />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required className="mb-3">
              <option value="">Select Role</option>
              <option value="company admin">Company Admin</option>
              <option value="plant user">Plant User</option>
              
            </Form.Control>
          </Form.Group>
          {role === "plant user" && (
            <Form.Group controlId="plant">
              <Form.Label>Plant</Form.Label>
              <Form.Control as="select" value={plant} onChange={(e) => setPlant(e.target.value)} required className="mb-3">
                <option value="">Select Plant</option>
                <option value="CTM-D">CTM-D</option>
                <option value="CTM-P">CTM-P</option>
                <option value="CTM-M">CTM-M</option>
              </Form.Control>
            </Form.Group>
          )}
          <Button variant="primary" type="submit" className="w-100 py-2 mb-3">Register</Button>
        </Form>
      </div>
    </Container>


    </div>
    
  );
}

export default CreateAllUsers;
