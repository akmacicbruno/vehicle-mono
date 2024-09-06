import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
  }, [store]);

  const filteredVehicles = store.filteredVehicles;

  return (
    <div className="App">
      <div className="search">
        <input
          className="search-input form-control"
          type="text"
          placeholder="Search for a vehicle by brand"
          value={store.searchQuery} // MobX store drži searchQuery
          onChange={(e) => store.setSearchQuery(e.target.value)}
        />
      </div>

      {/* Ako nema pronađenih vozila */}
      {filteredVehicles.length === 0 ? (
        <h2>No vehicle found.</h2>
      ) : (
        <div className="card-container">
          {store.filteredVehicles.map((vehicle, index) => (
            <Card bg="light">
              <div className="card-img">
                <Card.Img variant="top" className="card-img" src="car.svg" />
              </div>

              <Card.Body key={index}>
                <Card.Title>{vehicle.name}</Card.Title>
                {vehicle.models.length > 0 ? (
                  vehicle.models.map((model) => (
                    <ListGroup key={model.id}>
                      <ListGroup.Item variant="secondary">
                        Origin: {vehicle.origin}
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary">
                        Model: {model.name}
                      </ListGroup.Item>
                      <ListGroup.Item variant="secondary">
                        Type: {model.type}
                      </ListGroup.Item>
                    </ListGroup>
                  ))
                ) : (
                  <Card.Title>No models available for this vehicle.</Card.Title>
                )}
                <div className="card-buttons">
                  <Link to={`/update/${vehicle.id}`}>
                    <Button variant="dark">Edit vehicle</Button>
                  </Link>
                  <Button
                    variant="secundary"
                    onClick={() => store.deleteVehicleAndModels(vehicle.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
});

export default Vehicles;
