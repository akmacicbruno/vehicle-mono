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
  vehicleModels = [];
  uniqueTypes = [];
  vehiclebyId = [];
  searchQuery = "";
  selectedVehicleType = "";
  loading = true;
  loading_small = false;

  constructor() {
    makeObservable(this, {
      vehicles: observable,
      vehicleModels: observable,
      uniqueTypes: observable,
      vehiclebyId: observable,
      searchQuery: observable,
      selectedVehicleType: observable,
      loading: observable,
      fetchVehicles: action,
      fetchVehicleById: action,
      deleteVehicleAndModels: action,
      setSearchQuery: action,
      filteredVehicles: computed,
      fetchUniqueVehicleTypes: action,
      setSelectedVehicleType: action,
    });
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  setSelectedVehicleType(event) {
    this.selectedVehicleType = event.target.value; // Ažuriranje odabrane vrijednosti
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
          this.loading = false;
        });
      });
    });
  }

  get filteredVehicles() {
    // Ako postoji pretraga po imenu
    if (this.searchQuery && this.searchQuery.trim() !== "") {
      return this.vehicles.filter((vehicle) => {
        // Ako postoji odabrani tip vozila i nije zadana opcija
        if (
          this.selectedVehicleType &&
          this.selectedVehicleType !== "Select vehicle type"
        ) {
          return (
            vehicle.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) &&
            vehicle.models.some(
              (model) =>
                model.type &&
                model.type.toLowerCase() ===
                  this.selectedVehicleType.toLowerCase()
            )
          );
        }
        // Ako nema odabranog tipa vozila, samo filtriraj po imenu
        return vehicle.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    }

    // Ako postoji samo odabrani tip vozila
    if (
      this.selectedVehicleType &&
      this.selectedVehicleType !== "Select vehicle type"
    ) {
      return this.vehicles.filter((vehicle) =>
        vehicle.models.some(
          (model) =>
            model.type &&
            model.type.toLowerCase() === this.selectedVehicleType.toLowerCase()
        )
      );
    }

    // Ako nema nijednog kriterija, vrati sva vozila
    return this.vehicles;
  }

  // Metoda za dohvaćanje vozila i jedinstvenih tipova
  async fetchUniqueVehicleTypes() {
    const vehicleModelRef = ref(db, "vehicleModel");

    try {
      const snapshot = await get(vehicleModelRef);
      const data = snapshot.val();

      if (data) {
        const modelsArray = Object.values(data);
        const types = modelsArray.map((model) => model.type);

        runInAction(() => {
          this.vehicleModels = modelsArray;
          this.uniqueTypes = [...new Set(types)]; // Filtriraj jedinstvene tipove
        });
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju modela vozila:", error);
    }
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
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  }
}

export const vehiclesStore = new VehicleStore();
export default vehiclesStore;
