import React from "react";
import "./App.css";
import Vehicles from "./Pages/Vehicles";
import { vehiclesStore } from "./Stores/VehiclesStore";
import AddVehicleForm from "./Pages/AddVehicle";
import UpdateVehicle from "./Pages/UpdateVehicle";

function App() {
  return (
    <div className="App">
      <Vehicles store={vehiclesStore}></Vehicles>
      <AddVehicleForm></AddVehicleForm>
      <UpdateVehicle store={vehiclesStore}></UpdateVehicle>
    </div>
  );
}

export default App;
