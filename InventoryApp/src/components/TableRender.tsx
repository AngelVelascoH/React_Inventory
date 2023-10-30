import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/context";
import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DELETE from "../apollo/deleteItem";
import { useMutation } from "@apollo/client";

interface Location {
  state: string;
  address: string;
  phoneNumber: number;
}
interface Item {
  itemId: number;
  itemName: string;
  description: string;
  location: Location;
}
interface TableProps {
  data: { Items: Item[] };
  filter: string;
}

export const TableRender: React.FC<TableProps> = ({ data, filter }) => {
  const context = useData();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [deleteItem] = useMutation(DELETE);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (event !== null) setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const itemDetail = (itemId: number) => {
    navigate("/item/" + itemId.toString() + "/detail");
  };

  const filteredData = data.Items.filter((item) => {
    if (filter === "") {
      return item;
    } else if (
      item.itemName.toLowerCase().includes(filter.toLowerCase()) ||
      item.itemId.toString().includes(filter)
    ) {
      return item;
    }
  });

  const handleClose = () => {
    setOpen(false);
  };
  const deleteItemDialog = (id: number) => {
    console.log("delete");
    console.log(id);
    setItemId(id);
    setOpen(true);
  };

  const deleteSpecificItem = (id: number) => {
    console.log(id);
    try {
      deleteItem({
        variables: {
          itemId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    context.setRefreshValue(true);
    if (filteredData.length >= rowsPerPage && page !== 0) {
      setPage(page - 1);
    }
    navigate("/items");
  };

  useEffect(() => {
    context.setData(filteredData.length);
  }, [context.data, context.searchTerm, filteredData]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          aria-label="customized table"
          stickyHeader
          sx={{ minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "white", background: "#87ceeb" }}
                align="left"
              >
                <Typography variant="h5">ItemId</Typography>
              </TableCell>
              <TableCell
                sx={{ color: "white", background: "#87ceeb" }}
                align="left"
              >
                <Typography variant="h5">Item Name</Typography>
              </TableCell>
              <TableCell
                sx={{ color: "white", background: "#87ceeb" }}
                align="center"
              >
                <Typography variant="h5">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.itemId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <Typography variant="h4" component={"p"}>
                        "¿Estas seguro que desesas eliminar el item {itemId}
                        ?"
                      </Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Una vez que el Item se elimine, no se podrá recuperar.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => deleteSpecificItem(itemId)}
                        variant="outlined"
                        color="error"
                      >
                        Si, Eliminar
                      </Button>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="info"
                      >
                        No, Regresar
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => itemDetail(row.itemId)}
                    >
                      {row.itemId}
                    </Button>
                  </TableCell>
                  <TableCell align="left">{row.itemName}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        deleteItemDialog(row.itemId);
                      }}
                    >
                      <DeleteForeverIcon
                        sx={{ width: "30px", height: "30px" }}
                        color="error"
                      ></DeleteForeverIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
