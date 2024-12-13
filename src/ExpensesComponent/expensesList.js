import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import {
    deleteExpense,
    getAllExpense
} from '../apis/ExpensesApis/expense.apis'
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
    DialogTitle,
    DialogContent
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import AddorEditExpense from './addExpense';


const ExpensesList = () =>{
    
    const dispatch = useDispatch();
    const { expenses } = useSelector((state)=>state.expense);

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState(null);

    useEffect(()=>{
        dispatch(getAllExpense());
    },[dispatch]);

    const handleAddClick = () => {
      setDialogData(null);
      setOpenDialog(true);
  };

  const handleEdit = async (id) => {
      const expense = expenses.find((bu) => bu.id === id);
      setDialogData(expense);
      setOpenDialog(true);
  };

  const handleDialogClose = () => {
      setOpenDialog(false);
      dispatch(getAllExpense());
  };

    const handleDelete = async (id) => {
        console.log("Attempting to delete id:", id);
        try {
           var res= dispatch(deleteExpense(id));
           dispatch(getAllExpense());
           console.log("delete Expense",res);
        } catch (error) {
            console.log("error at deleting", error);
        }
    }

    const columns = [
        { field: "projectName", headerName: "Project Name", flex: 1 },
        { field: "categoryName", headerName: "Category Name", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1 },
        { field: "payment_Date", headerName: "Date", flex: 1 },
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
              <IconButton onClick={()=>handleDelete(params.row.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ),
        },
      ];
    
      const rows = expenses.map((e, index) => ({
        id: e.id || index, 
        projectName: e.projectName,
        categoryName: e.categoryName,
        amount: e.amount,
        payment_Date: e.payment_Date,
        isActive: e.isActive,
      }));
    
 
      return (
        <Container maxWidth="lg" style={{ paddingTop: 5 }}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title="Expenses List"
                            action={
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddClick}
                                >
                                    ADD Expense
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
                <DialogTitle>{dialogData ? "Edit Expense" : "Add Bill"}</DialogTitle>
                <DialogContent>
                    <AddorEditExpense
                        initialData={dialogData}
                        onClose={handleDialogClose}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default ExpensesList;