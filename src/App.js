import React from "react";
import "./App.css";
import Vehicles from "./Pages/Vehicles";
import { vehiclesStore } from "./Stores/VehiclesStore";
import AddVehicleForm from "./Pages/AddVehicle";

function App() {
  return (
    <div className="App">
      <Vehicles store={vehiclesStore}></Vehicles>
      <AddVehicleForm></AddVehicleForm>
    </div>
  );
}

export default App;
