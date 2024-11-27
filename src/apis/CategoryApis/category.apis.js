import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthHeader from '../../redux/AuthHeader';

const getHeaders = () => {
  return {
    headers: AuthHeader(),
  };
};

export const getAllCategory = createAsyncThunk(
    'category/getAll',
    async () => {
    try{
      const response = await axios.get(
        'https://localhost:7147/api/Category/getAll',
        getHeaders()
      );
      console.log("Response at getAllCategory",response);
      console.log("response.data at getAllCategory",response.data);
      console.log("response.data.data at getAllCategory",response.data.data);
      return response.data.data;
    }
    catch(error)
    {
        console.log("Error at get All Category",error);
    }
}
);

export const deleteCategory = createAsyncThunk(
    'businessUnit/delete',
    async (id) => {
      await axios.delete(
        `https://localhost:7147/api/Category/delete/${id}`,
        getHeaders()
      );
      return id;
    }
);

export const addCategory = createAsyncThunk(
    'category/add',
    async (category) => {
      const response = await axios.post(
        'https://localhost:7147/api/Category/add',
        category,
        getHeaders()
      );
      return response.data.data;
    }
);

export const updateCategory = createAsyncThunk(
    'category/update',
    async({ id, updatedCategory })=>{
        const response = await axios.put(
            `https://localhost:7147/api/Category/update/${id}`,
            updatedCategory,
            getHeaders()
          );
          return response.data.data;
    }
)