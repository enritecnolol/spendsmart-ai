import { configureStore } from "@reduxjs/toolkit";
import { IncomeState, incomeReducer } from "./slices/incomeSlice";
import { ExpenseState, expenseReducer } from "./slices/expenseSlice";
import { CreditCardState, creditCardReducer } from "./slices/creditCardSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    creditCard: creditCardReducer,
  },
  devTools: true,
});
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type RootState = {
  income: IncomeState;
  expense: ExpenseState;
  creditCard: CreditCardState;
};
