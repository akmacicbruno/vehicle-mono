import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
  }, [store]);

  return (
    <div className="App">
      <h1>Vehicle List</h1>
      <ul>
        {store.vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.name} ({vehicle.origin})
            <ul>
              {vehicle.models.length > 0 ? (
                vehicle.models.map((model) => (
                  <li key={model.id}>
                    Model: {model.name}, Type: {model.type}
                  </li>
                ))
              ) : (
                <li>No models available for this vehicle.</li>
              )}
              <button onClick={() => console.log("Update.")}>Update</button>
              <button onClick={() => store.deleteVehicleAndModels(vehicle.id)}>
                Delete
              </button>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Vehicles;
