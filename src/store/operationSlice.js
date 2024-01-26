import { createSlice } from '@reduxjs/toolkit';


export const operationSlice = createSlice({
  name: 'operation',
  initialState: {
    'operation': []
  },
  reducers: {
    addOperation: (state, action) => {
      state['operation'].push({ text: action.payload.text, money: action.payload.money, status: action.payload.status });
    },
    changeStatus: (state, action) => {
      state['operation'][action.payload.index].status = action.payload.status;
    }
  }
})

export const { addOperation, clearOperation, changeStatus } = operationSlice.actions;
export default operationSlice.reducer;