import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../common/Dropdown";
import Switch from "react-switch";
import { AddressAutofill } from "@mapbox/search-js-react";
import Address from "./Address";
import Button from "../common/Button";
import { FaFileCsv } from "react-icons/fa";
import Papa from "papaparse";

const Model = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [columnNames, setColumnNames] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/listings/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        listingMajorRegion: "Western Passagess",
        // bedroom: "2.0",
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [data, setData] = useState({
    propertyType: ["house", "apartment", "rental"],
    bedroom: ["1", "2", "3", "4+"],
    bath: ["1", "2", "3", "4+"],
    electricity: false,
    heat: true,
    parking: false,
    water: true,
    address: "",
  });

  const addressChange = (e) => {
    setData((data) => ({ ...data, address: e?.target?.value }));
    // console.log(e?.target);
  };

  //   console.log("@data", data);
  const handleRetrieve = (feature) => {
    console.log(feature);
    setData((data) => ({
      ...data,
      address: feature?.features[0]?.properties?.full_address,
    }));
  };

  // console.log(file);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      const fileNameParts = selectedFile.name.split(".");
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      if (fileExtension !== "csv") {
        setErrorMessage("You can only upload a CSV file.");
        return;
      }
      // setFile(selectedFile);
      validateCSVColumns(selectedFile);
    }

    const validateCSVColumns = (selectedFile) => {
      Papa.parse(selectedFile, {
        header: true,
        complete: (results) => {
          if (
            results &&
            results?.meta?.fields &&
            results?.meta?.fields?.length > 0
          ) {
            setColumnNames(results?.meta?.fields);
          }
        },
        error: (error) => {
          setErrorMessage("Error parsing the CSV file.");
        },
      });

      // if(columnNames?.includes(""))
    };
  };

  return (
    <>
      <div className="landingPage my-5">
        <div class="container-fluid text-center">
          <div class="row">
            {/* <div class="col-lg-6 col-md-4 col-sm-12 bg-white vh-100 text-start postion-relative p-0"></div> */}
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <div className="header">
                <h2 className="">Find the ideal r ent price</h2>
              </div>
              <div className="mt-4">
                <span className="text-left text-muted">
                  Upload a CSV with all the paratemers
                </span>{" "}
                <div class="mb-3 mt-2 w-50 mx-auto">
                  {/* <label for="formFile" class="form-label">Default file input example</label> */}
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    onChange={handleFileChange}
                    accept=".csv"
                  />
                  {errorMessage && (
                    <p className="text-danger fs-9">{errorMessage}</p>
                  )}
                  {file && (
                    <p className="text-primary-color py-3">
                      {" "}
                      <FaFileCsv />
                      {file?.name}
                    </p>
                  )}
                </div>
              </div>
              <p>OR</p>
              <div>
                <span className="text-left text-muted">
                  Check for an individual location
                </span>{" "}
                <div className="shadow w-50 p-4 mx-auto mt-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <Dropdown
                      // className={"border-bottom"}
                      options={data?.propertyType}
                      title="Property Type"
                      name="property_type"
                      // value={selectedFilter?.property_type || ""}
                      // onChange={onPropertyChange}
                    />
                    <Dropdown
                      className={"mx-2"}
                      options={data?.bedroom}
                      title="Bedroom"
                      name="bed"
                      // value={selectedFilter?.property_type || ""}
                      // onChange={onPropertyChange}
                    />
                    <Dropdown
                      options={data?.bath}
                      title="Baths"
                      name="bath"
                      // value={selectedFilter?.property_type || ""}
                      // onChange={onPropertyChange}
                    />
                  </div>
                  <div>
                    <div className="my-4 custom-border d-flex justify-content-between">
                      <div className="w-75 autocomplete-address">
                        <AddressAutofill
                          onRetrieve={handleRetrieve}
                          accessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
                          confirmOnBrowserAutofill={{
                            minimap: true,
                            skipConfirmModal: (feature) =>
                              ["exact", "high"].includes(
                                feature.properties.match_code.confidence
                              ),
                          }}
                        >
                          <input
                            className="form-control border-0 border-bottom rounded-0 fs-8 py-1 px-0 w-100 "
                            name="address"
                            placeholder="Type your postal address like 5672 Cornel st...."
                            type="text"
                            autoComplete="address-line1"
                            onChange={addressChange}
                            value={data?.address}
                          />
                        </AddressAutofill>
                      </div>
                    </div>

                    <div className="d-flex my-3 justify-content-between flex-wrap">
                      <div>
                        <span
                          className={`fs-8 ${
                            data?.electricity
                              ? "text-primary-color"
                              : "text-muted"
                          }`}
                        >
                          Electricity
                        </span>
                        <Switch
                          onChange={() => !data?.electricity}
                          checked={data?.electricity}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          className="mx-2"
                          width={52}
                          height={20}
                        />
                      </div>
                      <div>
                        <span
                          className={`fs-8 ${
                            data?.electricity
                              ? "text-primary-color"
                              : "text-muted"
                          }`}
                        >
                          Water
                        </span>
                        <Switch
                          onChange={() => !data?.electricity}
                          checked={data?.water}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          className="mx-2"
                          width={52}
                          height={20}
                        />
                      </div>
                      <div>
                        <span
                          className={`fs-8 ${
                            data?.parking ? "text-primary-color" : "text-muted"
                          }`}
                        >
                          Parking
                        </span>
                        <Switch
                          onChange={() => !data?.parking}
                          checked={data?.parking}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          className="mx-2"
                          width={52}
                          height={20}
                        />
                      </div>
                      <div>
                        <span
                          className={`fs-8 ${
                            data?.parking ? "text-primary-color" : "text-muted"
                          }`}
                        >
                          Heat
                        </span>
                        <Switch
                          onChange={() => !data?.heat}
                          checked={data?.heat}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          className="mx-2"
                          width={52}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button className={"mt-4"}>Predict</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
