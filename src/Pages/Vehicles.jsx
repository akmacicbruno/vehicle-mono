import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import GridLoader from "react-spinners/GridLoader";
import VehicleCard from "../Components/VehicleCard";
import vehiclesStore from "../Stores/VehiclesStore";
import Form from "react-bootstrap/esm/Form";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
    store.fetchUniqueVehicleTypes();
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
            <Form.Select
              className="select"
              aria-label="Select vehicle type"
              onChange={(e) => store.setSelectedVehicleType(e)}
              value={store.selectedVehicleType}
            >
              <option>Select vehicle type</option>
              {store.uniqueTypes.map((type, index) => (
                <option key={index}>{type}</option>
              ))}
            </Form.Select>
          </div>
          <VehicleCard store={vehiclesStore}></VehicleCard>
        </div>
      )}
    </div>
  );
});

export default Vehicles;
