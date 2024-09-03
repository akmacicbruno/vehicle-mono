// AddVehicleForm.js
import React from "react";
import { observer } from "mobx-react-lite";
import { vehicleForm } from "../Stores/AddVehicleForm"; // Importirajte instancu forme

const AddVehicleForm = observer(() => {
  return (
    <div>
      <h1>Add New Vehicle</h1>
      <form onSubmit={vehicleForm.handleSubmit}>
        <div>
          <label>{vehicleForm.$("vehicleMade").label}</label>
          <input
            type="text"
            name="vehicleMade"
            value={vehicleForm.$("vehicleMade").value}
            onChange={(e) => vehicleForm.$("vehicleMade").onChange(e)}
            placeholder={vehicleForm.$("vehicleMade").placeholder}
          />
        </div>
        <div>
          <label>{vehicleForm.$("origin").label}</label>
          <input
            type="text"
            name="origin"
            value={vehicleForm.$("origin").value}
            onChange={(e) => vehicleForm.$("origin").onChange(e)}
            placeholder={vehicleForm.$("origin").placeholder}
          />
        </div>
        <div>
          <label>{vehicleForm.$("modelName").label}</label>
          <input
            type="text"
            name="modelName"
            value={vehicleForm.$("modelName").value}
            onChange={(e) => vehicleForm.$("modelName").onChange(e)}
            placeholder={vehicleForm.$("modelName").placeholder}
          />
        </div>
        <div>
          <label>{vehicleForm.$("modelType").label}</label>
          <input
            type="text"
            name="modelType"
            value={vehicleForm.$("modelType").value}
            onChange={(e) => vehicleForm.$("modelType").onChange(e)}
            placeholder={vehicleForm.$("modelType").placeholder}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
});

export default AddVehicleForm;
