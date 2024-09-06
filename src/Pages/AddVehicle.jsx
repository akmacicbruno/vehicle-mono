// AddVehicleForm.js
import React from "react";
import { observer } from "mobx-react-lite";
import { vehicleForm } from "../Stores/AddVehicleForm"; // Importirajte instancu forme
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const AddVehicleForm = observer(() => {
  return (
    <div className="form-container">
      <h1 className="form-title">Add New Vehicle</h1>
      <form onSubmit={vehicleForm.handleSubmit} className="form">
        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label={vehicleForm.$("vehicleMade").label}
            className="mb-3"
            name="vehicleMade"
            value={vehicleForm.$("vehicleMade").value}
            onChange={(e) => vehicleForm.$("vehicleMade").onChange(e)}
          >
            <Form.Control
              type="text"
              placeholder={vehicleForm.$("vehicleMade").placeholder}
            />
          </FloatingLabel>
        </div>
        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label={vehicleForm.$("origin").label}
            className="mb-3"
            name="origin"
            value={vehicleForm.$("origin").value}
            onChange={(e) => vehicleForm.$("origin").onChange(e)}
          >
            <Form.Control
              type="text"
              placeholder={vehicleForm.$("origin").placeholder}
            />
          </FloatingLabel>
        </div>
        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label={vehicleForm.$("modelName").label}
            className="mb-3"
            name="modelName"
            value={vehicleForm.$("modelName").value}
            onChange={(e) => vehicleForm.$("modelName").onChange(e)}
          >
            <Form.Control
              type="text"
              placeholder={vehicleForm.$("modelName").placeholder}
            />
          </FloatingLabel>
        </div>

        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label={vehicleForm.$("modelType").label}
            className="mb-3"
            name="modelType"
            value={vehicleForm.$("modelType").value}
            onChange={(e) => vehicleForm.$("modelType").onChange(e)}
          >
            <Form.Control
              type="text"
              placeholder={vehicleForm.$("modelType").placeholder}
            />
          </FloatingLabel>
        </div>

        <div className="form-buttons">
          <Button variant="dark" type="submit">
            Submit
          </Button>
          <Link to="/" className="form-cancel">
            <p>Cancel</p>
          </Link>
        </div>
      </form>
    </div>
  );
});

export default AddVehicleForm;
