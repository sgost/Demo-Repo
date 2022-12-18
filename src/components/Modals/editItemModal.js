import React, { useState } from "react";
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
import { setApiMock, setEditDataObj, setAlertObj } from "../../redux/counterSlice";

const EditItemModal = () => {
    const mockRedux = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const [editObj, setEditObj] = useState({});
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

    // Close modal Function
    const modalCloseFun = () => {
        dispatch(setEditDataObj({
            bool: false,
            index: "",
            row: ""
        }))
    }

    const editMockFun = () => {
        let copy = [...mockRedux.apiMock];
        copy[mockRedux.editDataObj?.index] = {
            ...copy[mockRedux.editDataObj?.index],
            "name": editObj?.name || mockRedux.editDataObj?.name,
            "species": editObj?.species || mockRedux.editDataObj?.species,
            "gender": editObj?.gender || mockRedux.editDataObj?.gender
        }
        dispatch(setApiMock({
            mockData: copy
        }));
        dispatch(setAlertObj({
            alertOpen: true,
            alertType: "success",
            alertMessage: "Edited successfully"
        }))
        modalCloseFun()
        console.log("copy", copy)
    }

    return (
        <Modal
            open={mockRedux.editDataObj.open}
            onClose={modalCloseFun}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Item
                </Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Item Label"
                    defaultValue={mockRedux.editDataObj?.name}
                    fullWidth
                    sx={{ my: 4 }}
                    onChange={(e) => {
                        setEditObj({
                            ...editObj,
                            name: e.target.value
                        });
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-select-small">Species</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        defaultValue={mockRedux.editDataObj?.species}
                        label="Species"
                        onChange={(e) => {
                            setEditObj({
                                ...editObj,
                                species: e.target.value
                            });
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
                        defaultValue={mockRedux.editDataObj?.gender}
                        label="Gender"
                        onChange={(e) => {
                            setEditObj({
                                ...editObj,
                                gender: e.target.value
                            });
                        }}
                    >
                        <MenuItem value="male">male</MenuItem>
                        <MenuItem value="female">female</MenuItem>
                        <MenuItem value="NA">NA</MenuItem>
                    </Select>
                </FormControl>
                <Stack spacing={2} direction="row" sx={{ width: 'fit-content', margin: 'auto' }}>
                    <Button variant="contained" color="error" onClick={modalCloseFun}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => editMockFun()}>Edit Item</Button>
                </Stack>
            </Box>
        </Modal>
    )
}
export default EditItemModal;