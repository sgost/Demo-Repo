import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiMock: [],
  speciesType: [],
  searchSpiciesType: "",
  addItemModalOpen: false,
  removeItemModalObj: {},
  alertObj: {},
  editDataObj: {}
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // TO save inital mock API data
    setApiMock: (state, action) => {
      state.apiMock = action.payload.mockData;
      const tempArr = []
      action.payload.mockData.filter((item) => tempArr.push(item.species));
      state.speciesType = tempArr;
    },
    setSearchSpiciesType: (state, action) => {
      state.searchSpiciesType = action.payload.value
    },
    setAddItemModalOpen: (state, action) => {
      state.addItemModalOpen = action.payload.bool
    },
    setRemoveItemModalObj: (state, action) => {
      state.removeItemModalObj = action.payload
    },
    setAlertObj: (state, action) => {
      const tempObj = {
        alertOpen: action.payload.alertOpen,
        alertType: action.payload.alertType,
        alertMessage: action.payload.alertMessage
      }

      state.alertObj = tempObj
    },
    setEditDataObj: (state, action) => {
      const obj = {
        open: action.payload.bool,
        index: action.payload.index,
        name: action.payload.row.name,
        gender: action.payload.row.gender,
        species: action.payload.row.species
      }
      state.editDataObj = obj
    }
  },
});

// Action creators are generated for each case reducer function
export const { setApiMock, setSearchSpiciesType, setAddItemModalOpen, setRemoveItemModalObj, setAlertObj, setEditDataObj } = counterSlice.actions;

export default counterSlice.reducer;
