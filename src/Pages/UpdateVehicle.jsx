import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

const UpdateVehicle = observer(({ store }) => {
  store.vehicleId = useParams().id;
  useEffect(() => {
    store.loadVehicleData(store.vehicleId);
  }, [store]);

  return (
    <div>
      <Link to="/">Back home</Link>
      <h1>Update Vehicle</h1>
      <form onSubmit={store.handleSubmit}>
        <div>
          <label>Vehicle Made:</label>
          <input
            type="text"
            value={store.$("vehicleMade").value}
            onChange={(e) => store.$("vehicleMade").onChange(e)}
          />
        </div>
        <div>
          <label>Origin:</label>
          <input
            type="text"
            value={store.$("origin").value}
            onChange={(e) => store.$("origin").onChange(e)}
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={store.$("modelName").value}
            onChange={(e) => store.$("modelName").onChange(e)}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={store.$("modelType").value}
            onChange={(e) => store.$("modelType").onChange(e)}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
});

export default UpdateVehicle;
