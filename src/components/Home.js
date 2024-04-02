import React from "react";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

const Home = () => {
  const url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms";

  return (
    <div
      className=""
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* <h1>The Tableau Embedded API v3</h1>
      <h3>Now more lightweight, and backwards compatible!</h3> */}
      <div className="tableau-container 100vh p-3">
        <TableauEmbed sourceUrl={url} />
      </div>
    </div>
  );
};

export default Home;
