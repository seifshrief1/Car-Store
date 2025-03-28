import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { useCarContext } from "../contexts/CarsContext";

const CompareCars = () => {
  const [selectedCars, setSelectedCars] = useState([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [cars, setCars] = useState([]);
  const { user } = useCarContext();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsRef = collection(db, "cars");
        const carsQuery = query(
          carsRef,
          where("owner", "!=", user?.fullName || "")
        );
        const carsSnapshot = await getDocs(user ? carsQuery : carsRef);
        const filteredCars = carsSnapshot.docs.map((doc) => doc.data());
        setCars(filteredCars);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCars();
  }, []);

  const openModal = (buttonIndex) => {
    setActiveButton(buttonIndex);
    setIsModalOpen(true);
  };

  const selectCar = (car) => {
    const newSelection = [...selectedCars];
    newSelection[activeButton] = car;
    setSelectedCars(newSelection);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-5 p-5">
      <h1 className="text-5xl text-blue-600/75 font-bold tracking-tighter text-center">
        Compare Cars
      </h1>

      {/* Two Large Add Buttons */}
      <div className="flex justify-center flex-wrap gap-10 mt-6">
        {selectedCars.map((car, index) => (
          <button
            key={index}
            onClick={() => openModal(index)}
            className="w-52 h-32 border-2 border-blue-600/75 text-blue-500 font-bold text-lg flex items-center justify-center rounded-lg hover:bg-blue-100"
          >
            {car ? (
              <div className="text-center">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-24 mx-auto mb-2"
                />
                <p>{car.title}</p>
              </div>
            ) : (
              "+ Add Car"
            )}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedCars.every((car) => car !== null) && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Car</th>
                <th className="p-3">Price</th>
                <th className="p-3">Year</th>
                <th className="p-3">Fuel</th>
                <th className="p-3">Transmission</th>
                <th className="p-3">Engine Capacity (CC)</th>
                <th className="p-3">HorsePower</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {selectedCars.map((car, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{car?.title}</td>
                  <td className="p-3">{car?.price}</td>
                  <td className="p-3">{car?.year}</td>
                  <td className="p-3">{car?.fuelType}</td>
                  <td className="p-3">{car?.transmission}</td>
                  <td className="p-3">{car?.cc}</td>
                  <td className="p-3">{car?.horsePower} HP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold text-start mb-4">Select a Car</h2>
            <div className="grid gap-4">
              {cars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => selectCar(car)}
                  className="flex items-start gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-100"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <p className="font-bold">{car.title}</p>
                    <p className="text-gray-500 text-start">{car.price}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCars;
