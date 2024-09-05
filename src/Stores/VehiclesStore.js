import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import {
  ref,
  onValue,
  query,
  orderByKey,
  equalTo,
  remove,
  get,
  child,
} from "firebase/database";
import { db } from "../Utils/firebase-config";

class VehicleStore {
  vehicles = [];
  vehiclebyId = [];
  searchQuery = "";

  constructor() {
    makeObservable(this, {
      vehicles: observable,
      vehiclebyId: observable,
      searchQuery: observable,
      fetchVehicles: action,
      fetchVehicleById: action,
      deleteVehicleAndModels: action,
      setSearchQuery: action,
      filteredVehicles: computed,
    });
  }

  setSearchQuery(query) {
    this.searchQuery = query;
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

  get filteredVehicles() {
    if (this.searchQuery) {
      return this.vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.vehicles;
  }

  fetchVehicleById(vehicleId) {
    const vehicleMadeRef = ref(db, "vehicleMade");
    const vehicleModelRef = ref(db, "vehicleModel");

    // Dohvatite pojedinačno vozilo prema ID-ju
    const specificVehicleQuery = query(
      vehicleMadeRef,
      orderByKey(),
      equalTo(vehicleId)
    );

    onValue(specificVehicleQuery, (snapshot) => {
      const vehicleMadeData = snapshot.val();

      if (vehicleMadeData) {
        const vehicle = Object.values(vehicleMadeData)[0]; // Jedini rezultat će biti vozilo s traženim ID-jem

        // Dohvatite sve modele
        onValue(vehicleModelRef, (snapshot) => {
          const vehicleModelData = snapshot.val();

          // Pretvaranje modela u array
          const vehicleModelArray = Object.values(vehicleModelData);

          // Filtrirajte modele prema MadeId
          const models = vehicleModelArray.filter(
            (model) => model.MadeId === vehicle.id
          );

          const combinedData = {
            ...vehicle,
            models: models,
          };

          console.log("Combined Vehicle Data:", combinedData);

          runInAction(() => {
            this.vehicle = combinedData;
          });
        });
      } else {
        runInAction(() => {
          this.vehicle = null; // Ako ne postoji vozilo s tim ID-jem
        });
      }
    });
  }

  async deleteVehicleAndModels(madeId) {
    try {
      //const vehiclesRef = ref(db, "vehicleMade");
      const modelsRef = ref(db, "vehicleModel");

      // Obrišite vozilo
      await remove(ref(db, `vehicleMade/${madeId}`));

      // Pronađite i obrišite povezane modele
      const snapshot = await get(modelsRef);
      snapshot.forEach((childSnapshot) => {
        const modelData = childSnapshot.val();
        if (modelData.MadeId === madeId) {
          remove(child(modelsRef, childSnapshot.key));
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const vehiclesStore = new VehicleStore();
export default vehiclesStore;
