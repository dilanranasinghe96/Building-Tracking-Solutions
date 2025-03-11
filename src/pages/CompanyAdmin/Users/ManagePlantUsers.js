import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';


function ManageAllUsers() {
  const [plantUsers, setPlantUsers] = useState([]);
  const [cutinUsers, setCutinUsers] = useState([]);
  const [allViewUsers, setAllViewUsers] = useState([]);
  const [plantViewUsers, setPlantViewUsers] = useState([]);
  const [cuttingViewUsers, setCuttingViewUsers] = useState([]);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ 
    show: false, 
    userId: null, 
    userType: '' 
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  
  // Fetch users from the backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/auth/users`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  })
  .then((data) => {
    const plantUsers = data.filter((user) => user.role === "plant user");
    const cutinUsers = data.filter((user) => user.role === "cut in");
    const allViewUsers = data.filter((user) => user.role === "all view");
    const plantViewUsers = data.filter((user) => user.role === "plant view");
    const cuttingViewUsers = data.filter((user) => user.role === "cutting view");

    setPlantUsers(plantUsers);
    setCutinUsers(cutinUsers);
    setAllViewUsers(allViewUsers);
    setPlantViewUsers(plantViewUsers);
    setCuttingViewUsers(cuttingViewUsers);

  })
  .catch(() => {
    setError("Failed to fetch users");
  });

  }, [BASE_URL]);
  
  const handleDelete = (userId, userType) => {
    // Open confirmation modal without deleting immediately
    setDeleteModal({ 
      show: true, 
      userId: userId, 
      userType: userType 
    });
  };
  
  const confirmDelete = () => {
    const { userId, userType } = deleteModal;
  
    
    fetch(`${BASE_URL}/api/auth/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
         else if (userType === "plant user") {
          setPlantUsers(plantUsers.filter((user) => user.id !== userId));
        }
        else if (userType === "cut in") {
          setCutinUsers(cutinUsers.filter((user) => user.id !== userId));
        }
        else if (userType === "all view") {
          setAllViewUsers(allViewUsers.filter((user) => user.id !== userId));
        }
        else if (userType === "plant view") {
          setPlantViewUsers(plantViewUsers.filter((user) => user.id !== userId));
        }
        else if (userType === "cutting view") {
          setCuttingViewUsers(cuttingViewUsers.filter((user) => user.id !== userId));
        }
        // Close the modal after successful deletion
        setDeleteModal({ show: false, userId: null, userType: "" });
      })
      .catch(() => {
        setError("Failed to delete user");
        // Close the modal even if deletion fails
        setDeleteModal({ show: false, userId: null, userType: "" });
      });
    
  };
  
  
  return (
    <div 
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh', 
      padding: '50px 0'
    }}
  >
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="justify-content-center">
      <Col md={6} className="justify-content-center">

     

      
        <div 
          className="bg-white rounded shadow-lg p-4 mb-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <h3 className="text-center text-primary mb-4">Plant Users</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Plant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plantUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.plant}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user.id, "plant user")}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div 
          className="bg-white rounded shadow-lg p-4 mb-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <h3 className="text-center text-primary mb-4">Cutting Users</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cutinUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user.id, "company admin")}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>



        <div 
          className="bg-white rounded shadow-lg p-4 mb-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <h3 className="text-center text-primary mb-4">All View Users</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allViewUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user.id, "main admin")}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      

        <div 
          className="bg-white rounded shadow-lg p-4 mb-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <h3 className="text-center text-primary mb-4">Plant View Users</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Plant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plantViewUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.plant}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user.id, "main admin")}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>


        <div 
          className="bg-white rounded shadow-lg p-4 mb-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <h3 className="text-center text-primary mb-4">Cutting View Users</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cuttingViewUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(user.id, "main admin")}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

    </Col>     
        </Row> 

      <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, user: null, type: '' })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {deleteModal.user?.type}?
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setDeleteModal({ show: false, user: null, type: '' })}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </div>
  );
}

export default ManageAllUsers;
