import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Login from "../Login/index";
import Products from "../Products";
import Pricing from "../Pricing";

function RouterComponent() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route exact path="/Products" element={<Products />} />
            <Route exact path="/Pricing" element={<Pricing />} />
        </Routes>
    );
}
export default RouterComponent;