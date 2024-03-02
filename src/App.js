import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Listing from "./components/Listing";
import Navbar from "./common/Navbar";
import "./assets/styles/main.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Listing />} />
      </Routes>
    </>
  );
}

export default App;
