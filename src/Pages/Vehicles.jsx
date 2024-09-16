import "../App.css";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import GridLoader from "react-spinners/GridLoader";
import VehicleCard from "../Components/VehicleCard";
import Form from "react-bootstrap/esm/Form";
import ReactPaginate from "react-paginate";

const Vehicles = observer(({ store }) => {
  useEffect(() => {
    store.fetchVehicles();
    store.fetchUniqueVehicleTypes();
  }, [store]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // react-paginate uses 0-based index
    store.setPage(selectedPage);
  };

  return (
    <div className="App">
      {store.loading ? (
        <div className="loader-container">
          <GridLoader
            size={20}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className="search">
            <input
              className="search-input form-control"
              type="text"
              placeholder="Search for a vehicle by brand"
              value={store.searchQuery} // MobX store drži searchQuery
              onChange={(e) => store.setSearchQuery(e.target.value)}
            />
            <Form.Select
              className="select"
              aria-label="Select vehicle type"
              onChange={(e) => store.setSelectedVehicleType(e)}
              value={store.selectedVehicleType}
            >
              <option>Select vehicle type</option>
              {store.uniqueTypes.map((type, index) => (
                <option key={index}>{type}</option>
              ))}
            </Form.Select>
          </div>
          <VehicleCard store={store.filteredVehicles}></VehicleCard>
          {store.filteredVehicles.length === 0 ? (
            <div></div>
          ) : (
            <div>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={store.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default Vehicles;
