import "./App.css";
import Vehicles from "./Pages/Vehicles";
import { vehiclesStore } from "./Stores/VehiclesStore";

function App() {
  return (
    <div className="App">
      <Vehicles store={vehiclesStore}></Vehicles>
    </div>
  );
}

export default App;
