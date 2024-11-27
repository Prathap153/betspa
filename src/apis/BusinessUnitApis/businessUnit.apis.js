import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthHeader from '../../redux/AuthHeader';

const getHeaders = () => {
  return {
    headers: AuthHeader(),
  };
};

export const getAllBusinessUnits = createAsyncThunk(
  'businessUnit/getAll',
  async () => {
    const response = await axios.get(
      'https://localhost:7147/api/BusinessUnit/getAll',
      getHeaders()
    );
    return response.data.data;
  }
);

export const getAddBu = createAsyncThunk(
  'businessUnit/add',
  async (newBusinessUnit) => {
    const response = await axios.post(
      'https://localhost:7147/api/BusinessUnit/add',
      newBusinessUnit,
      getHeaders()
    );
    return response.data.data;
  }
);

export const deleteBusinessUnit = createAsyncThunk(
  'businessUnit/delete',
  async (id) => {
    await axios.delete(
      `https://localhost:7147/api/BusinessUnit/delete/${id}`,
      getHeaders()
    );
    return id;
  }
);

export const getByIdBusinessUnit = createAsyncThunk(
  'businessUnit/getById',
  async (id) => {
    const response = await axios.get(
      `https://localhost:7147/api/BusinessUnit/getById/${id}`,
      getHeaders()
    );
    return response.data.data;
  }
);

export const updateBusinessUnit = createAsyncThunk(
  'businessUnit/update',
  async ({ id, updatedBusinessUnit }) => {
    const response = await axios.put(
      `https://localhost:7147/api/BusinessUnit/update/${id}`,
      updatedBusinessUnit,
      getHeaders()
    );
    return response.data.data;
  }
);
