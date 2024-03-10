import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import jsonData from "../assets/sampleData/rentals_ca.json";
import Listing from "./Listing";
import Dropdown from "../common/Dropdown";
import { MdClose } from "react-icons/md";

const Properties = () => {
  // const initialData = jsonData;
  const [initialData, setInitialData] = useState(jsonData);
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(""); // State for sorting

  useEffect(() => {
    setInitialData(jsonData);
  }, [jsonData]);
  useEffect(() => {
    // Apply search
    // console.log(searchTerm);
    const searchResult = initialData.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(searchTerm ? searchResult : initialData);
  }, [searchTerm]);

  useEffect(() => {
    // Apply filter
    const filtered = data?.filter((item) => {
      // console.log("@item", item);
      // Check if the item matches the filter criteria
      let meetsCriteria = true;
      if (filters?.bath) {
        meetsCriteria =
          meetsCriteria &&
          item?.baths_range?.includes(parseFloat(filters?.bath));
      }
      if (filters?.bedroom) {
        meetsCriteria =
          meetsCriteria &&
          item?.beds_range?.includes(parseInt(filters?.bedroom?.trim()));
        console.log(meetsCriteria);
      }
      if (filters?.property_type) {
        meetsCriteria =
          meetsCriteria &&
          item?.property_type.toLowerCase() ===
            filters?.property_type?.toLocaleLowerCase();
      }
      if (filters?.rent_range) {
        meetsCriteria =
          meetsCriteria &&
          item.rent_range[0] >= filters?.rent_range?.minVal &&
          item.rent_range[1] <= filters?.rent_range?.maxVal;
      }

      return meetsCriteria;
    });

    if (sortBy === "price_low_to_high") {
      filtered.sort((a, b) => a.rent_range[0] - b.rent_range[0]);
    } else if (sortBy === "price_high_to_low") {
      filtered.sort((a, b) => b.rent_range[0] - a.rent_range[0]);
    } else {
    }
    setFilteredData(filtered);
  }, [filters, data, sortBy]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (selectedFilter) => {
    setFilters(selectedFilter);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearAll = () => {
    setSearchTerm("");
    setFilters({});
    setData(initialData);
  };

  const removeItem = (item) => {
    setFilters((prevData) => {
      // Create a copy of the state object
      const newData = { ...prevData };
      // Remove the property
      delete newData[item];
      // Return the updated state object
      return newData;
    });
  };

  return (
    <div className="propertyListing">
      <div className="container py-4">
        <div className="advanceFilter custom-bottom">
          <div className=" d-flex justify-content-between align-items-center w-100">
            <Search searchTerm={searchTerm} handleSearch={handleSearch} />

            <div className="d-flex">
              <div>
                <Dropdown
                  options={["price_low_to_high", "price_high_to_low"]}
                  title="Sort Type"
                  name="sort_type"
                  value={sortBy || ""}
                  onChange={handleSortChange}
                />
              </div>
              <button
                className=" px-2 py-2 bg-primary-color border-0  ms-2 fs-9"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                More Filter
              </button>

              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div class="offcanvas-header px-4 custom-bottom">
                  <h5 id="offcanvasRightLabel">Filter By</h5>
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body py-4">
                  {" "}
                  <Filter handleFilter={handleFilter} clearAll={clearAll} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 filtersBadge">
            {filters &&
              Object?.keys(filters)?.map((item, idx) => {
                console.log(filters[item]);
                return item !== "rent_range" ? (
                  <span className="badge  rounded-pill  bg-primary-color text-capitalize me-2">
                    {item && item?.replace(/_/g, " ")} : {filters[item]}
                    <MdClose
                      className="icon"
                      onClick={() => removeItem(item)}
                    />
                  </span>
                ) : (
                  <span className="badge rounded-pill bg-primary-color text-capitalize me-2">
                    {item} :{" "}
                    {filters[item]?.minVal + "-" + filters[item]?.maxVal}
                    <MdClose
                      className="icon"
                      onClick={() => removeItem(item)}
                    />
                  </span>
                );
              })}
          </div>
        </div>

        <Listing filteredItems={filteredData} />
      </div>
    </div>
  );
};

export default Properties;
