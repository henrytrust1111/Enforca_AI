"use client";
import React, { useState, useEffect } from "react";
import { Dropbox, GoogleDrive } from "../icons/Icons";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

interface CVUploadProps {
  onBack: () => void;
}

const CVUpload: React.FC<CVUploadProps> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.name.toLowerCase().endsWith(".pdf"))
    ) {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are supported.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Only PDF files are supported.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleGoogleDriveUpload = () => {
    alert("Google Drive upload functionality to be implemented.");
  };

  const handleDropboxUpload = () => {
    alert("Dropbox upload functionality to be implemented.");
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type === "application/pdf") {
            const file = items[i].getAsFile();
            if (file) {
              setFile(file);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-6">
      {/* Phase 1: Drag and Drop Box */}
      <div
        className={`relative w-full max-w-md py-8 px-3 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-4 ${
          isDragging ? "border-[#111D63]" : "border-[#00031633]"
        } bg-[#F3F8FE]`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept="application/pdf"
        />
        {file ? (
          <div className="text-center w-full">
            {/* Close icon positioned at the top right */}
            <button
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Remove file"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
            {/* Display the uploaded PDF */}
            <div className="flex flex-col items-center">
              <embed
                src={URL.createObjectURL(file)}
                type="application/pdf"
                width="100%"
                height="500px"
                className="border rounded-lg mb-4"
              />
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111D63] underline text-sm hover:text-[#0e184f]"
              >
                Open PDF in new tab
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Uploaded successfully!
            </p>
          </div>
        ) : (
          <>
            <FaCloudUploadAlt className="w-12 h-12 text-[#111D63]" />
            <p className="text-center sm:font-medium">
              Drag and upload your resume here,{" "}
              <label
                htmlFor="file-upload"
                className="text-[#111D63] cursor-pointer underline sm:font-medium"
              >
                or browse
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Only PDF files are supported
            </p>
          </>
        )}
      </div>

      {/* Phase 2: Additional Options */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <p className="text-gray-700">or copy and paste instead</p>
        <div className="flex space-x-4">
          <button
            onClick={handleGoogleDriveUpload}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <GoogleDrive width={30} height={30} />
          </button>
          <button
            onClick={handleDropboxUpload}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Dropbox width={30} height={30} />
          </button>
        </div>
        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-6 w-full">
          <button className="button_v3" onClick={onBack}>
            Back
          </button>
          <button className="button_v1 w-full justify-center">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVUpload;























// "use client";
// import React, { useState, useEffect } from "react";
// import { Dropbox, GoogleDrive } from "../icons/Icons";
// import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; // Import FaTimes for the close icon

// const CVUpload = () => {
//   const [file, setFile] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleFileChange = (e: any) => {
//     const selectedFile = e.target.files[0];
//     if (
//       selectedFile &&
//       (selectedFile.type === "application/pdf" ||
//         selectedFile.name.toLowerCase().endsWith(".pdf"))
//     ) {
//       setFile(selectedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDrop = (e: any) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && droppedFile.type === "application/pdf") {
//       setFile(droppedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDragOver = (e: any) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleGoogleDriveUpload = () => {
//     alert("Google Drive upload functionality to be implemented.");
//   };

//   const handleDropboxUpload = () => {
//     alert("Dropbox upload functionality to be implemented.");
//   };

//   const handleRemoveFile = () => {
//     setFile(null); // Reset the file state to remove the uploaded file
//   };

//   useEffect(() => {
//     const handlePaste = (e: any) => {
//       const items = e.clipboardData.items;
//       for (let i = 0; i < items.length; i++) {
//         if (items[i].type === "application/pdf") {
//           const file = items[i].getAsFile();
//           setFile(file);
//           break;
//         }
//       }
//     };

//     window.addEventListener("paste", handlePaste);
//     return () => {
//       window.removeEventListener("paste", handlePaste);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center py-4 space-y-6">
//       {/* Phase 1: Drag and Drop Box */}
//       <div
//         className={`relative w-full max-w-md py-8 px-3 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-4 ${
//           isDragging ? "border-[#111D63]" : "border-[#00031633]"
//         } bg-[#F3F8FE]`}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//       >
//         <input
//           type="file"
//           id="file-upload"
//           className="hidden"
//           onChange={handleFileChange}
//           accept="application/pdf"
//         />
//         {file ? (
//           <div className="text-center w-full">
//             {/* Close icon positioned at the top right */}
//             <button
//               onClick={handleRemoveFile}
//               className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
//               aria-label="Remove file"
//             >
//               <FaTimes className="w-5 h-5 text-gray-600" />
//             </button>
//             {/* Display the uploaded PDF */}
//             <div className="flex flex-col items-center">
//               <embed
//                 src={URL.createObjectURL(file)}
//                 type="application/pdf"
//                 width="100%"
//                 height="500px"
//                 className="border rounded-lg mb-4"
//               />
//               <a
//                 href={URL.createObjectURL(file)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#111D63] underline text-sm hover:text-[#0e184f]"
//               >
//                 Open PDF in new tab
//               </a>
//             </div>
//             <p className="text-sm text-gray-500 mt-2">Uploaded successfully!</p>
//           </div>
//         ) : (
//           <>
//             <FaCloudUploadAlt className="w-12 h-12 text-[#111D63]" />
//             <p className="text-center sm:font-medium">
//               Drag and upload your resume here,{" "}
//               <label
//                 htmlFor="file-upload"
//                 className="text-[#111D63] cursor-pointer underline sm:font-medium"
//               >
//                or browse
//               </label>
//             </p>
//             <p className="text-sm text-gray-500">
//               Only PDF files are supported
//             </p>
//           </>
//         )}
//       </div>

//       {/* Phase 2: Additional Options */}
//       <div className="flex flex-col items-center space-y-4 w-full">
//         <p className="text-gray-700">or copy and paste instead</p>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleGoogleDriveUpload}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <GoogleDrive width={30} height={30} />
//           </button>
//           <button
//             onClick={handleDropboxUpload}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <Dropbox width={30} height={30} />
//           </button>
//         </div>
//         {/* Navigation Buttons */}
//         <div className="grid grid-cols-2 gap-6 w-full">
//           <button className="button_v3 ">Back</button>
//           <button className="button_v1 w-full justify-center ">Proceed</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CVUpload;





















// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Dropbox, GoogleDrive } from "../icons/Icons";
// import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
// import jsPDF from "jspdf";

// const CVUpload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files?.[0];
//     if (droppedFile && droppedFile.type === "application/pdf") {
//       setFile(droppedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleGoogleDriveUpload = () => {
//     alert("Google Drive upload functionality to be implemented.");
//   };

//   const handleDropboxUpload = () => {
//     alert("Dropbox upload functionality to be implemented.");
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//   };

//   const handleBrowseClick = () => {
//     setShowModal(true);
//   };

//   const handleTakePicture = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         setCameraStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((error) => {
//         console.error("Error accessing the camera: ", error);
//       });
//   };

//   const handleCapturePicture = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (video && canvas) {
//       const context = canvas.getContext("2d");
//       if (context) {
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const imageDataUrl = canvas.toDataURL("image/jpeg");

//         // Convert image to PDF
//         const pdf = new jsPDF();
//         pdf.addImage(imageDataUrl, "JPEG", 10, 10, 190, 0);
//         const pdfBlob = pdf.output("blob");
//         setFile(new File([pdfBlob], "captured.pdf", { type: "application/pdf" }));

//         // Stop the camera stream
//         if (cameraStream) {
//           cameraStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
//           setCameraStream(null);
//         }

//         setShowModal(false);
//       }
//     }
//   };

//   const handleSelectFromDevice = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "application/pdf";
//     input.onchange = (e: Event) => {
//       const target = e.target as HTMLInputElement;
//       const selectedFile = target.files?.[0];
//       if (selectedFile && selectedFile.type === "application/pdf") {
//         setFile(selectedFile);
//       } else {
//         alert("Only PDF files are supported.");
//       }
//     };
//     input.click();
//     setShowModal(false);
//   };

//   useEffect(() => {
//     const handlePaste = (e: ClipboardEvent) => {
//       const items = e.clipboardData?.items;
//       if (items) {
//         for (let i = 0; i < items.length; i++) {
//           if (items[i].type === "application/pdf") {
//             const file = items[i].getAsFile();
//             setFile(file);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener("paste", handlePaste);
//     return () => {
//       window.removeEventListener("paste", handlePaste);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center p-4 space-y-6">
//       {/* Phase 1: Drag and Drop Box */}
//       <div
//         className={`relative w-full max-w-md p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-4 ${
//           isDragging ? "border-[#111D63]" : "border-[#00031633]"
//         } bg-[#F3F8FE]`}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//       >
//         <input
//           type="file"
//           id="file-upload"
//           className="hidden"
//           onChange={handleFileChange}
//           accept="application/pdf"
//         />
//         {file ? (
//           <div className="text-center w-full">
//             <button
//               onClick={handleRemoveFile}
//               className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
//               aria-label="Remove file"
//             >
//               <FaTimes className="w-5 h-5 text-gray-600" />
//             </button>
//             <iframe
//               src={URL.createObjectURL(file)}
//               width="100%"
//               height="500px"
//               title="Uploaded PDF"
//               className="border rounded-lg"
//             />
//             <p className="text-sm text-gray-500 mt-2">Uploaded successfully!</p>
//           </div>
//         ) : (
//           <>
//             <FaCloudUploadAlt className="w-12 h-12 text-[#111D63]" />
//             <p className="text-center text-gray-700">
//               Drag and upload your resume here, or{" "}
//               <label
//                 htmlFor="file-upload"
//                 className="text-[#111D63] cursor-pointer underline"
//                 onClick={handleBrowseClick}
//               >
//                 browse
//               </label>
//             </p>
//             <p className="text-sm text-gray-500">Only PDF files are supported</p>
//           </>
//         )}
//       </div>

//       {/* Phase 2: Additional Options */}
//       <div className="flex flex-col items-center space-y-4">
//         <p className="text-gray-700">or copy and paste instead</p>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleGoogleDriveUpload}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <GoogleDrive width={30} height={30} />
//           </button>
//           <button
//             onClick={handleDropboxUpload}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <Dropbox width={30} height={30} />
//           </button>
//         </div>
//         <div className="flex space-x-4">
//           <button className="px-6 py-2 border border-[#111D63] text-[#111D63] rounded-lg hover:bg-[#111D63] hover:text-white transition-colors">
//             Back
//           </button>
//           <button className="px-6 py-2 bg-[#111D63] text-white rounded-lg hover:bg-[#0e184f] transition-colors">
//             Proceed
//           </button>
//         </div>
//       </div>

//       {/* Modal for Browse Options */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Choose an option</h2>
//             <button
//               onClick={handleTakePicture}
//               className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Take a Picture of the Document
//             </button>
//             <button
//               onClick={handleSelectFromDevice}
//               className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             >
//               Select from Device
//             </button>
//             <button
//               onClick={() => setShowModal(false)}
//               className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Camera Preview and Capture */}
//       {cameraStream && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <video ref={videoRef} autoPlay className="w-full h-auto mb-4"></video>
//             <canvas ref={canvasRef} className="hidden"></canvas>
//             <button
//               onClick={handleCapturePicture}
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Capture Picture
//             </button>
//             <button
//               onClick={() => {
//                 if (cameraStream) {
//                   cameraStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
//                   setCameraStream(null);
//                 }
//               }}
//               className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CVUpload;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Dropbox, GoogleDrive } from "../icons/Icons";
// import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
// import jsPDF from "jspdf";

// const CVUpload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files?.[0];
//     if (droppedFile && droppedFile.type === "application/pdf") {
//       setFile(droppedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleGoogleDriveUpload = () => {
//     alert("Google Drive upload functionality to be implemented.");
//   };

//   const handleDropboxUpload = () => {
//     alert("Dropbox upload functionality to be implemented.");
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//   };

//   const handleBrowseClick = () => {
//     setShowModal(true);
//   };

//   const handleTakePicture = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         setCameraStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((error) => {
//         console.error("Error accessing the camera: ", error);
//       });
//   };

//   const handleCapturePicture = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (video && canvas) {
//       const context = canvas.getContext("2d");
//       if (context) {
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const imageDataUrl = canvas.toDataURL("image/jpeg");

//         // Convert image to PDF
//         const pdf = new jsPDF();
//         pdf.addImage(imageDataUrl, "JPEG", 10, 10, 190, 0);
//         const pdfBlob = pdf.output("blob");
//         setFile(new File([pdfBlob], "captured.pdf", { type: "application/pdf" }));

//         // Stop the camera stream
//         if (cameraStream) {
//           cameraStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
//           setCameraStream(null);
//         }

//         setShowModal(false);
//       }
//     }
//   };

//   const handleSelectFromDevice = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "application/pdf";
//     input.onchange = (e: Event) => {
//       const target = e.target as HTMLInputElement;
//       const selectedFile = target.files?.[0];
//       if (selectedFile && selectedFile.type === "application/pdf") {
//         setFile(selectedFile);
//       } else {
//         alert("Only PDF files are supported.");
//       }
//     };
//     input.click();
//     setShowModal(false);
//   };

//   useEffect(() => {
//     const handlePaste = (e: ClipboardEvent) => {
//       const items = e.clipboardData?.items;
//       if (items) {
//         for (let i = 0; i < items.length; i++) {
//           if (items[i].type === "application/pdf") {
//             const file = items[i].getAsFile();
//             setFile(file);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener("paste", handlePaste);
//     return () => {
//       window.removeEventListener("paste", handlePaste);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center p-4 space-y-6">
//       {/* Phase 1: Drag and Drop Box */}
//       <div
//         className={`relative w-full max-w-md p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-4 ${
//           isDragging ? "border-[#111D63]" : "border-[#00031633]"
//         } bg-[#F3F8FE]`}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//       >
//         <input
//           type="file"
//           id="file-upload"
//           className="hidden"
//           onChange={handleFileChange}
//           accept="application/pdf"
//         />
//         {file ? (
//           <div className="text-center w-full">
//             <button
//               onClick={handleRemoveFile}
//               className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
//               aria-label="Remove file"
//             >
//               <FaTimes className="w-5 h-5 text-gray-600" />
//             </button>
//             <iframe
//               src={URL.createObjectURL(file)}
//               width="100%"
//               height="500px"
//               title="Uploaded PDF"
//               className="border rounded-lg"
//             />
//             <p className="text-sm text-gray-500 mt-2">Uploaded successfully!</p>
//           </div>
//         ) : (
//           <>
//             <FaCloudUploadAlt className="w-12 h-12 text-[#111D63]" />
//             <p className="text-center text-gray-700">
//               Drag and upload your resume here, or{" "}
//               <label
//                 htmlFor="file-upload"
//                 className="text-[#111D63] cursor-pointer underline"
//                 onClick={handleBrowseClick}
//               >
//                 browse
//               </label>
//             </p>
//             <p className="text-sm text-gray-500">Only PDF files are supported</p>
//           </>
//         )}
//       </div>

//       {/* Phase 2: Additional Options */}
//       <div className="flex flex-col items-center space-y-4">
//         <p className="text-gray-700">or copy and paste instead</p>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleGoogleDriveUpload}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <GoogleDrive width={30} height={30} />
//           </button>
//           <button
//             onClick={handleDropboxUpload}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <Dropbox width={30} height={30} />
//           </button>
//         </div>
//         <div className="flex space-x-4">
//           <button className="px-6 py-2 border border-[#111D63] text-[#111D63] rounded-lg hover:bg-[#111D63] hover:text-white transition-colors">
//             Back
//           </button>
//           <button className="px-6 py-2 bg-[#111D63] text-white rounded-lg hover:bg-[#0e184f] transition-colors">
//             Proceed
//           </button>
//         </div>
//       </div>

//       {/* Modal for Browse Options */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Choose an option</h2>
//             <button
//               onClick={handleTakePicture}
//               className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Take a Picture of the Document
//             </button>
//             <button
//               onClick={handleSelectFromDevice}
//               className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             >
//               Select from Device
//             </button>
//             <button
//               onClick={() => setShowModal(false)}
//               className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Camera Preview and Capture */}
//       {cameraStream && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <video ref={videoRef} autoPlay className="w-full h-auto mb-4"></video>
//             <canvas ref={canvasRef} className="hidden"></canvas>
//             <button
//               onClick={handleCapturePicture}
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Capture Picture
//             </button>
//             <button
//               onClick={() => {
//                 if (cameraStream) {
//                   cameraStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
//                   setCameraStream(null);
//                 }
//               }}
//               className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CVUpload;
