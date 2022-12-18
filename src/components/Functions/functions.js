import { store } from "../../redux/store";
import { setApiMock } from "../../redux/counterSlice";


export const reduxStateFun = () => {
    fetch('http://localhost:5000/mockData').then((res) => res.json()).then((data) => {
        store.dispatch(
            setApiMock({
                mockData: data
            })
        )
    })
}