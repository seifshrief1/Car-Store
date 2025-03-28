import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AllAds from "./pages/AllAds";
import CarDetails from "./pages/CarDetails";
import AddAds from "./pages/AddAds";
import CompareCars from "./pages/CompareCars";
import Navbar from "./components/Navbar";
import MyAds from "./pages/MyAds";
import MyFavorites from "./pages/MyFavorites";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all_ads" element={<AllAds />} />
        <Route path="/all_ads/:title" element={<CarDetails />} />
        <Route path="/add_ads" element={<AddAds />} />
        <Route path="/compare_cars" element={<CompareCars />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/favorites" element={<MyFavorites />} />
      </Routes>
    </>
  );
}

export default App;
