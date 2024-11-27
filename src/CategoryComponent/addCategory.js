import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory,updateCategory,getAllCategory } from "../apis/CategoryApis/category.apis";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const AddCategory = ({ initialData, onClose })=>{

    const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    isActive: true,
    createdBy: "Admin",
    createdOn: new Date().toISOString(),
  });
  useEffect(() => {
    if (initialData) {
        setNewCategory(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setNewCategory({
      ...newCategory,
      isActive: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData?.id) {
      dispatch(updateCategory({ id: initialData.id, updatedCategory: newCategory }));
      dispatch(getAllCategory());
    } else {
      dispatch(addCategory(newCategory));
      dispatch(getAllCategory());
    }
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Category Name"
        name="name"
        value={newCategory.name}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 ,marginTop:2}}
      />
      <TextField
        label="Category Description"
        name="description"
        value={newCategory.description}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={newCategory.isActive}
            onChange={handleCheckboxChange}
            name="isActive"
            color="primary"
          />
        }
        label="Active"
      />
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Update" : "Add"}
        </Button>
      </Box>
    </form>
  );
};

export default AddCategory;