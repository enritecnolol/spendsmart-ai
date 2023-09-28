import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CreditCard } from "../../../types/types";
import { RootState } from "..";

export interface CreditCardState {
  creditCard: CreditCard | null;
  creditCards: CreditCard[];
}

const initialState: CreditCardState = {
  creditCard: null,
  creditCards: [],
};

export const creditCardSlice = createSlice({
  name: "creditCard",
  initialState,
  reducers: {
    setCreditCard: (state, action: PayloadAction<CreditCard | null>) => {
      state.creditCard = action.payload;
    },
    setCreditCards: (state, action: PayloadAction<CreditCard[]>) => {
      state.creditCards = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreditCard, setCreditCards } = creditCardSlice.actions;

export const creditCardReducer = creditCardSlice.reducer;

export const selectCreditCard = (state: RootState) =>
  state.creditCard.creditCard;
