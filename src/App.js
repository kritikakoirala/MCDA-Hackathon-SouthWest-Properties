import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./common/Navbar";
import "./assets/styles/main.css";
import SingleView from "./components/listing/SingleView";
import Properties from "./components/listing/Properties";
import Model from "./components/model/Model";
import { useEffect } from "react";
import Model_Predictions from "./components/model/Model_Predictions";
import Create from "./components/listing/Create";
import Builders from "./components/Builders";
import ModelTrainingState from "./components/model/ModelTrainingState";

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
        <Route path="/listings/create" element={<Create />} />
        <Route path="/builders" element={<Builders />} />

        <Route path="/prediction/status" element={<ModelTrainingState />} />
      </Routes>
    </>
  );
}

export default App;
