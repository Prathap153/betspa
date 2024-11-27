import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBusinessUnits,
  deleteBusinessUnit,
} from "../apis/BusinessUnitApis/businessUnit.apis";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import AddBusinessUnit from "./addBusinessUnit"; 

const BusinessUnit = () => {
  const dispatch = useDispatch();
  const { businessUnits } = useSelector((state) => state.businessUnit);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null); 

  useEffect(() => {
    dispatch(getAllBusinessUnits());
  }, [dispatch]);

  const handleAddBUClick = () => {
    setDialogData(null); 
    setOpenDialog(true);
  };

  const handleEdit = async (id) => {
    const businessUnit = businessUnits.find((bu) => bu.id === id);
    setDialogData(businessUnit);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    dispatch(getAllBusinessUnits()); 
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBusinessUnit(id));
      dispatch(getAllBusinessUnits());
    } catch (error) {
      console.error("Failed to delete business unit:", error);
    }
  };

  const columns = [
    { field: "name", headerName: "Business Unit Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <IconButton color="success">
            <CheckCircleIcon />
          </IconButton>
        ) : (
          <IconButton color="error">
            <CancelIcon />
          </IconButton>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row.id)} >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = businessUnits.map((bu, index) => ({
    id: bu.id || index,
    name: bu.name,
    description: bu.description,
    isActive: bu.isActive,
  }));

  return (
    <Container maxWidth="lg" style={{ paddingTop: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Business Units"
              action={
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddBUClick}
                >
                  ADD BU
                </Button>
              }
            />
            <Divider />
            <CardContent>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>{dialogData ? "Edit Business Unit" : "Add Business Unit"}</DialogTitle>
        <DialogContent>
          <AddBusinessUnit
            initialData={dialogData} 
            onClose={handleDialogClose} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default BusinessUnit;
