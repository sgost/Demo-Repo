import React from "react";
import {
    Box,
    Typography,
    Modal,
    Stack,
    Button
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setRemoveItemModalObj } from "../../redux/counterSlice";

const DeleteItemModal = ({ removeItem }) => {
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
        p: 2,
    };
    return (
        <Modal
            open={mockRedux.removeItemModalObj.bool}
            onClose={() => dispatch(setRemoveItemModalObj({ bool: false, selectedRow: {} }))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Do u want to Delete ?
                </Typography>
                <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                    <Button variant="contained" color="error" onClick={() => dispatch(setRemoveItemModalObj({ bool: false, selectedRow: {} }))}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={removeItem}>
                        Delete
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}
export default DeleteItemModal;