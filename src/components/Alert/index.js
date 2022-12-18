import React from "react";
import {
    Alert,
    Snackbar
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setAlertObj } from "../../redux/counterSlice";

const AlertCompo = () => {
    const mockRedux = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    // alert close function
    const closeFun = () => {
        dispatch(setAlertObj({
            alertOpen: false,
            alertType: "",
            alertMessage: ""
        }))
    };
    return <Snackbar open={mockRedux.alertObj.alertOpen} autoHideDuration={6000} onClose={closeFun}>
        <Alert onClose={closeFun} severity="success" sx={{ width: '100%' }}>
            {mockRedux.alertObj.alertMessage}
        </Alert>
    </Snackbar>
}
export default AlertCompo;