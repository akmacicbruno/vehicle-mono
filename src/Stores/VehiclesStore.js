import { action, makeObservable, observable, runInAction } from "mobx";
import { ref, onValue } from "firebase/database";
import { db } from "../Utils/firebase-config";

class VehicleStore {
  vehicles = [];

  constructor() {
    makeObservable(this, {
      vehicles: observable,
      fetchVehicles: action,
    });
  }

  fetchVehicles() {
    const vehicleMadeRef = ref(db, "vehicleMade");
    const vehicleModelRef = ref(db, "vehicleModel");

    onValue(vehicleMadeRef, (snapshot) => {
      const vehicleMadeData = snapshot.val();

      onValue(vehicleModelRef, (snapshot) => {
        const vehicleModelData = snapshot.val();

        const vehicleMadeArray = Object.values(vehicleMadeData);
        const vehicleModelArray = Object.values(vehicleModelData);

        // Povezivanje vozila sa modelima na osnovu MadeId
        const combinedData = vehicleMadeArray.map((vehicle) => {
          const models = vehicleModelArray.filter(
            (model) => model.MadeId === vehicle.id
          );
          return {
            ...vehicle,
            models: models,
          };
        });

        runInAction(() => {
          this.vehicles = combinedData;
        });
      });
    });
  }
}

export const vehiclesStore = new VehicleStore();
export default vehiclesStore;
