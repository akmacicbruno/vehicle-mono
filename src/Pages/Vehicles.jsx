import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
  }, [store]);

  const filteredVehicles = store.filteredVehicles;

  return (
    <div className="App">
      <Link to="/add">Add new vehicle</Link>
      <h1>Vehicle List</h1>
      <input
        type="text"
        placeholder="Search for a vehicle by brand name"
        value={store.searchQuery} // MobX store drži searchQuery
        onChange={(e) => store.setSearchQuery(e.target.value)}
      />

      {/* Ako nema pronađenih vozila */}
      {filteredVehicles.length === 0 ? (
        <h2>No vehicle found.</h2>
      ) : (
        <div>
          {store.filteredVehicles.map((vehicle) => (
            <ul key={vehicle.id}>
              {vehicle.name} ({vehicle.origin})
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
          ))}
        </div>
      )}
    </div>
  );
});

export default Vehicles;
