import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
  }, [store]);

  return (
    <div className="App">
      <Link to="/add">Add new vehicle</Link>
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
              <Link to={`/update/${vehicle.id}`}> Uredi</Link>
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
