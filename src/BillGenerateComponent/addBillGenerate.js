import React, { useState, useEffect } from "react";
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
import {
  addBill,
  updateGeneratedBill,
  getAllBillGenarated,
} from "../apis/BillGenerateApis/billGenerate.apis";
import { getAllProjects } from "../apis/ProjectApis/project.apis";
import { getAllCategory } from "../apis/CategoryApis/category.apis";

const AddorEditBill = ({ initialData , onClose }) => {
  const dispatch = useDispatch();

  const [newBill, setNewBill] = useState({
    project_Id: "",
    category_Id: "",
    amount_Generated: 0,
    due_Date: new Date(),
    isActive: true,
    createdBy: "Admin",
    createdOn: new Date().toISOString(),
  });

  const { projects } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (initialData) {
      setNewBill(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setNewBill((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleDateChange = (date) => {
      setNewBill((prev) => ({
        ...prev,
        due_Date: date,
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData?.id) {
      dispatch(updateGeneratedBill({ id: initialData.id, updateBill: newBill }));
    } else {
      dispatch(addBill(newBill));
    }
    dispatch(getAllBillGenarated());
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel htmlFor="project_Id">Project Name</InputLabel>
      <Select
        required
        name="project_Id"
        id="project_Id"
        value={newBill.project_Id}
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
        value={newBill.category_Id}
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
        label="Amount Generated"
        name="amount_Generated"
        type="number"
        value={newBill.amount_Generated}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />

      <DatePicker
        label="Due Date"
        value={new Date(newBill.due_Date)}
        onChange={handleDateChange}
        sx={{ marginBottom: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={newBill.isActive}
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

export default AddorEditBill;
