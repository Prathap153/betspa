import { createSlice } from '@reduxjs/toolkit';
import {
  getAddBu,
  getAllBusinessUnits,
  deleteBusinessUnit,
  getByIdBusinessUnit,
  updateBusinessUnit,
} from './businessUnit.apis';

const initialState = {
  businessUnits: [],
  selectedBusinessUnit: null,
};

const businessUnitSlice = createSlice({
  name: 'businessUnit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBusinessUnits.fulfilled, (state, action) => {
      state.businessUnits = action.payload;
    });

    builder.addCase(deleteBusinessUnit.fulfilled, (state, action) => {
      state.businessUnits = state.businessUnits.filter(
        (bu) => bu.id !== action.payload
      );
    });

    builder.addCase(getAddBu.fulfilled, (state, action) => {
      state.businessUnits.push(action.payload);
    });

    builder.addCase(getByIdBusinessUnit.fulfilled, (state, action) => {
      state.selectedBusinessUnit = action.payload;
    });

    builder.addCase(updateBusinessUnit.fulfilled, (state, action) => {
      state.businessUnits = state.businessUnits.map((bu) =>
        bu.id === action.payload.id ? action.payload : bu
      );
    });
     
    

  },
});

export default businessUnitSlice.reducer;
