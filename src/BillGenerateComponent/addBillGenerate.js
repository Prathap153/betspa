import React, { useState, useEffect, useCallback } from "react";
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

const AddorEditBill = ({ initialData, onClose }) => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.category);

  const [newBill, setNewBill] = useState({
    project_Id: "",
    category_Id: "",
    amount_Generated: 0,
    due_Date: new Date(),
    isActive: true,
    createdBy: "Admin",
    createdOn: new Date().toISOString(),
  });

  useEffect(() => {
    // Fetch projects and categories when component loads
    dispatch(getAllProjects());
    dispatch(getAllCategory());
  }, [dispatch]);

  const EditDetails = useCallback(() => {
    if (initialData && projects.length > 0 && categories.length > 0) {
      const project = projects.find((p) => p.project_Name === initialData.projectName);
      const category = categories.find((c) => c.name === initialData.categoryName);

      setNewBill({
        ...initialData,
        project_Id: project ? project.id : "",
        category_Id: category ? category.id : "",
        due_Date: new Date(initialData.due_Date), // Ensure date parsing
      });
    }
  }, [initialData, projects, categories]);

  useEffect(() => {
    EditDetails();
  }, [EditDetails]);

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
      // Update bill logic
      dispatch(updateGeneratedBill({ id: initialData.id, updateBill: newBill }));
    } else {
      // Add new bill logic
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
        value={newBill.project_Id || ""}
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
        value={newBill.category_Id || ""}
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
        value={newBill.amount_Generated || 0}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />

      <DatePicker
        label="Due Date"
        value={newBill.due_Date || new Date()}
        onChange={handleDateChange}
        sx={{ marginBottom: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={newBill.isActive || false}
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
