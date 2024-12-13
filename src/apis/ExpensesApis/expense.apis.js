import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthHeader from '../../redux/AuthHeader';

const getHeaders = () => {
    return {
      headers: AuthHeader(),
    };
};

export const getAllExpense = createAsyncThunk(
    'expense/getAll',
    async () => {
        try{
            const response = await axios.get(
              'https://localhost:7147/api/Expenses/getAllByName',
              getHeaders()  
            );
            console.log("response for expenses ",response.data.data);
            return response.data.data;
        }
        catch(error)
        {
            console.log("Error at get All Exoense",error);
        }
    }
);

export const addExpense = createAsyncThunk(
    'expense/add',
    async (expense) =>{
        try{
            const response = await axios.post(
                'https://localhost:7147/api/Expenses/add',expense,
                getHeaders()  
              );
            return response.data.data;  
        }
        catch(error){
            console.log("Error at adding Expense",error);
        }
    }
);

export const deleteExpense = createAsyncThunk(
    'expense/delete',
    async (id) =>{
        try{
            const response = await axios.delete(
                `https://localhost:7147/api/Expenses/delete/${id}`,
                getHeaders()  
              );
            return response.data.data;  
        }
        catch(error){
            console.log("Error at adding Expense",error);
        }
    }
);

export const updateExpense = createAsyncThunk(
    'expense/update',
    async({id,expenseUpdate})=>{
        console.log("Id and updateExpsense ",id,expenseUpdate);
        try{
            const response = await axios.put(
                `https://localhost:7147/api/Expenses/update/${id}`,expenseUpdate,
                getHeaders()  
              );
            return response.data.data;  
        }
        catch(error){
            console.log("error at updating",error);
        }
    }
)