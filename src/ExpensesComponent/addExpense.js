import React, { useState, useEffect,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAllProjects } from "../apis/ProjectApis/project.apis";
import { getAllCategory } from "../apis/CategoryApis/category.apis";
import {
    getAllExpense,
    addExpense,
    updateExpense
} from '../apis/ExpensesApis/expense.apis';

const AddorEditExpense = ({ initialData, onClose }) => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.category);

  const [newExpense, setNewExpense] = useState({
    project_Id: "",
    category_Id: "",
    amount: 0,
    payment_Date: new Date(),
    isActive: true,
    createdBy: "Admin",
    createdOn: new Date().toISOString(),
  });

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllCategory());
  }, [dispatch]);

  const EditDetails = useCallback(() => {
    if (initialData ) {
      const project = projects.find((p) => p.project_Name === initialData.projectName);
      const category = categories.find((c) => c.name === initialData.categoryName);
      setNewExpense({
        ...initialData,
        project_Id: project ? project.id : "",
        category_Id: category ? category.id : "",
         payment_Date: new Date(initialData.payment_Date), 
      });
    }
  }, [initialData, projects, categories]);

  useEffect(()=>{
    EditDetails();
  },[EditDetails]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleDateChange = (date) => {
    setNewExpense((prev) => ({
      ...prev,
      payment_Date: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData?.id) {
      // Update Expense
      console.log("Update Expense",newExpense);
      dispatch(updateExpense({id: initialData.id,expenseUpdate: newExpense})
      );
    } else {
      dispatch(addExpense(newExpense));
    }
    dispatch(getAllExpense());
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel htmlFor="project_Id">Project Name</InputLabel>
      <Select
        required
        name="project_Id"
        id="project_Id"
        value={newExpense.project_Id || ""}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        {projects.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.project_Name}
          </MenuItem>
        ))}
      </Select>

      <InputLabel htmlFor="category_Id">Category Name</InputLabel>
      <Select
        required
        name="category_Id"
        id="category_Id"
        value={newExpense.category_Id || ""}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        {categories.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={newExpense.amount || 0}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />

      <DatePicker
        label="Payment Date"
        value={newExpense.payment_Date || new Date()}
        onChange={handleDateChange}
        sx={{ marginBottom: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={newExpense.isActive || false}
            onChange={handleCheckboxChange}
            name="isActive"
            color="primary"
          />
        }
        label="Active"
      />

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button type="button" variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Update" : "Add"}
        </Button>
      </Box>
    </form>
  );
};

export default AddorEditExpense;
