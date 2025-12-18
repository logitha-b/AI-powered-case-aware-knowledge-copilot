import React, { createContext, useContext, useState } from 'react';
import { Case } from '@/types';
import { mockCases } from '@/data/mockData';

interface CaseContextType {
  cases: Case[];
  activeCase: Case | null;
  setActiveCase: (caseItem: Case | null) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases] = useState<Case[]>(mockCases);
  const [activeCase, setActiveCase] = useState<Case | null>(mockCases[0]);

  return (
    <CaseContext.Provider
      value={{
        cases,
        activeCase,
        setActiveCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};
