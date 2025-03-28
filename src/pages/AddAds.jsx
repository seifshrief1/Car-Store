import React, { useState } from "react";
import { useCarContext } from "../contexts/CarsContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";

const AddAds = () => {
  const { handleAddNewAdvertisement } = useCarContext();
  const [title, setTitle] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [carType, setCarType] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [image, setImage] = useState(null);
  const [mileage, setMileage] = useState("");
  const [cc, setCc] = useState("");
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);
      await handleAddNewAdvertisement(
        title,
        carBrand,
        description,
        price,
        carType,
        year,
        fuelType,
        horsePower,
        image,
        mileage,
        cc,
        color,
        transmission,
        location,
        phone
      );
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-5">
      <h1 className="md:text-5xl text-2xl text-blue-600/75 font-bold tracking-tighter text-center">
        Add New Advertisement
      </h1>
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-50 shadow-md rounded-md grid gap-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter advertisement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="car brand"
          >
            Car Brand
          </label>
          <input
            id="car brand"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 uppercase"
            placeholder="Enter car brand"
            value={carBrand}
            onChange={(e) => setCarBrand(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter advertisement description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="carType"
            >
              Car Type
            </label>
            <select
              id="carType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option selected>Car Type</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="year"
            >
              Manufacturing Year
            </label>
            <input
              id="year"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mileage"
            >
              Mileage (km)
            </label>
            <input
              id="mileage"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cc"
            >
              Engine Capacity (CC)
            </label>
            <input
              id="cc"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter engine capacity"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fuelType"
            >
              Fuel Type
            </label>
            <select
              id="fuelType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option selected>Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="transmission"
            >
              Transmission
            </label>
            <select
              id="transmission"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option selected>Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="color"
            >
              Car Color
            </label>
            <input
              id="color"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter car color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hourspower"
          >
            Horse Power
          </label>
          <input
            id="color"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter horse power"
            value={horsePower}
            onChange={(e) => setHorsePower(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            // htmlFor="image"
          >
            Car Image
          </label>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://cdn-icons-png.flaticon.com/512/11082/11082899.png"
              }
              className="flex justify-center items-center m-auto w-52 h-52 cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hidden"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Contact Number
          </label>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            placeholder="Enter phone number"
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => handleAdd()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
          >
            {loading ? "Adding..." : "Add Advertisement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAds;
