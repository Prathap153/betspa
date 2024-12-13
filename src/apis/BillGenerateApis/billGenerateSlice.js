import { createSlice } from '@reduxjs/toolkit';
import {  
  getAllBillGenarated,
  DeleteBill,
  addBill,
  updateGeneratedBill,
  getByIdBill
} from './billGenerate.apis';

const initialState = {
    billGenerates: [],
    selectedBillGenerate: null
};

const billGenerateSlice = createSlice({
    name: 'billGenarate',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBillGenarated.fulfilled,(state,action)=>{
            state.billGenerates=action.payload;
        });
        builder.addCase(DeleteBill.fulfilled, (state, action) => {
            const deletedId = action.payload; 
            state.billGenerates = state.billGenerates.filter((bu) => bu.id !== deletedId);
        });
        builder.addCase(addBill.fulfilled,(state,action)=>{
            state.billGenerates.push(action.payload);
        })
        builder.addCase(getByIdBill.fulfilled,(state,action)=>{
            state.selectedBillGenerate = action.payload;
        })
        builder.addCase(updateGeneratedBill.fulfilled, (state, action) => {
            state.billGenerates = state.billGenerates.map((bi) =>
                bi.id === action.payload.id ? action.payload : bi
            );
        });

    }
})

export default billGenerateSlice.reducer;