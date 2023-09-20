"use client"

import { ReactNode, createContext, useState } from "react";
import { FinancialSituation } from "../types/types";

type FinancialSituationContent = {
  financialSituation: FinancialSituation;
  setFinancialSituation: (financial: FinancialSituation) => void
}

const initialContext: FinancialSituationContent = {
  financialSituation: {
    expenses: [],
    incomes: [],
    creditCards: []
  },
  setFinancialSituation: () => {}
}

const FinancialSituationContext = createContext<FinancialSituationContent>(initialContext);

type UserFinancialSituationProviderProps = {
  children: ReactNode;
}

export const UserFinancialSituationProvider = ({ children }: UserFinancialSituationProviderProps) => {
  const [financialSituation, setFinancialSituation] = useState<FinancialSituation>({
    expenses: [],
    incomes: [],
    creditCards: []
  });

  return (
    <FinancialSituationContext.Provider
      value={{ financialSituation, setFinancialSituation }}
    >
      {children}
    </FinancialSituationContext.Provider>
  );
}
 
export default FinancialSituationContext;