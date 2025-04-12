"use client";

import React, { useState, useContext, createContext, Dispatch, SetStateAction } from "react";

type SectionState = {
  [key: string]: "original" | "corrected";
};

interface MyContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  autoFixVersion: number;
  triggerAutoFix: () => void;
  isLoading: boolean;
  sectionChoices: SectionState;
  originalData: any;
  correctedData: any;
  setSectionChoices: Dispatch<SetStateAction<SectionState>>;
  setOriginalData: Dispatch<SetStateAction<any>>;
  setCorrectedData: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | null>(null);

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoFixVersion, setAutoFixVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionChoices, setSectionChoices] = useState<SectionState>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [correctedData, setCorrectedData] = useState<any>({});

  const triggerAutoFix = async () => {
    setIsLoading(true);
    localStorage.setItem("autoFixAll", "true");
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setAutoFixVersion(prev => prev + 1);
    setIsLoading(false);
    localStorage.removeItem("autoFixAll");
  };

  return (
    <MyContext.Provider
      value={{
        isOpen,
        setIsOpen,
        autoFixVersion,
        triggerAutoFix,
        isLoading,
        sectionChoices,
        originalData,
        correctedData,
        setSectionChoices,
        setOriginalData,
        setCorrectedData,
        setIsLoading
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export function useMyContext(): MyContextType {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a Context provider");
  }
  return context;
}