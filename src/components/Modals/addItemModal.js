import React, { useState, Fragment } from "react";
import {
    Button,
    Box,
    Typography,
    MenuItem,
    Modal,
    TextField,
    FormControl,
    Stack,
    InputLabel,
    Select,
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setAddItemModalOpen } from "../../redux/counterSlice";
import AlertCompo from "../Alert";
import { addItmFun } from "../Functions/functions";

const AddItemModal = () => {
    const mockRedux = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const copy = [...mockRedux.apiMock];
    const [addItemObj, setAddItemObj] = useState({
        "id": copy.length,
        "mass": "",
        "name": "",
        "gender": "",
        "height": "ss",
        "species": "",
        "eye_color": "ss",
        "homeworld": "ss",
        "birth_year": "ss",
        "hair_color": "ss",
        "skin_color": "ss"
    });

    return (
        <Fragment>
            <Modal
                open={mockRedux.addItemModalOpen}
                onClose={() => dispatch(setAddItemModalOpen({ bool: false }))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Item
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        placeholder="Enter Name"
                        fullWidth
                        sx={{ my: 4 }}
                        onChange={(e) => {
                            setAddItemObj({
                                ...addItemObj,
                                name: e.target.value
                            })
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Category</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={addItemObj.Category}
                            label="Category"
                            onChange={(e) => {
                                setAddItemObj({
                                    ...addItemObj,
                                    species: e.target.value
                                })
                            }}
                        >
                            {mockRedux.speciesType.filter((item, index) => mockRedux.speciesType.indexOf(item) === index).map((item) => {
                                return (
                                    <MenuItem value={item}>{item}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 4 }}>
                        <InputLabel id="demo-select-small">Gender</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={addItemObj.Species}
                            label="Gender"
                            onChange={(e) => {
                                setAddItemObj({
                                    ...addItemObj,
                                    gender: e.target.value
                                })
                            }}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack spacing={2} direction="row" sx={{ width: 'fit-content', margin: 'auto' }}>
                        <Button variant="contained" color="error" onClick={() => dispatch(setAddItemModalOpen({ bool: false }))}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={() => addItmFun(addItemObj)} disabled={addItemObj["name" && "gender" && "gender"] === ""}>Add Item</Button>
                    </Stack>
                </Box>
            </Modal>
            <AlertCompo />
        </Fragment>
    )
}
export default AddItemModal;