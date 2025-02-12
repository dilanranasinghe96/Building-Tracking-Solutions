import React, { useState } from "react";
import { Button, Modal,Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManualAddItems = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bno: "",
    SO: "",
    Style: "",
    Style_Name: "",
    Cut_No: "",
    Colour: "",
    Size: "",
    Qty: "",
    Plant: "",
    Line: "",
    Damage_Pcs: 0,
    Cut_Panel_Shortage: 0,
    Good_Pcs: 0
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);



  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (['Qty', 'Damage_Pcs', 'Cut_Panel_Shortage'].includes(name)) {
        newData.Good_Pcs = Math.max(0, 
          Number(newData.Qty) - 
          Number(newData.Damage_Pcs) - 
          Number(newData.Cut_Panel_Shortage)
        );
      }
      
      return newData;
    });
  };

  const handleClose = () => {
    if (isDirty) {
     
       
        setShowCloseModal(true);
      
    } else {
      onClose(); 
    }
  };

  const confirmClose = () => {
    onClose();
    }

  const handleSave = () => {
    const requiredFields = [
      'bno', 'SO', 'Style', 'Style_Name', 'Cut_No', 
      'Colour', 'Size', 'Qty', 'Plant', 'Line'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    
    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      setTimeout(() => setErrorMessage(""), 3000);
      
      return;
    }

    const newItem = {
      ...formData,
      User: user.username
    };

    fetch("http://localhost:8081/api/items/addItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add item.");
        }
        return response.json();
      })
      .then((data) => {
        setIsDirty(false);
        // alert("Item added successfully!");  
        setShowSuccessAlert(true);
        setTimeout(() => {
            navigate("/CadminDashboard");
            onClose();
          }, 1500);
        })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(""), 3000);
      });
  };

 

  // Handle click outside modal
  const modalRef = React.useRef();
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
        setShowCloseModal(true);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isDirty]);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      {/* Rest of your JSX remains the same */}
      <div ref={modalRef} className="bg-white p-4 rounded shadow-lg" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Add Item</h2>
          <button 
            type="button" 
            className="btn-close" 
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>

        {errorMessage && (
          <div className="alert alert-danger mb-3">
            {errorMessage}
          </div>
        )}


        <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-6">
            <label className="form-label">BNumber*</label>
            <input
              type="text"
              className="form-control"
              name="bno"
              value={formData.bno}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">SO Number*</label>
            <input
              type="text"
              className="form-control"
              name="SO"
              value={formData.SO}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Style*</label>
            <input
              type="text"
              className="form-control"
              name="Style"
              value={formData.Style}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Style Name*</label>
            <input
              type="text"
              className="form-control"
              name="Style_Name"
              value={formData.Style_Name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Cut No*</label>
            <input
              type="text"
              className="form-control"
              name="Cut_No"
              value={formData.Cut_No}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Colour*</label>
            <input
              type="text"
              className="form-control"
              name="Colour"
              value={formData.Colour}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Size*</label>
            <input
              type="text"
              className="form-control"
              name="Size"
              value={formData.Size}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
  <label className="form-label">Plant*</label>
  <select
    className="form-select"
    name="Plant"
    value={formData.Plant}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Plant</option>
    <option value="CTM-P">CTM-P</option>
    <option value="CTM-D">CTM-D</option>
    <option value="CTM-M">CTM-M</option>
  </select>
</div>

          <div className="col-md-4">
            <label className="form-label">Line*</label>
            <input
              type="text"
              className="form-control"
              name="Line"
              value={formData.Line}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
  <label className="form-label">Bundle Quantity*</label>
  <input
    type="number"
    className="form-control"
    name="Qty"
    value={formData.Qty}
    onChange={(e) => {
      const value = parseInt(e.target.value, 10);
      handleInputChange({
        target: { name: "Qty", value: value >= 0 ? value : 0 },
      });
    }}
    min="0"
    required
  />
</div>

          <div className="col-md-4">
            <label className="form-label">Damage Pieces</label>
            <input
              type="number"
              className="form-control"
              name="Damage_Pcs"
              value={formData.Damage_Pcs}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                handleInputChange({
                  target: { name: "Damage_Pcs", value: value >= 0 ? value : 0 },
                });
              }}
              min="0"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Cut Panel Shortage</label>
            <input
              type="number"
              className="form-control"
              name="Cut_Panel_Shortage"
              value={formData.Cut_Panel_Shortage}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                handleInputChange({
                  target: { name: "Cut_Panel_Shortage", value: value >= 0 ? value : 0 },
                });
              }}
              min="0"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Good Pieces</label>
            <input
              type="number"
              className="form-control"
              value={formData.Good_Pcs}
              readOnly
            />
          </div>
        </form>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-success px-4" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary px-4" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
      <Modal show={showCloseModal} onHide={() => setShowCloseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Close</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close this window?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCloseModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {showSuccessAlert && (
  <Alert 
    className="mb-3 position-fixed top-50 start-50 translate-middle-x" 
    variant="success" 
    onClose={() => setShowSuccessAlert(false)} 
    dismissible
  >
    Item added successfully!
  </Alert>
)}


    </div>
  );
};

export default ManualAddItems;

