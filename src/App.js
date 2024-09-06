import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Vehicles from "./Pages/Vehicles";
import { vehiclesStore } from "./Stores/VehiclesStore";
import { updateVehicle } from "./Stores/UpdateVehicle";
import AddVehicleForm from "./Pages/AddVehicle";
import UpdateVehicle from "./Pages/UpdateVehicle";
import NotFound from "./Pages/404";
import Layout from "./Pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Vehicles store={vehiclesStore} />} />
          <Route path="add" element={<AddVehicleForm />} />
          <Route
            path="update/:id"
            element={<UpdateVehicle store={updateVehicle} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
