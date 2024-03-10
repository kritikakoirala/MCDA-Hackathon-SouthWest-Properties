import React, { useEffect, useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import {
  MdOutlinePets,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import LabelHeader from "../common/LabelHeader";
import Dropdown from "../common/Dropdown";
import Tags from "../common/Tags";
import Button from "../common/Button";
import jsonData from "../assets/sampleData/sample_data.json";

const Filter = ({ handleFilter, clearAll, className }) => {
  const [data, setData] = useState({
    propertyType: [],
    bedroom: ["1", "2", "3", "4+"],
    bath: ["1", "2 ", "3", "4+"],
    // price: "",
    pets_policy: ["Dogs Allowed", "Cats Allowed", "Any", "No Pets"],
    amenities: ["heat", "wifi", "parking"],
  });
  const [selectedFilter, setSelectedFilter] = useState({});

  useEffect(() => {
    // Function to extract unique values for each key
    const extractUniqueValues = () => {
      const propertyTypes = [
        ...new Set(jsonData.map((item) => item["Property Type"])),
      ];

      setData((data) => ({
        ...data,
        propertyType: propertyTypes,
      }));
    };

    // Call the function to extract unique values when component mounts
    extractUniqueValues();
  }, [jsonData]);

  const onPropertyChange = (e) => {
    setSelectedFilter((selectedFilter) => ({
      ...selectedFilter,
      property_type: e?.target?.value,
    }));
  };

  const onPriceChange = (e) => {
    e?.preventDefault();
    const { name, value } = e?.target;

    setSelectedFilter((selectedFilter) => ({
      ...selectedFilter,
      rent_range: { ...selectedFilter?.rent_range, [name]: value },
    }));
  };

  const clearFilter = (e) => {
    e?.preventDefault();
    setSelectedFilter({});
    clearAll();
  };

  return (
    <div>
      <div className={`${className}   px-3`}>
        <div className="py-3 custom-bottom">
          <LabelHeader title="Property Type" icon={<BsBuildingsFill />} />
          <Dropdown
            options={data?.propertyType}
            title="Property Type"
            name="property_type"
            value={selectedFilter?.property_type || ""}
            onChange={onPropertyChange}
          />
        </div>
        <div className="py-3 custom-bottom">
          <LabelHeader title="Price" icon={<RiMoneyDollarCircleFill />} />
          <div className="d-flex">
            <form class=" price d-flex justify-content-between">
              <div>
                <input
                  type="number"
                  class="form-control"
                  name="minVal"
                  id="minVal"
                  placeholder="0"
                  onChange={onPriceChange}
                  value={selectedFilter?.rent_range?.minVal || ""}
                />
                <label for="minVal" className="fs-8 text-primary-color">
                  Min
                </label>
              </div>
              <div className="ms-2">
                <input
                  type="number"
                  class="form-control "
                  id="maxVal"
                  name="maxVal"
                  placeholder="2000"
                  onChange={onPriceChange}
                  value={selectedFilter?.rent_range?.maxVal || ""}
                />
                <label for="maxVal" className="fs-8 text-primary-color">
                  Max
                </label>
              </div>
            </form>
            {/* <form class="form-floating price ms-3">
            
          </form> */}
          </div>
        </div>

        <div className="py-3 custom-bottom">
          <LabelHeader title="Bedroom" icon={<FaBed />} />
          <Tags
            label="bedroom"
            tags={data?.bedroom}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        </div>

        <div className="py-3 custom-bottom">
          <LabelHeader title="Bath" icon={<GiBathtub />} />
          <Tags
            label="bath"
            tags={data?.bath}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        </div>

        <div className="py-3">
          <LabelHeader title="Pets Policy" icon={<MdOutlinePets />} />
          <Tags
            label="pets"
            tags={data?.pets_policy}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        </div>
        {/* <div className="py-2">
        <LabelHeader title="Amenities" icon={<MdOutlinePets />} />
        <Tags
          label="amenities"
          tags={data?.amenities}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
      </div> */}

        <div className=" d-flex justify-content-center align-items-center">
          <Button onClick={() => handleFilter(selectedFilter)}>Filter</Button>
          <Button className={"bg-black mx-3"} onClick={clearFilter}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
