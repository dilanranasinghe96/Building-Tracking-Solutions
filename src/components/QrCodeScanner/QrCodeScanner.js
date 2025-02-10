// import jsQR from "jsqr";
// import React, { useEffect, useState } from "react";
// import "./QrCodeScanner.css";

// const QRCodeScanner = ({ onScanComplete, onClose }) => {
//   const videoRef = React.useRef(null);
//   const canvasRef = React.useRef(null);
//   const [error, setError] = useState(null);
//   const [isScannerRunning, setIsScannerRunning] = useState(false); // State to track if scanner is already running

//   const startScanner = async () => {
//     if (isScannerRunning) return; // Prevent starting the scanner if it's already running

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });

//       const video = videoRef.current;
//       if (video.srcObject) {
//         video.srcObject.getTracks().forEach(track => track.stop());
//       }

//       video.srcObject = stream;
//       video.setAttribute("playsinline", true);
//       video.play();
//       setIsScannerRunning(true); // Mark the scanner as running
//       requestAnimationFrame(scanQRCode);
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//       setError("Camera access denied. Please enable camera permissions.");
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject;
//       const tracks = stream.getTracks();
//       tracks.forEach(track => track.stop()); // Stop each track
//       videoRef.current.srcObject = null; // Clear the video source
//       setIsScannerRunning(false); // Reset scanner status
//     }
//   };

//   const handleCloseScanner = () => {
//     stopCamera();  // Stop the camera
//     onClose();  // Close the scanner UI
//     window.close();  // Close the window/tab
//   };

//   const scanQRCode = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (!canvas) {
//       console.error("Canvas not found");
//       return; // Exit if canvas is not available
//     }

//     const context = canvas.getContext("2d");
//     if (!context) {
//       console.error("Failed to get canvas context");
//       return; // Exit if canvas context is not available
//     }

//     if (video.readyState === video.HAVE_ENOUGH_DATA) {
//       canvas.height = video.videoHeight;
//       canvas.width = video.videoWidth;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const code = jsQR(imageData.data, imageData.width, imageData.height);

//       if (code) {
//         const scannedBNumber = code.data;
//         console.log("Scanned BNumber:", scannedBNumber);

//         // Call onScanComplete with the scanned bNumber
//         onScanComplete(scannedBNumber);

//         // Stop video stream
//         video.srcObject.getTracks().forEach((track) => track.stop());
//         return;
//       }
//     }
//     requestAnimationFrame(scanQRCode);
//   };

//   // Start the scanner when the component mounts
//   useEffect(() => {
//     startScanner();
//     return () => {
//       stopCamera(); // Cleanup and stop camera when component unmounts
//     };
//   }, []); // Empty dependency array means this effect runs only once when the component mounts

//   return (
//     <div className="dialog-container">
//       {error && <p className="error-message">{error}</p>}
//       <div className="scanner-container">
//         <video ref={videoRef} style={{ width: "100%", maxHeight: "300px" }}></video>
//       </div>
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       <button onClick={handleCloseScanner} className="close-scanner-btn">Close Scanner</button>
//     </div>
//   );
// };

// export default QRCodeScanner;


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For Bootstrap components like modals, tooltips, etc.
import jsQR from "jsqr";
import React, { useCallback, useRef, useState } from "react";



const QRCodeScanner = ({ onScanComplete, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [error, setError] = useState(null);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);
  
  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      const video = videoRef.current;
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      scanQRCode();
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Camera access denied. Please enable camera permissions.");
    }
  };
  
  const handleCloseScanner = () => {
    stopCamera();
    onClose();
  };
  
  const scanQRCode = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Check if video or canvas are null before proceeding
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        const scannedBNumber = code.data;
        console.log("Scanned BNumber:", scannedBNumber);

        onScanComplete(scannedBNumber);
        stopCamera();
        return;
      }
    }
    
    // Only request next animation frame if not already stopped
    animationFrameRef.current = requestAnimationFrame(scanQRCode);
  }, [onScanComplete, stopCamera]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex flex-column justify-content-center align-items-center" style={{ zIndex: 1050 }}>
    {error && <p className="error-message text-danger mb-3">{error}</p>}
    <div className="scanner-container w-40 max-w-400px bg-white rounded-3 p-4 shadow-sm text-center">
      <video
        ref={videoRef}
        className="w-100 rounded-2 mb-3v"
        style={{ maxHeight: "300px", objectFit: "cover" }}
      ></video>
    </div>
    <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    <div className="d-flex gap-2 p-3">
      <button onClick={startScanner} className="btn btn-primary flex-grow-1">
        Start Scanner
      </button>
      <button onClick={handleCloseScanner} className="btn btn-danger flex-grow-1">
        Close Scanner
      </button>
    </div>
  </div>
  
  );
};

export default QRCodeScanner;