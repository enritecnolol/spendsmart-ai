"use client";

import { useState } from "react";
import ExpenseForm from "./form";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Expense } from "../../types/types";

const Expense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-2xl font-bold">Gastos:</h1>
      <div className="mt-5 w-full">
        <ExpenseForm addExpense={addExpense} />
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  );
};

export default Expense;
