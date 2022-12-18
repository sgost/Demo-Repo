import React, { useEffect, Fragment } from "react";
import {
  Button,
  Box,
  IconButton,
  Container,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddItemModal from "../Modals/addItemModal";
import EditItemModal from "../Modals/editItemModal";
import DeleteItemModal from "../Modals/deleteItemModal";
import "./styles.css";
import { useSelector, useDispatch } from 'react-redux';
import { reduxStateFun } from "../Functions/functions";
import AlertCompo from "../Alert";
import { setSearchSpiciesType, setAddItemModalOpen, setRemoveItemModalObj, setEditDataObj } from "../../redux/counterSlice";


const Products = () => {

  const mockRedux = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    reduxStateFun();
    // eslint-disable-next-line
  }, [])

  const removeItemRow = (row) => {
    dispatch(setRemoveItemModalObj({ bool: true, selectedRow: row }));
  }

  const editDataFun = (row, index) => {
    dispatch(setEditDataObj({
      bool: true,
      index: index,
      row: row
    }))
  }

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            my: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          PRODUCTS
        </Typography>
        <FormControl fullWidth >
          <InputLabel id="demo-select-small">Category</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={mockRedux.searchSpiciesType}
            label="Category"
            onChange={(e) => dispatch(setSearchSpiciesType({ value: e.target.value }))}
          >
            {mockRedux.speciesType.filter((item, index) => mockRedux.speciesType.indexOf(item) === index).map((item) => {
              return (
                <MenuItem value={item}>{item}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ my: 2, mx: `93% ` }}
          onClick={() => dispatch(setAddItemModalOpen({ bool: true }))}
        >
          Add
        </Button>
        <Box sx={{ bgcolor: "red" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Species</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRedux.apiMock.filter((item) => {
                  let tempItm;
                  if (item.species.includes(mockRedux.searchSpiciesType)) {
                    tempItm = item;
                  }
                  return tempItm;
                }).map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.species}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => editDataFun(row, index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => removeItemRow(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <AddItemModal />
      <EditItemModal />
      <DeleteItemModal />
      {/* Alert modal */}
      <AlertCompo />
    </Fragment>
  );
};
export default Products;
