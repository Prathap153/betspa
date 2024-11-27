import { createSlice } from '@reduxjs/toolkit';
import {
    getAllCategory,
    deleteCategory,
    addCategory,
    updateCategory
} from './category.apis';

const initialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
      builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (bu) => bu.id !== action.payload
        );
      });
      builder.addCase(addCategory.fulfilled,(state,action)=>{
        state.categories.push(action.payload);
      })
      builder.addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((ct) =>
          ct.id === action.payload.id ? action.payload : ct
        );
      });
    },
  });
  
  export default categorySlice.reducer;