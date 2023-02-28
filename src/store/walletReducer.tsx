import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  account: any | undefined;
  loans: object;
}

const initialState = {
  account: undefined,
  loans: {},
} as UserInfo;

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload.account;
    },
    setLoans: (state, action: PayloadAction<any>) => {
      state.loans = action.payload.loans;
    },
  },
});

export const { setAccount, setLoans } = walletSlice.actions;

export const walletSelector = (state: any) => state.wallet;
