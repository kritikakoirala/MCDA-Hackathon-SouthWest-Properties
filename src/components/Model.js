import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../common/Dropdown";
import Switch from "react-switch";
import { AddressAutofill } from "@mapbox/search-js-react";
import Address from "./Address";
import Button from "../common/Button";
import { FaFileCsv } from "react-icons/fa";
import Papa from "papaparse";
import MultiStep from "react-multistep";
import { instance } from "../config/config";
import Message from "../common/Message";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import Loading from "./Loading";

const Model = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [columnNames, setColumnNames] = useState([]);
  const [fileState, setFileState] = useState({
    succces: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [sampleRows, setSampleRows] = useState([
    "106 Dalkeith Drive, Dartmouth, Nova Scotia, B2W 4E8",
    "TownHouse",
    "1558.0",
    "4.0",
    "2.0",
    "0",
    "1",
    "0",
    "0",
    "0.0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);

  const expectedColumns = [
    "listingAddress",
    "listingPropertyType",
    "listingSizeSquareFeet",
    "bedroomCount",
    "bathroomCount",
    "heatUtility",
    "waterUtility",
    "hydroUtility",
    "furnishedUtility",
    "petPolicy",
    "smokingPolicy",
    "gymAmenity",
    "parkingAmenity",
    "acAmenity",
    "applianceAmenity",
    "storageAmenity",
  ];

  const [data, setData] = useState({
    propertyType: ["house", "apartment", "rental"],
    bedroom: ["1", "2", "3", "4+"],
    bath: ["1", "2", "3", "4+"],
    utility: [],
    policies: [],
    amenities: [],
    address: "",
    sqFt: 0,
  });

  const [selectedFeature, setSelectedFeature] = useState({
    listingAddress: "",
    listingPropertyType: "",
    listingSizeSquareFeet: "",
    bedroomCount: "",
    bathroomCount: "",
    heatUtility: 0,
    waterUtility: 0,
    hydroUtility: 0,
    furnishedUtility: 0,
    petPolicy: 0,
    smokingPolicy: 0,
    gymAmenity: 0,
    parkingAmenity: 0,
    acAmenity: 0,
    applianceAmenity: 0,
    storageAmenity: 0,
  });

  const steps = [
    {
      title: "Basic Info",
      component: (
        <Basic
          data={data}
          setData={setData}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />
      ),
    },
    {
      title: "Utilities",
      component: (
        <Utilities
          data={data}
          setData={setData}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />
      ),
    },
    {
      title: "Policy",
      component: (
        <Policy
          data={data}
          setData={setData}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />
      ),
    },
    {
      title: "Amenities",
      component: (
        <Amenity
          data={data}
          setData={setData}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />
      ),
    },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileNameParts = selectedFile.name.split(".");
      const fileExtension = fileNameParts[fileNameParts.length - 1];
      if (fileExtension !== "csv") {
        setErrorMessage("You can only upload a CSV file.");
        return;
      } else {
        validateCSVColumns(selectedFile);
        if (selectedFile) {
          const currentDate = new Date().toISOString()?.replace(/[-:.]/g, "");
          const newName = `${selectedFile.name
            ?.split(".")
            ?.slice(0, -1)
            ?.join(".")}_${currentDate}.${selectedFile.name.split(".")?.pop()}`;
          const renamedFile = new File([selectedFile], newName, {
            type: selectedFile.type,
          });

          setFile(renamedFile);
        }
        // setFile(selectedFile);
      }
    }
  };

  const validateCSVColumns = (selectedFile) => {
    Papa.parse(selectedFile, {
      header: true,
      complete: (results) => {
        if (
          results &&
          results?.meta?.fields &&
          results?.meta?.fields?.length > 0
        ) {
          // const columnsToBeIncluded = [];
          results?.meta?.fields?.map((field, idx) => {
            if (!columnNames?.includes(field[idx])) {
              setColumnNames(results?.meta?.fields);
            }
          });
        }
      },
      error: (error) => {
        setErrorMessage("Error parsing the CSV file.");
      },
    });
  };

  useEffect(() => {
    if (file !== null) {
      if (columnNames?.length === 0) {
        return setErrorMessage("No CSV header detected.");
      }

      const missingColumns = expectedColumns.filter(
        (column) => !columnNames.includes(column)
      );
      if (missingColumns.length === 0) {
        return setErrorMessage("");
      } else {
        return setErrorMessage(
          `Some necessary columns are missing. Please Look at the Sample CSV.`
        );
      }
    }
  }, [columnNames]);

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (!errorMessage) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await instance.post("/api/csv_upload", formData);

        if (response) {
          setFileState({
            succces: true,
            message: response?.message,
          });
          setErrorMessage("");
          setLoading(false);
        }
      } catch (error) {
        setFileState({
          succces: false,
          message: "",
        });
        setErrorMessage(
          "Something went wrong. Could not upload the file, please try again later"
        );
        setLoading(false);
      }
    }
  };

  const onSingleModelSubmit = (e) => {
    e.preventDefault();

    instance
      .post("/api/rent-forecast", selectedFeature)
      .then((response) => {
        if (response) {
          setFileState({
            succces: true,
            message: response?.message,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setErrorMessage(
          "Something went wrong. Could not upload the file, please try again later"
        );
        console.log(err);
      });
  };
  return (
    <>
      {fileState?.succces ? (
        <Message message={fileState?.message} />
      ) : (
        <div className="landingPage my-5">
          <div className="header text-center mb-4">
            <h2 className="mb-1">Find the ideal rent price</h2>
          </div>
          <div class="container-fluid text-center">
            <div class="row justify-content-center">
              <div class="col-lg-12 col-md-12 col-sm-12 ">
                <span className="secondaryHead text-left text-muted ">
                  Upload a CSV with necessary columns
                </span>{" "}
                <div className="mt-4">
                  <p
                    class="border-0 bg-transparent mt-3 cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <span className="text-primary-color">Note:</span>
                    <span className="fs-9">
                      {" "}
                      Please look at the{" "}
                      <span className="text-decoration-underline fs-9 text-primary-color text-uppercase">
                        sample CSV
                      </span>{" "}
                      to know which format to upload the file
                    </span>{" "}
                  </p>
                  <div class="mb-3 mt-2 w-50 mx-auto">
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      onChange={handleFileChange}
                      accept=".csv"
                    />
                    {file && !errorMessage && (
                      <p className="text-primary-color py-3">
                        {" "}
                        <FaFileCsv />
                        {file?.name}
                      </p>
                    )}
                    {errorMessage && (
                      <p className="text-danger fs-9 mt-3">{errorMessage}</p>
                    )}
                  </div>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div className="modal-header text-center">
                        <h3 className="fs-8 fw-bold mb-0">
                          The uploaded CSV should be in this particular format.
                        </h3>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="table-responsive px-4">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                {expectedColumns &&
                                  expectedColumns?.map((column, idx) => {
                                    return (
                                      <th className=" text-capitalize fs-9">
                                        {column}
                                      </th>
                                    );
                                  })}
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="fs-8 text-secondary">
                                {sampleRows &&
                                  sampleRows?.map((row, idx) => {
                                    return <td>{row}</td>;
                                  })}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  {loading ? <Loading /> : ""}
                  <Button
                    onClick={onSubmit}
                    className=" px-2 py-2 bg-primary-color border-0 rounded-0  ms-2 fs-9"
                    disabled={
                      errorMessage !== "" || file === null || loading
                        ? true
                        : false
                    }
                  >
                    Predict
                  </Button>
                  {fileState?.message && <p>{fileState?.message}</p>}
                </div>
              </div>
              <div className="my-4 custom-bottom">{/* <p>OR</p> */}</div>

              <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                <span className="secondaryHead text-left text-muted ">
                  Predict the rent for a single location
                </span>{" "}
                <div className="shadow px-4 w-50 mx-auto mt-4">
                  <MultiStep
                    activeStep={0}
                    showNavigation={true}
                    steps={steps}
                    prevButton={{
                      title: "Back",
                      style: {
                        background: "transparent",
                        border: "1px solid #c1cd23",
                        color: "#c1cd23",
                        padding: ".2em 1.2em",
                      },
                    }}
                    nextButton={{
                      title: "Next",
                      style: {
                        background: "transparent",
                        border: "1px solid #c1cd23",
                        color: "#c1cd23",
                        padding: ".2em 1.2em",
                        margin: "2em 1em",
                      },
                    }}
                  />
                </div>
                <Button
                  onClick={onSingleModelSubmit}
                  className=" px-2 py-2 bg-primary-color border-0 rounded-0  ms-2 fs-9 my-3"
                >
                  Predict
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Basic = ({
  data,
  setData,
  selectedFeature,
  setSelectedFeature,
}) => {
  const addressChange = (e) => {
    setData((data) => ({ ...data, address: e?.target?.value }));
  };

  const handleRetrieve = (feature) => {
    setData((data) => ({
      ...data,
      address: feature?.features[0]?.properties?.full_address,
    }));
    setSelectedFeature((selectedFeature) => ({
      ...selectedFeature,
      listingAddress: feature?.features[0]?.properties?.full_address,
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <Dropdown
          // className={"border-bottom"}
          options={data?.propertyType}
          title="Property Type"
          name="listingPropertyType"
          value={selectedFeature?.listingPropertyType || ""}
          onChange={(e) =>
            setSelectedFeature((selectedFeature) => ({
              ...selectedFeature,
              listingPropertyType: e?.target?.value,
            }))
          }
        />
        <Dropdown
          className={"mx-2"}
          options={data?.bedroom}
          title="Bedroom"
          name="bedroomCount"
          value={selectedFeature?.bedroomCount || ""}
          onChange={(e) =>
            setSelectedFeature((selectedFeature) => ({
              ...selectedFeature,
              bedroomCount: e?.target?.value,
            }))
          }
        />
        <Dropdown
          options={data?.bath}
          title="Baths"
          name="bathroomCount"
          value={selectedFeature?.bathroomCount || ""}
          onChange={(e) =>
            setSelectedFeature((selectedFeature) => ({
              ...selectedFeature,
              bathroomCount: e?.target?.value,
            }))
          }
        />
      </div>
      <div>
        <div className="my-4 custom-border d-flex justify-content-between">
          <div className="w-75 autocomplete-address">
            <AddressAutofill
              onRetrieve={handleRetrieve}
              accessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
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

        <input
          className="form-control w-25"
          placeholder="Listing Sq ft"
          type="number"
          name="listingSizeSquareFeet"
          value={selectedFeature?.listingSizeSquareFeet || ""}
          onChange={(e) =>
            setSelectedFeature((selectedFeature) => ({
              ...selectedFeature,
              listingSizeSquareFeet: e?.target?.value,
            }))
          }
        />
      </div>
    </>
  );
};
export const Utilities = ({ selectedFeature, setSelectedFeature }) => {
  const allUtilities = [
    "heatUtility",
    "waterUtility",
    "hydroUtility",
    "furnishedUtility",
  ];

  const utilityChange = (e) => {
    const { name, value, checked } = e?.target;
    // console.log(data);

    setSelectedFeature((selectedFeature) => ({
      ...selectedFeature,
      [value]: checked ? 1 : 0,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {allUtilities?.map((utility, idx) => {
        return (
          <div class="form-check form-check-inline" onChange={utilityChange}>
            <input
              class="form-check-input"
              type="checkbox"
              id={idx}
              value={utility}
              name={utility}
            />
            <label class="form-check-label text-capitalize fs-8" for={idx}>
              {utility}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export const Policy = ({ selectedFeature, setSelectedFeature }) => {
  const allPolicies = ["petPolicy", "smokingPolicy"];

  const policyChange = (e) => {
    const { name, value, checked } = e?.target;

    setSelectedFeature((selectedFeature) => ({
      ...selectedFeature,
      [value]: checked ? 1 : 0,
    }));
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {allPolicies?.map((policy, idx) => {
        return (
          <div class="form-check form-check-inline" onChange={policyChange}>
            <input
              class="form-check-input"
              type="checkbox"
              id={idx}
              value={policy}
              name={policy}
            />
            <label class="form-check-label text-capitalize fs-8" for={idx}>
              {policy}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export const Amenity = ({ selectedFeature, setSelectedFeature }) => {
  const allAmenities = [
    "gymAmenity",
    "parkingAmenity",
    "acAmenity",
    "applianceAmenity",
    "storageAmenity",
  ];

  const onamenityChange = (e) => {
    const { name, value, checked } = e?.target;

    setSelectedFeature((selectedFeature) => ({
      ...selectedFeature,
      [value]: checked ? 1 : 0,
    }));
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {" "}
      {allAmenities?.map((amenity, idx) => {
        return (
          <div class="form-check form-check-inline" onChange={onamenityChange}>
            <input
              class="form-check-input"
              type="checkbox"
              id={idx}
              value={amenity}
              name={amenity}
            />
            <label class="form-check-label text-capitalize fs-8" for={idx}>
              {amenity}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Model;
