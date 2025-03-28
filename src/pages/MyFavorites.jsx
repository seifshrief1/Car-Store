import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { RiGasStationLine } from "react-icons/ri";
import { TbAutomaticGearbox } from "react-icons/tb";
import { useCarContext } from "../contexts/CarsContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import CarCard from "../components/CarCard";

const MyFavorites = () => {
  const { favorites, setFavorites } = useCarContext();

  const handleDeleteFavorites = async (title) => {
    try {
      await deleteDoc(doc(db, "favorites", title));
      setFavorites(favorites.filter((ad) => ad.title !== title));
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  return (
    <div className="mt-5 p-3">
      <h1 className="md:text-5xl text-2xl text-blue-600/75 font-bold tracking-tighter text-center">
        My Favorite Cars ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center mt-5">
        {favorites.map((ad, index) => (
          <div className="border border-gray-300 rounded-2xl h-[480px] relative">
            <CarCard ad={ad} />
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center p-2">
              <h2 className="text-2xl font-bold p-1">${ad?.price}</h2>
              <span
                className="text-red-600/75 p-1 text-lg cursor-pointer rounded border border-red-600 hover:bg-red-600/75 hover:text-white transition duration-300"
                onClick={() => handleDeleteFavorites(ad.title)}
              >
                <FaTrashAlt />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
