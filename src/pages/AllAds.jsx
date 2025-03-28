import React, { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { RiGasStationLine } from "react-icons/ri";
import { TbAutomaticGearbox } from "react-icons/tb";
import { useCarContext } from "../contexts/CarsContext";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";

const AllAds = () => {
  const {
    ads,
    handleAddToFavorites,
    setAds,
    user,
    search,
    setSearch,
    newOrUsed,
    setNewOrUsed,
    transmission,
    setTransmission,
    fuel,
    setFuel,
  } = useCarContext();
  const [loading, setLoading] = useState(false);

  // Search cars
  useEffect(() => {
    const searchCars = async () => {
      setLoading(true);
      try {
        const carsRef = collection(db, "cars");
        let carsQuery = user
          ? query(carsRef, where("owner", "!=", user?.fullName))
          : query(carsRef);

        const carsSnapshot = await getDocs(carsQuery);
        const filteredAds = carsSnapshot.docs
          .map((doc) => doc.data())
          .filter((car) =>
            car.title.toLowerCase().includes(search.toLowerCase())
          );

        setAds(filteredAds);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    searchCars();
  }, [search]);

  // Filter by new or used
  useEffect(() => {
    const filterCars = async () => {
      try {
        const carsRef = collection(db, "cars");
        let carsQuery = query(carsRef);

        if (user) {
          carsQuery = query(carsQuery, where("owner", "!=", user?.fullName));
        }
        if (newOrUsed) {
          carsQuery = query(carsQuery, where("carType", "==", newOrUsed));
        }
        if (transmission) {
          carsQuery = query(
            carsQuery,
            where("transmission", "==", transmission)
          );
        }
        if (fuel) {
          carsQuery = query(carsQuery, where("fuelType", "==", fuel));
        }

        const carsSnapshot = await getDocs(carsQuery);
        const filteredAds = carsSnapshot.docs.map((doc) => doc.data());

        setAds(filteredAds);
      } catch (error) {
        alert(error.message);
      }
    };

    filterCars();
  }, [newOrUsed, transmission, fuel]);

  return (
    <div className="mt-5 p-3">
      <div className="flex flex-col gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded border border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex justify-between items-center w-full gap-2">
          <select
            id="transmission"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value="" selected disabled>
              Transmission
            </option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          <select
            id="carType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={newOrUsed}
            onChange={(e) => setNewOrUsed(e.target.value)}
          >
            <option value="" disabled>
              New Or Used
            </option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>

          <select
            id="fuel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option value="" selected disabled>
              Fuels
            </option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-300 my-10" />

      {loading ? (
        <p className="text-center text-lg font-bold">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
          {ads.length === 0 ? (
            <p className="text-center text-lg font-bold">No Ads Found</p>
          ) : (
            ads.map((ad, index) => (
              <div className="border border-gray-300 rounded-2xl h-[480px]">
                <CarCard ad={ad} />
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center p-2">
                  <h2 className="text-2xl font-bold p-1">${ad?.price}</h2>
                  <button
                    onClick={() => handleAddToFavorites(ad)}
                    className="bg-red-600/75 text-white p-2 text-xs rounded-md cursor-pointer hover:bg-red-500 transition duration-300"
                  >
                    Add To Favorites
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllAds;
