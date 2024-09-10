import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import GridLoader from "react-spinners/GridLoader";
import VehicleCard from "../Components/VehicleCard";
import vehiclesStore from "../Stores/VehiclesStore";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
  }, [store]);

  return (
    <div className="App">
      {store.loading ? (
        <div className="loader-container">
          <GridLoader
            size={20}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className="search">
            <input
              className="search-input form-control"
              type="text"
              placeholder="Search for a vehicle by brand"
              value={store.searchQuery} // MobX store drži searchQuery
              onChange={(e) => store.setSearchQuery(e.target.value)}
            />
          </div>
          <VehicleCard store={vehiclesStore}></VehicleCard>
        </div>
      )}
    </div>
  );
});

export default Vehicles;
