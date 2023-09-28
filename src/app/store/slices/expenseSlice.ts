import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../../types/types";
import { RootState } from "..";

export interface ExpenseState {
  expense: Expense | null;
  expenses: Expense[]
}

const initialState: ExpenseState = {
  expense: null,
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<Expense | null>) => {
      state.expense = action.payload;
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExpense, setExpenses } = expenseSlice.actions;

export const expenseReducer = expenseSlice.reducer;


export const selectExpense = (state: RootState) => state.expense.expense;