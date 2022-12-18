import React from "react";
import RouterComponent from "./components/Router"
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}

export default App;
