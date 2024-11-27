import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthHeader from '../../redux/AuthHeader';

const getHeaders = () => {
  return {
    headers: AuthHeader(),
  };
};

export const getAllProjects = createAsyncThunk(
  'project/getAll',
  async () => {
    const response = await axios.get(
      'https://localhost:7147/api/Project/getAllDetails',
      getHeaders()
    );
    return response.data.data;
  }
);