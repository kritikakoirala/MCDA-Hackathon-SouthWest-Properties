// import React, { useEffect, useRef } from "react";
// import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

// const { tableau } = window;

// const Home = () => {
//   const ref = useRef(null);
//   const url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms";
//   function initViz() {
//     tableau.Viz(ref.current, url);
//   }

//   useEffect(() => {
//     console.log(document.querySelector("iframe"));
//     // document.querySelector("iframe").style.height = "1000px";
//   }, []);

//   window.onload = function () {
//     let viz = document.getElementById("tableauViz");

//     // viz.addEventListener(TableauEventType.FirstInteractive, async (event) => {
//     //   console.log(`Event type is ${eventType}`);
//     //   // call methods to run immediately after loading
//     // });
//     if (viz) {
//       let frame = document.getElementsByTagName("iframe");

//       if (frame) {
//         console.log("Element loaded:", frame);
//       }

//       // Do something with the element when it's loaded
//     }
//   };
//   return (
//     <div
//       className=""
//       style={{
//         alignItems: "center",
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <h1>The Tableau Embedded API v3</h1>
//       <h3>Now more lightweight, and backwards compatible!</h3>
//       <TableauEmbed
//         sourceUrl="http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
//         // OnEventListenerCustomViewLoaded={() => console.log("hola world")}
//         // height={400000}
//       />
//     </div>
//   );
// };

// export default Home;
// import React, { useEffect, useRef } from "react";

// const TableauVisualization = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
//     script.async = true;
//     script.onload = initializeTableau;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const initializeTableau = () => {
//     const container = containerRef.current;
//     const options = {
//       hideTabs: true,
//       width: container.offsetWidth > 800 ? "1000px" : "100%",
//       height: container.offsetWidth > 800 ? "827px" : "1227px",
//       onFirstInteractive: () => {
//         // Do something when the viz is loaded and interactive
//       },
//     };
//     new window.tableau.Viz(container, "shared/TGJKNC7RG", options);
//   };

//   useEffect(() => {
//     const resizeViz = () => {
//       const container = containerRef.current;
//       if (container) {
//         const vizElement = container.querySelector(".tableauViz");
//         if (vizElement) {
//           vizElement.style.width =
//             container.offsetWidth > 800 ? "1000px" : "100%";
//           vizElement.style.height =
//             container.offsetWidth > 800 ? "827px" : "1227px";
//         }
//       }
//     };

//     window.addEventListener("resize", resizeViz);
//     resizeViz();

//     return () => {
//       window.removeEventListener("resize", resizeViz);
//     };
//   }, []);

//   return (
//     <div
//       className="tableauPlaceholder"
//       ref={containerRef}
//       style={{ position: "relative" }}
//     >
//       <noscript>
//         <a href="#">
//           <img
//             alt="Dashboard 1"
//             src="https://public.tableau.com/static/images/TG/TGJKNC7RG/1_rss.png"
//             style={{ border: "none" }}
//           />
//         </a>
//       </noscript>
//       {/* Tableau visualization will be loaded here */}
//     </div>
//   );
// };

// export default TableauVisualization;

import React from "react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;
