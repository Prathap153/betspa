import { createSlice } from '@reduxjs/toolkit';
import { getAllProjects } from './project.apis'; 

const initialState = {
  projects: []
};

const projectSlice = createSlice({
  name: 'project', 
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload; 
    });
  },
});

export default projectSlice.reducer;
