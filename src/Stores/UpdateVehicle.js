import { makeObservable, observable, action } from "mobx";
import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { db } from "../Utils/firebase-config";
import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";

// Definicija polja forme
const fields = {
  vehicleMade: {
    label: "Vehicle Made",
    placeholder: "Enter vehicle made",
    rules: "required|string",
  },
  origin: {
    label: "Origin",
    placeholder: "Enter country of origin",
    rules: "required|string",
  },
  modelName: {
    label: "Model Name",
    placeholder: "Enter model name",
    rules: "required|string",
  },
  modelType: {
    label: "Model Type",
    placeholder: "Enter model type",
    rules: "required|string",
  },
};

const plugins = {
  dvr: dvr({ package: validatorjs }),
};

class UpdateVehicle extends MobxReactForm {
  vehicleId = "";
  vehicleMade = "";
  origin = "";
  modelName = "";
  modelType = "";

  constructor() {
    super({ fields }, { plugins });

    // Oznaka observable varijabli i metoda
    makeObservable(this, {
      vehicleMade: observable,
      origin: observable,
      modelName: observable,
      modelType: observable,
      handleChange: action,
      handleSubmit: action,
      loadVehicleData: action,
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.$(e.target.name).set(e.target.value);
  }

  async loadVehicleData(vehicleId) {
    try {
      // Dohvati podatke o vozilu
      const vehicleRef = ref(db, `vehicleMade/${vehicleId}`);
      const vehicleData = (await get(vehicleRef)).val();

      const modelsRef = ref(db, "vehicleModel");
      const modelsQuery = query(
        modelsRef,
        orderByChild("MadeId"),
        equalTo(vehicleId)
      );
      const modelsSnapshot = await get(modelsQuery);
      const modelsData = modelsSnapshot.val();
      const modelsList = modelsData ? Object.values(modelsData) : [];

      // Postavi podatke u formu
      this.set({
        vehicleMade: vehicleData?.name || "Unknown",
        origin: vehicleData?.origin || "Unknown",
        modelName: modelsList[0]?.name || "Unknown", // Pretpostavljamo da je samo jedan model povezan
        modelType: modelsList[0]?.type || "Unknown",
      });
    } catch (error) {
      console.error("Greška pri učitavanju podataka:", error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.validate().then(() => {
      if (this.isValid) {
        this.onSuccess(this, this.vehicleId);
      } else {
        this.onError(this);
        console.log("Error occured.");
      }
    });
  }

  // Metoda za uspješno predavanje forme
  async onSuccess(form, vehicleId) {
    // Dohvati podatke iz forme
    const vehicleMadeData = {
      name: this.$("vehicleMade").value,
      origin: this.$("origin").value,
    };

    const modelData = {
      name: this.$("modelName").value,
      type: this.$("modelType").value,
    };

    try {
      // Ažuriraj vehicleMade čvor
      const vehicleRef = ref(db, `vehicleMade/${vehicleId}`);

      // Ažuriraj sve modele koji su povezani s ovim vehicleId
      const modelsRef = ref(db, "vehicleModel");
      const modelsQuery = query(
        modelsRef,
        orderByChild("MadeId"),
        equalTo(vehicleId)
      );

      const modelsSnapshot = await get(modelsQuery, "value");
      const modelsData = modelsSnapshot.val();

      if (modelsData) {
        const updates = {};
        Object.keys(modelsData).forEach((key) => {
          // Ažurirajte svaki model sa novim podacima
          updates[`vehicleModel/${key}`] = {
            ...modelsData[key], // Zadrži ostale podatke o modelu
            ...modelData, // Ažuriraj ime i tip modela
          };
        });

        update(vehicleRef, vehicleMadeData);
        update(ref(db), updates);
      }

      alert("Podaci su uspješno ažurirani.");
    } catch (err) {
      console.error(err);
    }
  }

  // Metoda za neuspješno predavanje forme
  onError(form) {
    alert("Please fill in all required fields correctly.");
  }
}

// Kreiraj instancu forme
const updateVehicle = new UpdateVehicle();
export { updateVehicle };
