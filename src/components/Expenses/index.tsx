"use client";

import { useContext } from "react";
import ExpenseForm from "./form";
import { columns } from "./table/columns";
import { DataTable } from "../data-table";
import { Expense } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import FinancialSituationContext from "@/context/UserFinancialInfoContext";

const Expense = () => {
  const { financialSituation, setFinancialSituation } = useContext(FinancialSituationContext);

  const addExpense = (expense: Expense) => {
    const newFinancialSituation = {
      ...financialSituation,
      expenses: [...financialSituation.expenses, expense]
    }
    setFinancialSituation(newFinancialSituation);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowUpRight className="h-7 w-7 mr-1" /> Gastos:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ExpenseForm addExpense={addExpense} />
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={financialSituation.expenses} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Expense;
