import React from "react";
import RouterComponent from "./components/Router"
import { BrowserRouter } from "react-router-dom";
import AppBarCompo from "./components/AppBar"
import { useSelector } from 'react-redux';

function App() {
  const mockRedux = useSelector((state) => state.counter);
  return (
    <BrowserRouter>
      {mockRedux.appBarShow && <AppBarCompo />}
      <RouterComponent />
    </BrowserRouter>
  );
}

export default App;
