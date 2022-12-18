import { store } from "../../redux/store";
import axios from 'axios';
import { setApiMock, setAlertObj, setAppBarShow, setAddItemModalOpen, setRemoveItemModalObj } from "../../redux/counterSlice";

// Initial call to set mockdata to redux state
export const reduxStateFun = () => {
    axios({
        url: 'http://localhost:5000/mockData',
        method: 'GET'
    }).then((res) => {
        if (res) {
            store.dispatch(
                setApiMock({
                    mockData: res.data.reverse()
                })

            )
            store.dispatch(setAppBarShow({ bool: true }));
        }
    }).catch((error) => console.log("Error", error));
}

// Edit item API
export const editMockFun = (props) => {
    const { mockRedux, editObj, modalCloseFun } = props;
    let copy = [...mockRedux.apiMock];
    copy[mockRedux.editDataObj?.index] = {
        ...copy[mockRedux.editDataObj?.index],
        "name": editObj?.name || mockRedux.editDataObj?.name,
        "species": editObj?.species || mockRedux.editDataObj?.species,
        "gender": editObj?.gender || mockRedux.editDataObj?.gender
    }
    axios({
        url: `http://localhost:5000/mockData/${mockRedux.editDataObj?.id}`,
        method: 'PATCH',
        data: copy[mockRedux.editDataObj?.index]
    }).then((_res) => {
        reduxStateFun();
        store.dispatch(setAlertObj({
            alertOpen: true,
            alertType: "success",
            alertMessage: "Edited successfully"
        }));
        modalCloseFun();
    }).catch((error) => console.log("Error", error));
}

// Add item API
export const addItmFun = (addItemObj) => {
    axios({
        url: `http://localhost:5000/mockData`,
        method: 'POST',
        data: addItemObj
    }).then((_res) => {
        store.dispatch(setAddItemModalOpen({ bool: false }));
        store.dispatch(setAlertObj({
            alertOpen: true,
            alertType: 'success',
            alertMessage: 'This is a success message!'
        }))
        reduxStateFun();
    }).catch((error) => console.log("Error", error));
}

export const deleteItmFun = (id) => {
    axios({
        url: `http://localhost:5000/mockData/${id}`,
        method: 'DELETE'
    }).then((_res) => {
        store.dispatch(setRemoveItemModalObj({ bool: false, selectedRow: {} }));
        store.dispatch(setAlertObj({
            alertOpen: true,
            alertType: 'success',
            alertMessage: 'Deleted successfully!'
        }))
        reduxStateFun();
    }).catch((error) => console.log("Error", error));
}