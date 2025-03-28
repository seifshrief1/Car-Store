import React from "react";
import { IoIosTimer } from "react-icons/io";
import { RiGasStationLine } from "react-icons/ri";
import { TbAutomaticGearbox } from "react-icons/tb";
import { Link } from "react-router-dom";

const CarCard = ({ ad }) => {
  return (
    <div>
      <p
        className={`absolute z-10 mt-2 mx-1 rounded-full w-14 text-center text-white text-sm font-bold p-1 ${
          ad.carType === "Used" ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {ad?.carType}
      </p>
      <Link to={`/all_ads/${ad.title}`}>
        <img
          src={ad.image}
          className="rounded-t-2xl w-full h-[300px] cursor-pointer"
          alt="Car"
        />
      </Link>
      <h3 className="text-2xl font-bold p-3">{ad?.title}</h3>
      <hr className="border-gray-200" />
      <div className="flex justify-around items-center py-2">
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl">
            <RiGasStationLine />
          </span>
          <p className="text-sm text-black">{ad?.mileage}/km</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl">
            <IoIosTimer />
          </span>
          <p className="text-sm text-black">{ad?.fuelType}</p>
        </div>{" "}
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl">
            <TbAutomaticGearbox />
          </span>
          <p className="text-sm text-black">{ad?.transmission}</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
