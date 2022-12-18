import { mockData } from "../mock/mock";
import { store } from "../../redux/store";
import { setApiMock } from "../../redux/counterSlice";


export const reduxStateFun = () => {

    // state for adding mock data
    store.dispatch(
        setApiMock({
            mockData: mockData
        })
    )
}