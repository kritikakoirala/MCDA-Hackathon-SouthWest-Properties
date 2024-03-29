import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./common/Navbar";
import "./assets/styles/main.css";
import SingleView from "./components/SingleView";
import Properties from "./components/Properties";
import Model from "./components/Model";
import { useEffect } from "react";
import MapTest from "./components/MapTest";
import Model_Predictions from "./components/Model_Predictions";
import Create from "./components/listingCRUD/Create";

function App() {
  const successCallback = (position) => {
    // console.log(position);
  };

  const errorCallback = (error) => {
    // console.log(error);
  };
  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback
    );

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<SingleView />} />
        <Route path="/model" element={<Model />} />
        <Route path="/model/results" element={<Model_Predictions />} />
        <Route path="/map" element={<MapTest />} />
        <Route path="/listings/create" element={<Create />} />
      </Routes>
    </>
  );
}

export default App;
