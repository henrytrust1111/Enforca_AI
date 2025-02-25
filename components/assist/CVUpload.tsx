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
          <div className="text-center w-full ">
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
                className="border rounded-lg mb-4 !custom-scrollbar"
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













