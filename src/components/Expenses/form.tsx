"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Expense } from "../../types/types";

const initialState: Expense = {
  description: "",
  amount: 0,
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
        <Label htmlFor="description">Descripción</Label>
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
        <Label htmlFor="amount">Monto</Label>
        <Input
          type="number"
          id="amount"
          placeholder="Monto"
          name="amount"
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
