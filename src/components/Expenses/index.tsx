"use client";

import { useState } from "react";
import ExpenseForm from "./form";
import { columns } from "./table/columns";
import { DataTable } from "../data-table";
import { Expense } from "../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpRight } from "lucide-react";

const Expense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
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
          <DataTable columns={columns} data={expenses} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Expense;
