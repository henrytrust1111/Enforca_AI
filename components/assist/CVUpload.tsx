"use client";

import React, { useState, useEffect } from "react";
import { Dropbox, GoogleDrive } from "../icons/Icons";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import jsPDF from "jspdf"; // Import jsPDF for PDF creation

declare global {
  interface Window {
    ImageCapture: any;
  }
}

const CVUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [imageSrc, setImageSrc] = useState<string | null>(null); // To store the image source if taken from camera

  console.log(imageSrc);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are supported.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
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

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = stream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(videoTrack);

      const photoBlob = await imageCapture.takePhoto();
      const photoUrl = URL.createObjectURL(photoBlob);
      setImageSrc(photoUrl);

      // Convert image to PDF
      const pdf = new jsPDF();
      pdf.addImage(photoUrl, "JPEG", 0, 0, 210, 297); // A4 size
      const pdfBlob = pdf.output("blob");
      setFile(new File([pdfBlob], "document.pdf", { type: "application/pdf" }));

      videoTrack.stop(); // Stop the video stream
    } catch (err) {
      console.error("Error capturing photo: ", err);
    }
  };

  const handleSelectFile = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type === "application/pdf") {
            const file = items[i].getAsFile();
            setFile(file);
            break;
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
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      {/* Modal for selecting the upload method */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h3 className="mb-4">Choose Upload Method</h3>
            <button
              onClick={handleCameraCapture}
              className="bg-blue-500 text-white p-2 mb-4 rounded-lg"
            >
              Take a Picture of the Document
            </button>
            <button
              onClick={handleSelectFile}
              className="bg-green-500 text-white p-2 rounded-lg"
            >
              Select from Device
            </button>
            <button onClick={handleCloseModal} className="mt-4 text-red-500">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Phase 1: Drag and Drop Box */}
      <div
        className={`relative w-full max-w-md p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-4 ${
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
            <button
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Remove file"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
            {/* Display the uploaded PDF */}
            <iframe
              src={URL.createObjectURL(file)}
              width="100%"
              height="500px"
              title="Uploaded PDF"
              className="border rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2">Uploaded successfully!</p>
          </div>
        ) : (
          <>
            <FaCloudUploadAlt className="w-12 h-12 text-[#111D63]" />
            <p className="text-center text-gray-700">
              Drag and upload your resume here, or{" "}
              <button
                onClick={handleOpenModal}
                className="text-[#111D63] cursor-pointer underline"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Only PDF files are supported
            </p>
          </>
        )}
      </div>

      {/* Phase 2: Additional Options */}
      <div className="flex flex-col items-center space-y-4">
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
        <div className="flex space-x-4">
          <button className="px-6 py-2 border border-[#111D63] text-[#111D63] rounded-lg hover:bg-[#111D63] hover:text-white transition-colors">
            Back
          </button>
          <button className="px-6 py-2 bg-[#111D63] text-white rounded-lg hover:bg-[#0e184f] transition-colors">
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

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && droppedFile.type === "application/pdf") {
//       setFile(droppedFile);
//     } else {
//       alert("Only PDF files are supported.");
//     }
//   };

//   const handleDragOver = (e) => {
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
//     const handlePaste = (e) => {
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
//             {/* Close icon positioned at the top right */}
//             <button
//               onClick={handleRemoveFile}
//               className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
//               aria-label="Remove file"
//             >
//               <FaTimes className="w-5 h-5 text-gray-600" />
//             </button>
//             {/* Display the uploaded PDF */}
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
//     </div>
//   );
// };

// export default CVUpload;
