"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Expense } from "../../types/types";
import {DateTime} from "luxon"

const initialState: Expense = {
  description: "",
  amount: 0,
  dueDate: DateTime.now().day,
};

type ExpenseFormProps = {
  addExpense: (expense: Expense) => void;
};

const ExpenseForm = ({ addExpense }: ExpenseFormProps) => {
  const [expense, setExpense] = useState<Expense>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };
  const submitExpense = () => {
    addExpense(expense)
    setExpense(initialState)
  }

  return (
    <div className="flex gap-x-5">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Descripción <span className="text-red-600">*</span></Label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción"
          value={expense.description}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-56 items-center gap-1.5">
        <Label htmlFor="dueDate">Dia vencimiento <span className="text-red-600">*</span></Label>
        <Input
          type="number"
          id="dueDate"
          name="dueDate"
          placeholder="Dia vencimiento"
          value={expense.dueDate}
          onChange={handleChange}
          max="31"
          min="0"
        />
      </div>
      <div className="grid w-56 items-center gap-1.5">
        <Label htmlFor="amount">Monto <span className="text-red-600">*</span></Label>
        <Input
          type="number"
          id="amount"
          placeholder="Monto"
          name="amount"
          min="0"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center items-end">
        <Button onClick={submitExpense}>
          <Plus className="w-4 h-4 mr-2" /> Agregar
        </Button>
      </div>
    </div>
  );
};

export default ExpenseForm;
