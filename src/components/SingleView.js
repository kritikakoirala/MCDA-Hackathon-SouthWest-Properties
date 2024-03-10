import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineEventNote } from "react-icons/md";
import { BsFillLampFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const SingleView = () => {
  const location = useLocation();
  const { item } = location?.state;

  const groupedAmenities = item?.amenities?.reduce((acc, curr) => {
    const categorySlug = curr.category.slug;
    if (!acc[categorySlug]) {
      acc[categorySlug] = [];
    }
    acc[categorySlug].push(curr);
    return acc;
  }, {});

  const updatedAmenity =
    groupedAmenities &&
    Object?.entries(groupedAmenities).map(([category, amenities]) => ({
      category,
      amenities,
    }));

  const getBedandBathDetails = () => {
    return (
      <p className=" fs-8 text-secondary">
        {`${Math.max(...item?.beds_range)} Bed | ${Math.max(
          ...item?.baths_range
        )} Bath `}
      </p>
    );
  };

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex details p-3">
              <div className="detailedView">
                <img src={item?.photo?.url} className="position-relative" />
              </div>

              <div className=" ms-4 shadow">
                <ul
                  class="nav nav-pills mb-3 rounded-top"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item " role="presentation">
                    <button
                      class="nav-link active rounded"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <MdOutlineEventNote />
                      Overview
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link rounded"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <BsFillLampFill />
                      Amenities
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link rounded"
                      id="pills-details-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-details"
                      type="button"
                      role="tab"
                      aria-controls="pills-details"
                      aria-selected="false"
                    >
                      <BiDetail />
                      Full Details
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link rounded"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      <FaLocationDot /> Map View
                    </button>
                  </li>
                </ul>
                <div class="tab-content " id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="px-2">
                      <div className="my-1 mb-2 d-flex">
                        {item?.active ? (
                          <span className="border-primary-color rounded-pill p-1 px-3 fs-8">
                            Available
                          </span>
                        ) : (
                          <span className="border-primary-color rounded-pill p-1 px-3 fs-8">
                            Sold
                          </span>
                        )}
                        {item?.categories &&
                          item?.categories?.map((cat) => {
                            return (
                              <>
                                <span className="border-primary-color rounded-pill p-1 px-3 fs-8 mx-2">
                                  {cat}
                                </span>
                              </>
                            );
                          })}
                      </div>

                      <h6 class=" fw-bold">{item?.name}</h6>
                      <p className="text-primary-color fw-bold mb-1">
                        ${item?.rent_range[0]}
                      </p>
                      <p className=" fs-8 text-secondary fw-bold d-flex align-items-center">
                        <span>
                          {" "}
                          <FaLocationDot />
                        </span>
                        <span>{item?.address1}</span>
                      </p>
                      <p className=" fs-8 text-secondary">{item?.summary}</p>

                      {getBedandBathDetails()}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade "
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div className="py-2 px-3">
                      {item?.amenities &&
                        updatedAmenity?.map((amenity, index) => {
                          return (
                            <div className="mb-3">
                              <h6 className="fs-9 fw-bold text-capitalize">
                                {amenity?.category}
                              </h6>
                              <div>
                                {amenity?.amenities &&
                                  amenity?.amenities?.map((feat, idx) => {
                                    return (
                                      <>
                                        <span className="bg-secondary-color me-3 rounded-pill p-1 px-3 fs-8">
                                          {feat?.name}
                                        </span>
                                      </>
                                    );
                                  })}
                              </div>
                              {/* <p>{amenity?.name}</p> */}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-details"
                    role="tabpanel"
                    aria-labelledby="pills-details-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleView;
