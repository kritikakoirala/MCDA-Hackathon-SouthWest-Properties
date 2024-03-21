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
      </Routes>
    </>
  );
}

export default App;
