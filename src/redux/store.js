import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import businessReducer from '../apis/BusinessUnitApis/businessUnitSlice';
import categoryReducer from '../apis/CategoryApis/categorySlice';
import billGenerateReducer from'../apis/BillGenerateApis/billGenerateSlice';
import projectReducer from '../apis/ProjectApis/projectSlice';
import expenseReducer from '../apis/ExpensesApis/expenseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    businessUnit: businessReducer,
    category:categoryReducer,
    billGenerate:billGenerateReducer,
    project:projectReducer,
    expense:expenseReducer
  },
});

export default store;
