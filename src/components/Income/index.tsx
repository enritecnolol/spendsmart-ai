"use client";

import { useState } from "react";
import { ArrowDownLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import IncomeForm from "./form";
import { Income } from "../../types/types";
import { columns } from "./table/columns";
import { DataTable } from "../data-table";

const Income = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);

  const addIncome = (income: Income) => {
    setIncomes([...incomes, income]);
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
          <DataTable columns={columns} data={incomes} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Income;
