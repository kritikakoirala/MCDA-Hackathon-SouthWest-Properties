import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./common/Navbar";
import "./assets/styles/main.css";
import SingleView from "./components/SingleView";
import Properties from "./components/Properties";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<SingleView />} />
      </Routes>
    </>
  );
}

export default App;
