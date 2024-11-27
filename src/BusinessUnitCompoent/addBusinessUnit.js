import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAddBu, updateBusinessUnit,getAllBusinessUnits } from "../apis/BusinessUnitApis/businessUnit.apis";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const AddBusinessUnit = ({ initialData, onClose }) => {

  const dispatch = useDispatch();

  const [newBusinessUnit, setNewBusinessUnit] = useState({
    name: "",
    description: "",
    isActive: true,
    createdBy: "Admin",
    createdOn: new Date().toISOString(),
  });

  useEffect(() => {
    if (initialData) {
      setNewBusinessUnit(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setNewBusinessUnit({
      ...newBusinessUnit,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setNewBusinessUnit({
      ...newBusinessUnit,
      isActive: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData?.id) {
      dispatch(updateBusinessUnit({ id: initialData.id, updatedBusinessUnit: newBusinessUnit }));
      dispatch(getAllBusinessUnits());
    } else {
      dispatch(getAddBu(newBusinessUnit));
      dispatch(getAllBusinessUnits());
    }
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Business Unit Name"
        name="name"
        value={newBusinessUnit.name}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 ,marginTop:2}}
      />
      <TextField
        label="Business Unit Description"
        name="description"
        value={newBusinessUnit.description}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={newBusinessUnit.isActive}
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

export default AddBusinessUnit;
