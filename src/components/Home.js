import React from "react";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

const Home = () => {
  const url =
    "https://public.tableau.com/shared/H68Y6KJK6?:display_count=n&:origin=viz_share_link";

  return (
    // <div className="w-75 mx-auto pt-5 pb-2 px-4">
    <div className="container w-75 pt-5 pb-2 px-4">
      <ul class="nav nav-tabs fs-9" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Property Listing
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Dashboard 2
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Dashboard 3
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div
            className=""
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              // width: "80%",
            }}
          >
            <div className="tableau-container 100vh">
              <TableauEmbed sourceUrl={url} />
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          ...
        </div>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ...
        </div>
      </div>
    </div>
  );
};

export default Home;
