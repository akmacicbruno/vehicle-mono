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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="akmacicbruno.github.io/vehicle-mono/" element={<Layout />}>
          <Route index element={<Vehicles store={vehiclesStore} />} />
          <Route
            path="add"
            element={<AddVehicleForm store={vehiclesStore} />}
          />
          <Route
            path="update/:id"
            element={<UpdateVehicle store={updateVehicle} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
