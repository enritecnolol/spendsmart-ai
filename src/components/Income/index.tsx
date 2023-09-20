"use client";

import { useContext } from "react";
import { ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import IncomeForm from "./form";
import { Income } from "@/types/types";
import { columns } from "./table/columns";
import { DataTable } from "../data-table";
import FinancialSituationContext from "@/context/UserFinancialInfoContext";

const Income = () => {
  const { financialSituation, setFinancialSituation } = useContext(FinancialSituationContext);

  const addIncome = (income: Income) => {
    const newFinancialSituation = {
      ...financialSituation,
      incomes: [...financialSituation.incomes, income]
    }
    setFinancialSituation(newFinancialSituation);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowDownLeft className="h-7 w-7 mr-1" /> Ingresos:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <IncomeForm addIncome={addIncome}/>
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={financialSituation.incomes} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Income;
