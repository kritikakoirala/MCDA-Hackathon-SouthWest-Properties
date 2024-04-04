import React, { useState } from "react";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");

  const propertyUrl =
    "https://public.tableau.com/shared/H68Y6KJK6?:display_count=n&:origin=viz_share_link";
  const parkingUrl =
    "https://public.tableau.com/views/CommonDashboard/Dashboard2?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link";
  const insightsUrl =
    "https://public.tableau.com/views/CommonDashboard/InsightsDashboard?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container w-75 pt-5 pb-2 px-4">
      <ul className="nav nav-tabs fs-9" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleTabChange("home")}
          >
            Property Listing
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            Parking
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => handleTabChange("contact")}
          >
            Insights
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane fade ${
            activeTab === "home" ? "show active" : ""
          }`}
          id="home"
          role="tabpanel"
        >
          {activeTab === "home" && (
            <div className="tableau-container 100vh">
              <TableauEmbed sourceUrl={propertyUrl} />
            </div>
          )}
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "profile" ? "show active" : ""
          }`}
          id="profile"
          role="tabpanel"
        >
          {activeTab === "profile" && (
            <div className="tableau-container 100vh">
              <TableauEmbed sourceUrl={parkingUrl} />
            </div>
          )}
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "contact" ? "show active" : ""
          }`}
          id="contact"
          role="tabpanel"
        >
          {activeTab === "contact" && (
            <div className="tableau-container 100vh">
              <TableauEmbed sourceUrl={insightsUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
