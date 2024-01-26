import { createSlice } from '@reduxjs/toolkit';

export const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    'balance': 0,
    'income': 0,
    'expenses': 0
  },
  reducers: {
    addBalance: (state, action) => {
      if (action.payload.status === 'Доходы') {
        state['balance'] += Number(action.payload.money);
      } else {
        state['balance'] -= Number(action.payload.money);
      }
    },
    addIncome: (state, action) => {
      state['income'] += Number(action.payload.money);
    },
    addExpenses: (state, action) => {
      state['expenses'] += Number(action.payload.money);
    }
  }
})

export const { addBalance, addIncome, addExpenses } = balanceSlice.actions;
export default balanceSlice.reducer;