import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthHeader from '../../redux/AuthHeader';

const getHeaders = () => {
  return {
    headers: AuthHeader(),
  };
};

export const getAllBillGenarated = createAsyncThunk(
  'billGenerated/getAll',
  async () => {
    const response = await axios.get(
      'https://localhost:7147/api/BillGenerated/getAllByNames',
      getHeaders()
    );
    return response.data.data;
  }
);

export const DeleteBill = createAsyncThunk(
    'bill/delete',
    async(id)=>{
        const response = await axios.delete(
            `https://localhost:7147/api/BillGenerated/delete/${id}`,
            getHeaders()
          );
          return response.data.data;
    }
);

export const addBill = createAsyncThunk(
    'bill/add',
    async(newBill)=>{
        const response = await axios.post(
          'https://localhost:7147/api/BillGenerated/add',newBill,
            getHeaders()
        );
        return response.data;
    }
);

export const getByIdBill = createAsyncThunk(
      'bill/getById',
      async(id)=> {
        const response = await axios.get(
          `https://localhost:7147/api/BillGenerated/getById/${id}`,
          getHeaders()
        );
        return response.data.data;
      }
)

export const updateGeneratedBill = createAsyncThunk(
     'bill/update',
     async({id,updateBill})=>{
        const response = await axios.put(
            `https://localhost:7147/api/BillGenerated/update/${id}`,updateBill,
            getHeaders()
        );
        return response.data;
     }
);


 
