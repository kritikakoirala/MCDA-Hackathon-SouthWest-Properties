import React, { useState } from "react";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");

  const propertyUrl =
    "https://public.tableau.com/views/CompetitorAnalysis_17121029904210/CompetitorAnalysis?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link";
  const parkingUrl =
    "https://public.tableau.com/views/CommonDashboard/ParkingDashboard?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link";
  const insightsUrl =
    "https://public.tableau.com/views/CommonDashboard/InsightDashboard?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link";

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
            Competitor Analysis
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
      <div
        className="tab-content  d-flex justify-content-center"
        id="myTabContent"
      >
        <div
          className={`tab-pane fade ${
            activeTab === "home" ? "show active" : ""
          }`}
          id="home"
          role="tabpanel"
        >
          {activeTab === "home" && (
            <div className="tableau-container">
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
            <div className="tableau-container">
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
            <div className="tableau-container">
              <TableauEmbed sourceUrl={insightsUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
