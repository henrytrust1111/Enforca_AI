"use client";

import React, { useState, useContext, createContext } from "react";

// Define the type for the context value
interface MyContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  autoFixVersion: number;
  triggerAutoFix: () => void;
  isLoading: boolean;
}

// Create the context with a default value of `null`
const MyContext = createContext<MyContextType | null>(null);

// Context Provider Component
export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoFixVersion, setAutoFixVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const triggerAutoFix = async () => {
    setIsLoading(true);
    localStorage.setItem("autoFixAll", "true");
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setAutoFixVersion(prev => prev + 1);
    setIsLoading(false);
    localStorage.removeItem("autoFixAll");
  } 
  


  return (
    <MyContext.Provider
       value={{
        isOpen,
        setIsOpen,
        autoFixVersion,
        triggerAutoFix,
        isLoading
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for consuming the context
export function useMyContext(): MyContextType {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a Context provider");
  }
  return context;
}
