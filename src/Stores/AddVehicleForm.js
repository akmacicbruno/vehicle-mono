import { makeObservable, observable, action } from "mobx";
import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { push, ref, set } from "firebase/database";
import { db } from "../Utils/firebase-config";

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

class VehicleForm extends MobxReactForm {
  vehicleMade = "";
  origin = "";
  modelName = "";
  modelType = "";
  loading_small = false;

  constructor() {
    super({ fields }, { plugins });

    // Oznaka observable varijabli i metoda
    makeObservable(this, {
      vehicleMade: observable,
      origin: observable,
      modelName: observable,
      modelType: observable,
      loading_small: observable,
      handleChange: action,
      handleSubmit: action,
      toggleLoading: action,
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.$(e.target.name).set(e.target.value);
  }

  toggleLoading() {
    this.loading_small = !this.loading_small;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.validate().then(() => {
      if (this.isValid) {
        this.toggleLoading();
        this.onSuccess(this);
        this.toggleLoading();
      } else {
        this.toggleLoading();
        this.onError(this);
        this.toggleLoading();
      }
    });
  }

  // Metoda za uspješno predavanje forme
  onSuccess(form) {
    const vehicleData = {
      name: form.$("vehicleMade").value,
      origin: form.$("origin").value,
    };

    const modelsData = {
      name: form.$("modelName").value,
      type: form.$("modelType").value,
    };

    const vehicleRef = ref(db, "vehicleMade");
    const newVehicleRef = push(vehicleRef); // Generira novi ključ
    const vehicleKey = newVehicleRef.key;

    set(newVehicleRef, {
      id: vehicleKey,
      ...vehicleData,
    });

    const vehicleModelRef = ref(db, "vehicleModel");
    const newVehicleModelRef = push(vehicleModelRef); // Generira novi ključ

    set(newVehicleModelRef, {
      MadeId: vehicleKey,
      ...modelsData,
    });
    alert("New vehicle added to database.");
    window.location.href = "/add";
  }

  // Metoda za neuspješno predavanje forme
  onError(form) {
    alert("Please fill in all required fields correctly.");
  }
}

// Kreiraj instancu forme
const vehicleForm = new VehicleForm();
export { vehicleForm };
