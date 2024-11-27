import { createSlice } from '@reduxjs/toolkit';
import {  
  getAllBillGenarated,
  DeleteBill,
  addBill
} from './billGenerate.apis';

const initialState = {
    billGenerates: []
};

const billGenerateSlice = createSlice({
    name: 'billGenarate',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBillGenarated.fulfilled,(state,action)=>{
            state.billGenerates=action.payload;
        });
        builder.addCase(DeleteBill.fulfilled,(state,action)=>{
            state.billGenerates = state.billGenerates.map((bg) =>
                bg.id === action.payload.id ? action.payload : bg
              );
        });
        builder.addCase(addBill.fulfilled,(state,action)=>{
            state.billGenerates.push(action.payload);
        })
    }
})

export default billGenerateSlice.reducer;