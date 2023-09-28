import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Income } from "../../../types/types";
import { RootState } from "..";

export interface IncomeState {
  income: Income | null;
  incomes: Income[]
}

const initialState: IncomeState = {
  income: null,
  incomes: [],
};

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<Income | null>) => {
      state.income = action.payload;
    },
    setIncomes: (state, action: PayloadAction<Income[]>) => {
      state.incomes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIncome, setIncomes } = incomeSlice.actions;

export const incomeReducer = incomeSlice.reducer;


export const selectIncome = (state: RootState) => state.income.income;