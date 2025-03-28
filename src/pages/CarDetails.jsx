import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  FaCar,
  FaGasPump,
  FaHorseHead,
  FaMapMarkerAlt,
  FaPalette,
  FaPhoneAlt,
  FaRoad,
  FaCogs,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaWhatsapp,
} from "react-icons/fa";

const CarDetails = () => {
  const { title } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carsRef = collection(db, "cars");
        const carsSnapshot = await getDocs(carsRef);
        const filteredCars = carsSnapshot.docs
          .map((doc) => doc.data())
          .filter((ad) => ad.title === title);
        setCar(filteredCars[0]);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    fetchCar();
  }, [title]);

  return (
    <div className="container mx-auto p-6">
      {car ? (
        <div className="grid md:grid-cols-2 gap-6 items-center bg-white shadow-lg rounded-lg p-6">
          {/* Car Image */}
          <div>
            <img
              src={car.image}
              alt={car.title}
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Car Details */}
          <div className="flex flex-col space-y-4">
            <h2 className="md:text-4xl text-2xl font-bold text-blue-600/75">
              {car.title}
            </h2>

            {/* Price */}
            <p className="text-2xl font-semibold text-green-600 flex items-center">
              <FaMoneyBillWave className="mr-2" /> ${car.price}
            </p>

            {/* Car Info Grid */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-gray-700">
              <p className="flex items-center">
                <FaCar className="mr-2 text-blue-500" /> <strong>Brand:</strong>{" "}
                {car.carBrand}
              </p>
              <p className="flex items-center">
                <FaCogs className="mr-2 text-purple-500" />{" "}
                <strong>Transmission:</strong> {car.transmission}
              </p>
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
                <strong>Year:</strong> {car.year}
              </p>
              <p className="flex items-center">
                <FaGasPump className="mr-2 text-red-500" />{" "}
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p className="flex items-center">
                <FaHorseHead className="mr-2 text-orange-500" />{" "}
                <strong>Horse Power:</strong> {car.horsePower} HP
              </p>
              <p className="flex items-center">
                <FaRoad className="mr-2 text-green-500" />{" "}
                <strong>Mileage:</strong> {car.mileage} km
              </p>
              <p className="flex items-center">
                <FaPalette className="mr-2 text-yellow-500" />{" "}
                <strong>Color:</strong> {car.color}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-600" />{" "}
                <strong>Location:</strong> {car.location}
              </p>
            </div>

            {/* Description */}
            <div className="mt-2">
              <h3 className="font-bold">Description</h3>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* WhatsApp Contact */}
            <div className="mt-4">
              <a
                href={`https://wa.me/${car.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-500/75 text-green-500/75 hover:bg-green-600/75 hover:text-white transition duration-300 px-6 py-3 rounded-lg flex items-center justify-center text-lg"
              >
                <FaWhatsapp className="mr-2" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Loading car details...</p>
      )}
    </div>
  );
};

export default CarDetails;
