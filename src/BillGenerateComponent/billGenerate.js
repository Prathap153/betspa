import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBill, getAllBillGenarated } from "../apis/BillGenerateApis/billGenerate.apis";
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
import AddorEditBill from "./addBillGenerate";

const BillGenerateList = () => {

    const dispatch = useDispatch();
    const { billGenerates } = useSelector((state) => state.billGenerate);

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState(null);

    useEffect(() => {
        dispatch(getAllBillGenarated());
    }, [dispatch]);

    //   console.log("Bill Generations",billGenerates);
    const handleAddClick = () => {
        setDialogData(null);
        setOpenDialog(true);
    };

    const handleEdit = async (id) => {
        const bill = billGenerates.find((bu) => bu.id === id);
        setDialogData(bill);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        dispatch(getAllBillGenarated());
    };

    const handleDelete = async (id) => {
        try {
           var res= await dispatch(DeleteBill(id));
           console.log("delete bill",res);
            dispatch(getAllBillGenarated());
        } catch (error) {
            console.log("error at deleting", error);
        }
    }

    const columns = [
        { field: "projectName", headerName: "Project Name", flex: 1 },
        { field: "categoryName", headerName: "Category Name", flex: 1 },
        { field: "amount_Generated", headerName: "Amount Generated", flex: 1 },
        { field: "due_Date", headerName: "Due Date", flex: 1 },
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
                    <IconButton onClick={()=>handleEdit(params.rows.id)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.rows.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rows = billGenerates.map((bg, index) => ({
        id: bg.id || index,
        projectName: bg.projectName,
        categoryName: bg.categoryName,
        amount_Generated: bg.amount_Generated,
        due_Date: bg.due_Date,
        isActive: bg.isActive,
    }));

    return (
        <Container maxWidth="lg" style={{ paddingTop: 5 }}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title="Bill's List"
                            action={
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleAddClick}
                                >
                                    ADD BILL
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
                <DialogTitle>{dialogData ? "Edit Bill" : "Add Bill"}</DialogTitle>
                <DialogContent>
                    <AddorEditBill
                        initialData={dialogData}
                        onClose={handleDialogClose}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default BillGenerateList;