import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { FaLocationDot, FaRegBuilding } from "react-icons/fa6";

import { instance } from "../config/config";
const Builders = () => {
  const [data, setData] = useState([
    {
      projectName: "Navy Lane",
      projectLocation: "Spring Garden Road",
      projectStatus: "Under Planning",
      projectBuilder: "Dexel",
    },
    {
      projectName: "Builder 1",
      projectLocation: "Location 1",
      projectStatus: "Under Planning",
      projectBuilder: "Dexel",
    },
    {
      projectName: "Builder 1",
      projectLocation: "Location 1",
      projectStatus: "Under Planning",
      projectBuilder: "Dexel",
    },
    {
      projectName: "Builder 1",
      projectLocation: "Location 1",
      projectStatus: "Under Planning",
      projectBuilder: "Urban Capital    ",
    },
  ]);

  //   useEffect(() => {
  //     instance
  //       .get("/api/builders")
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);
  return (
    <>
      <div className="container pt-5">
        <div className="row">
          {data?.length > 0 ? (
            data?.map((build, idx) => {
              return (
                <div className="col-lg-4 col-md-4 col-sm-12 my-3" key={idx}>
                  <div className="builder-card border-0 p-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>{build?.projectName}</h5>
                      <span
                        class={`badge rounded-pill bg-success mx-2 my-1 px-3 py-2 `}
                      >
                        {build?.projectStatus}
                      </span>
                    </div>
                    <p className="mb-1 text-primary-color fs-9">
                      <FaLocationDot />
                      {build?.projectLocation}
                    </p>
                    <p className="mb-1 fs-9">
                      <FaRegBuilding />
                      {build?.projectBuilder}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default Builders;
