// import React, { useEffect, useState } from "react";

// const AddItemDialog = ({ onClose, bNumber }) => {
//   const [item, setItem] = useState(null);
//   const [damagePcs, setDamagePcs] = useState(0);
//   const [cutPanelShortage, setCutPanelShortage] = useState(0);
//   const [goodPcs, setGoodPcs] = useState(0);
//   const [errorMessage, setErrorMessage] = useState(""); // State for error message

//   // Fetch user data from local storage
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userPlant = user?.plant;

//   useEffect(() => {
//     if (bNumber) {
//       fetch(`http://localhost:8081/api/items/cut-out/${bNumber}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to fetch item details");
//           }
//           return response.json();
//         })
//         .then((fetchedItem) => {
//           // Check if the item.Plant matches the logged-in user's Plant
//           if (fetchedItem.Plant !== userPlant) {
//             setErrorMessage("You are not authorized to add this item. Plant mismatch.");
//             setTimeout(() => {
//               setErrorMessage("");
//               onClose(); // Close dialog automatically after 3 seconds
//             }, 3000);
//           } else {
//             setItem(fetchedItem);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching item details:", error);
//           setErrorMessage("Error fetching item details.");
//           setTimeout(() => setErrorMessage(""), 3000);
//         });
//     }
//   }, [bNumber, userPlant, onClose]);
  
  // useEffect(() => {
  //   if (item) {
  //     const goodPcs = item.Qty - damagePcs - cutPanelShortage;
  //     setGoodPcs(goodPcs);
  //   }
  // }, [item, damagePcs, cutPanelShortage]);

  // const handleDamagePcsChange = (e) => {
  //   setDamagePcs(parseInt(e.target.value) || 0);
  // };

  // const handleCutPanelShortageChange = (e) => {
  //   setCutPanelShortage(parseInt(e.target.value) || 0);
  // };

//   const handleSave = () => {
//     if (!item) {
//       setErrorMessage("Item data is not available. Please try again.");
//       setTimeout(() => setErrorMessage(""), 3000);
//       return;
//     }

//     const newItem = {
//       bno: item.bno,
//       SO: item.SO,
//       Style: item.Style,
//       Style_Name: item.Style_Name,
//       Cut_No: item.Cut_No,
//       Colour: item.Colour,
//       Size: item.Size,
//       BQty: item.Qty,
//       Plant: item.Plant,
//       Line: item.Line,
//       Damage_Pcs: damagePcs,
//       Cut_Panel_Shortage: cutPanelShortage,
//       Good_Pcs: item.Qty - damagePcs - cutPanelShortage,
//       User: user.username,
//     };

//     fetch("http://localhost:8081/api/items/addItem", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(newItem),
// })
//   .then(async (response) => {
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to add item. Please try again.");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("Item added successfully:", data);
//     alert("Item added successfully!");
//     onClose();
//   })
//   .catch((error) => {
//     setErrorMessage(error.message);
//     setTimeout(() => setErrorMessage(""), 3000);
//   });

//   };

//   return (
//     <div
//       className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
//       style={{ zIndex: 1050 }}
//     >
//       <div className="bg-white p-4 rounded shadow-lg w-40 h-75 overflow-auto">
//         <h2 className="text-center mb-3">Add Item</h2>
//         <h4 className="text-center mb-4">Scanned BNumber: {bNumber}</h4>

//         {/* Error Message Display */}
//         {errorMessage && (
//           <div
//             className="position-fixed top-0 start-50 translate-middle-x"
//             style={{ width: "auto", maxWidth: "80%" }}
//           >
//             <div className="alert alert-danger text-center mb-0">
//               {errorMessage}
//             </div>
//           </div>
//         )}

//         {/* Show form only if Plant matches */}
//         {item && (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped table-hover">
//               <tbody>
//                 <tr>
//                   <th>BNo</th>
//                   <td>{item.bno}</td>
//                 </tr>
//                 <tr>
//                   <th>SO</th>
//                   <td>{item.SO}</td>
//                 </tr>
//                 <tr>
//                   <th>Style</th>
//                   <td>{item.Style}</td>
//                 </tr>
//                 <tr>
//                   <th>Style Name</th>
//                   <td>{item.Style_Name}</td>
//                 </tr>
//                 <tr>
//                   <th>Cut No</th>
//                   <td>{item.Cut_No}</td>
//                 </tr>
//                 <tr>
//                   <th>Colour</th>
//                   <td>{item.Colour}</td>
//                 </tr>
//                 <tr>
//                   <th>Size</th>
//                   <td>{item.Size}</td>
//                 </tr>
//                 <tr>
//                   <th>BQty</th>
//                   <td>{item.Qty}</td>
//                 </tr>
//                 <tr>
//                   <th>Plant</th>
//                   <td>
//                     <button className="btn btn-info btn-sm">{item.Plant}</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Line</th>
//                   <td>
//                     <button className="btn btn-secondary btn-sm">
//                       {item.Line}
//                     </button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Damage Pcs</th>
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control form-control-sm"
//                       value={damagePcs}
//                       onChange={handleDamagePcsChange}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Cut Panel Shortage</th>
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control form-control-sm"
//                       value={cutPanelShortage}
//                       onChange={handleCutPanelShortageChange}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Good Pcs</th>
//                   <td>{goodPcs >= 0 ? goodPcs : 0}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="d-flex justify-content-end gap-2 mt-3">
//           <button className="btn btn-success" onClick={handleSave} disabled={!item}>
//             Save
//           </button>
//           <button className="btn btn-danger" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddItemDialog;



import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddItemDialog = ({ onClose, bNumber }) => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [damagePcs, setDamagePcs] = useState(0);
  const [cutPanelShortage, setCutPanelShortage] = useState(0);
  const [goodPcs, setGoodPcs] = useState(0); // Default to BQty
  const [errorMessage, setErrorMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userPlant = user?.plant;

  useEffect(() => {
    if (bNumber) {
      fetch(`http://localhost:8081/api/items/cut-out/${bNumber}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch item details");
          }
          return response.json();
        })
        .then((fetchedItem) => {
          // Check if the item.Plant matches the logged-in user's Plant
          if (fetchedItem.Plant !== userPlant) {
            setErrorMessage("You are not authorized to add this item. Plant mismatch.");
            setTimeout(() => {
              setErrorMessage("");
              onClose(); // Close dialog automatically after 3 seconds
            }, 3000);
          } else {
            setItem(fetchedItem);
            // Initialize Good_Pcs to BQty when the item is loaded
            setGoodPcs(fetchedItem.Qty || 0);
          }
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
          setErrorMessage("Error fetching item details.");
          setTimeout(() => setErrorMessage(""), 3000);
        });
    }
  }, [bNumber, userPlant, onClose]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setIsDirty(true);

  //   // Handle changes to Damage_Pcs and Cut_Panel_Shortage
  //   if (name === "Damage_Pcs" || name === "Cut_Panel_Shortage") {
  //     const newValue = value >= 0 ? Number(value) : 0;
  //     if (name === "Damage_Pcs") {
  //       setDamagePcs(newValue);
  //     } else {
  //       setCutPanelShortage(newValue);
  //     }
  //     // Recalculate Good_Pcs
  //     const newGoodPcs = Math.max(0, Number(item?.Qty) - newValue - Number(cutPanelShortage));
  //     setGoodPcs(newGoodPcs);
  //   }
  // };

  useEffect(() => {

    if (item) {
      const goodPcs = item.Qty - damagePcs - cutPanelShortage;
      setGoodPcs(goodPcs);
    }

    setIsDirty(true);
  }, [item, damagePcs, cutPanelShortage]);

  const handleDamagePcsChange = (e) => {
    setDamagePcs(parseInt(e.target.value) || 0);
  };

  const handleCutPanelShortageChange = (e) => {
    setCutPanelShortage(parseInt(e.target.value) || 0);
  };



  const handleSave = () => {
    if (!item) {
      setErrorMessage("Item data is not available.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const newItem = {
      ...item,
      Damage_Pcs: damagePcs,
      Cut_Panel_Shortage: cutPanelShortage,
      Good_Pcs: goodPcs,
      User: user.username,
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
      .then(() => {
        setIsDirty(false);
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

  const handleClose = () => {
    if (isDirty) {
      setShowCloseModal(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    onClose();
  };

  const modalRef = React.useRef();
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
        setShowCloseModal(true);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isDirty]);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div ref={modalRef} className="bg-white p-4 rounded shadow-lg" style={{ width: "90%", maxWidth: "800px", maxHeight: "90vh", overflow: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Add Item</h2>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </div>

        {errorMessage && (
          <div className="alert alert-danger mb-3">
            {errorMessage}
          </div>
        )}

        <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
          {/* Item Details */}
          {item && (
            <>
              <div className="col-md-6">
                <label className="form-label">BNumber*</label>
                <input type="text" className="form-control" value={item.bno} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">SO Number*</label>
                <input type="text" className="form-control" value={item.SO} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Style*</label>
                <input type="text" className="form-control" value={item.Style} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Style Name*</label>
                <input type="text" className="form-control" value={item.Style_Name} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Cut No*</label>
                <input type="text" className="form-control" value={item.Cut_No} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Colour*</label>
                <input type="text" className="form-control" value={item.Colour} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Size*</label>
                <input type="text" className="form-control" value={item.Size} readOnly />
              </div>
              <div className="col-md-4">
            <label className="form-label">Plant*</label>
            <input type="text" className="form-control" value={item?.Plant} readOnly />
          </div>

          <div className="col-md-4">
            <label className="form-label">Bundle Quantity*</label>
            <input
              type="number"
              className="form-control"
              value={item?.Qty}
              readOnly
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Damage Pieces</label>
            <input
              type="number"
              className="form-control"
              value={damagePcs}
              onChange={handleDamagePcsChange}
              min="0"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Cut Panel Shortage</label>
            <input
              type="number"
              className="form-control"
              value={cutPanelShortage}
              onChange={handleCutPanelShortageChange}
              min="0"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Good Pieces</label>
            <input
              type="number"
              className="form-control"
              value={goodPcs}
              readOnly
            />
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-success px-4" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary px-4" onClick={handleClose}>
            Close
          </button>
        </div>
            </>
          )}
          
          
        </form>

        
      </div>

      {/* Confirmation Modal */}
      <Modal show={showCloseModal} onHide={() => setShowCloseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unsaved Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close without saving the changes?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCloseModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmClose}>
            Yes, Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Alert */}
      <Alert show={showSuccessAlert} variant="success" className="position-absolute top-50 start-50 translate-middle">
        Item successfully added.
      </Alert>
    </div>
  );
};

export default AddItemDialog;
