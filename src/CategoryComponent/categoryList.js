import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  DialogTitle
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllCategory, deleteCategory } from "../apis/CategoryApis/category.apis"; 
import AddCategory from './addCategory';

const CategoryList = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  useEffect(() => {
    console.log("Fetching categories...");
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleAddCategoryClick = () => {
    setDialogData(null); 
    setOpenDialog(true);
  };

  const handleEdit = async (id) => {
    const category = categories.find((bu) => bu.id === id);
    setDialogData(category);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    dispatch(getAllCategory()); 
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      dispatch(getAllCategory());
    } catch (error) {
      console.error("Failed to delete business unit:", error);
    }
  };

  const columns = [
    { field: "name", headerName: "Category Name", flex: 1 },
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

  const rows = categories.map((ct, index) => ({
    id: ct.id || index, 
    name: ct.name,
    description: ct.description,
    isActive: ct.isActive,
  }));


  return (
    <Container maxWidth="lg" style={{ paddingTop: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Categories"
              action={
                <Button variant="outlined" color="primary" onClick={handleAddCategoryClick}>
                  ADD Category
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
        <DialogTitle>{dialogData ? "Edit Category " : "Add Category"}</DialogTitle>
        <DialogContent>
          <AddCategory
            initialData={dialogData} 
            onClose={handleDialogClose} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CategoryList;
