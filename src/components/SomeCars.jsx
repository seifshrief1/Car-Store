import React from "react";
import { RiGasStationLine } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import { TbAutomaticGearbox } from "react-icons/tb";
import { useCarContext } from "../contexts/CarsContext";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";

const SomeCars = () => {
  const { ads, handleAddToFavorites } = useCarContext();
  return (
    <div className="mt-20">
      <h1 className="text-5xl text-blue-600/75 font-bold tracking-tighter text-center">
        Some Cars
      </h1>
      <p className="text-gray-600 text-center text-sm">
        Here are Some cars You Can Explore & Compare
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center mt-5 p-5">
        {ads.slice(0, 10).map((ad, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default SomeCars;
