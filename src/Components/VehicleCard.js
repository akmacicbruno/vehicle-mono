import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import vehiclesStore from "../Stores/VehiclesStore";

const VehicleCard = ({ store }) => {
  return (
    <>
      {/* Ako nema pronađenih vozila */}
      {store.length === 0 ? (
        <h2>No vehicle found.</h2>
      ) : (
        <div className="card-container">
          {store.map((vehicle, index) => (
            <Card bg="light" key={index}>
              <div className="card-img">
                <Card.Img variant="top" className="card-img" src="car.svg" />
              </div>
              <Card.Body>
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
                    onClick={() => {
                      window.confirm(
                        "Are you sure you want to delete vehicle?"
                      ) && vehiclesStore.deleteVehicleAndModels(vehicle.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default VehicleCard;
