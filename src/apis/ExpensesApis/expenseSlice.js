import { createSlice } from '@reduxjs/toolkit';
import {
    getAllExpense,
    deleteExpense,
    addExpense,
    updateExpense
} from './expense.apis';

const initialState = {
    expenses: [],
};

const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getAllExpense.fulfilled, (state,action)=>{
            state.expenses = action.payload
        });
        builder.addCase(deleteExpense.fulfilled, (state,action)=>{
            state.expenses = state.expenses.filter(
                (ex) => ex.id !== action.payload
              );
        });
        builder.addCase(addExpense.fulfilled, (state,action)=>{
            state.expenses.push(action.payload);
        })

        builder.addCase(updateExpense.fulfilled,(state,action)=>{
            console.log("Action payload in updateExpense:", action.payload);
            state.expenses = state.expenses.map((ex)=>
             ex.id === action.payload.id ? action.payload :ex
            );
        })
    }
});

export default expenseSlice.reducer;