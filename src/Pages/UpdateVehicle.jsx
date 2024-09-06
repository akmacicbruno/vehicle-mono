import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

const UpdateVehicle = observer(({ store }) => {
  store.vehicleId = useParams().id;
  useEffect(() => {
    store.loadVehicleData(store.vehicleId);
  }, [store]);

  return (
    <div className="form-container">
      <h1 className="form-title">Edit vehicle</h1>
      <form onSubmit={store.handleSubmit} className="form">
        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label="Vehicle Made"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={store.$("vehicleMade").value}
              onChange={(e) => store.$("vehicleMade").onChange(e)}
              placeholder="Placeholder"
            />
          </FloatingLabel>
        </div>
        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label="Origin"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={store.$("origin").value}
              placeholder="Placeholder"
              onChange={(e) => store.$("origin").onChange(e)}
            />
          </FloatingLabel>
        </div>
        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label="Model"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={store.$("modelName").value}
              placeholder="Placeholder"
              onChange={(e) => store.$("modelName").onChange(e)}
            />
          </FloatingLabel>
        </div>

        <div className="form-input">
          <FloatingLabel
            controlId="floatingInput"
            label="Type"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={store.$("modelType").value}
              placeholder="Placeholder"
              onChange={(e) => store.$("modelType").onChange(e)}
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

export default UpdateVehicle;
