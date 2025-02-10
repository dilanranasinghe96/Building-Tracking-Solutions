
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Alert, Button, Container, Form } from "react-bootstrap";
// import {  useNavigate } from "react-router-dom";
// import { Lock, User } from 'lucide-react';


// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is already logged in and navigate accordingly
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       if (user.role === "company admin") {
//         // If user is 'company admin', navigate to company admin page
//         navigate("/companyadmin");
//       }
//       else if (user.role === "main admin") {
//         // If user is 'main admin', navigate to main admin page
//         navigate("/mainadmin"); 
//       }
      
//       else {
//         // Otherwise, navigate to home page
//         navigate("/home");
//       }
//     }
//   }, [navigate]); // Run only once when the component mounts

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/api/auth/login", {
//         username,
//         password,
//       });

//       // Store user info in localStorage
//       // localStorage.setItem("user", JSON.stringify(response.data.user));

//       // Store user info properly in localStorage
//     const userData = {
//       username: response.data.user.username,
//       email: response.data.user.email, // Ensure backend sends 'email'
//       role: response.data.user.role,
//       plant: response.data.user.plant, // Ensure backend sends 'plant'
//     };

//     localStorage.setItem("user", JSON.stringify(userData));

//       // Redirect based on the user role
//       if (userData.role === "company admin") {
//         navigate("/cadmindashboard");
//       } else if (userData.role === "plant user" || userData.role === "user") {
//         navigate("/home");
//       } else if (userData.role === "main admin") {
//         navigate("/mainadmin");
//       }
//     } catch (error) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div 
//       style={{
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
//         minHeight: '100vh', 
//         display: 'flex', 
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <Container 
//         className="d-flex justify-content-center align-items-center"
//         style={{ maxWidth: '500px' }}
//       >
//         <div 
//           className="card shadow-lg" 
//           style={{ 
//             width: '100%', 
//             backgroundColor: 'rgba(255,255,255,0.9)',
//             borderRadius: '15px',
//             padding: '30px'
//           }}
//         >
//           <div className="text-center mb-4">
//             <Lock color="#764ba2" size={50} className="mb-3" />
//             <h2 className="text-primary">Login</h2>
//           </div>

//           {error && <Alert variant="danger">{error}</Alert>}

//           <Form onSubmit={handleLogin}>
//             <Form.Group controlId="username" className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <div className="input-group">
//                 <span className="input-group-text">
//                   <User size={20} />
//                 </span>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   className="form-control-lg"
//                 />
//               </div>
//             </Form.Group>

//             <Form.Group controlId="password" className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <div className="input-group">
//                 <span className="input-group-text">
//                   <Lock size={20} />
//                 </span>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="form-control-lg"
//                 />
//               </div>
//             </Form.Group>

//             <Button 
//               variant="primary" 
//               type="submit" 
//               className="w-100 py-2 mb-3 btn-lg"
//             >
//               Login
//             </Button>

//             {/* <p className="text-center">
//               Don't have an account?{" "}
//               <Link 
//                 to="/register" 
//                 className="text-decoration-none fw-bold"
//               >
//                 Register
//               </Link>
//             </p> */}
//           </Form>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default LoginPage;



import { Lock, User } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "company admin") {
        navigate("/companyadmin");
      } else if (user.role === "main admin") {
        navigate("/mainadmin");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
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

      if (userData.role === "company admin") {
        navigate("/cadmindashboard");
      } else if (userData.role === "plant user" || userData.role === "user") {
        navigate("/home");
      } else if (userData.role === "main admin") {
        navigate("/mainadmin");
      }
    } catch (error) {
      setError(error.message);
    }
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
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
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
    </div>
  );
}

export default LoginPage;
