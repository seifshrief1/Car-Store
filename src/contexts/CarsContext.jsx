import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const CarsContext = createContext();

export const CarsContextProvider = ({ children }) => {
  const { user } = useUser();
  const [myAds, setMyAds] = useState([]);
  const [ads, setAds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [newOrUsed, setNewOrUsed] = useState("");
  const [transmission, setTransmission] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [fuel, setFuel] = useState("");

  const convertToBase64 = async (file) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      // Compress the image
      const compressedFile = await imageCompression(file, options);

      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Image compression error:", error);
      throw error;
    }
  };

  const handleAddNewAdvertisement = async (
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
  ) => {
    try {
      if (!user) {
        toast.error("Please login to add an ad");
        return;
      }
      const carData = {
        owner: user.fullName,
        title,
        carBrand,
        description,
        price,
        carType,
        year,
        fuelType,
        horsePower,
        image: await convertToBase64(image),
        mileage,
        cc,
        color,
        transmission,
        location,
        phone,
      };

      await setDoc(doc(db, "cars", carData.title), carData);
      toast.success("Advertisement added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGetMyAds = async () => {
    if (!user) return;
    try {
      const carsCollection = collection(db, "cars");
      const carsQuery = query(
        carsCollection,
        where("owner", "==", user?.fullName)
      );
      const carsSnapshot = await getDocs(carsQuery);
      const cars = carsSnapshot.docs.map((doc) => doc.data());
      setMyAds(cars);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/my-ads") {
      handleGetMyAds();
    }
  }, [user]);

  const handleGetAds = async () => {
    try {
      const carsCollection = collection(db, "cars");

      let carsQuery = query(carsCollection);
      if (user) {
        carsQuery = query(carsQuery, where("owner", "!=", user?.fullName));
      }
      if (newOrUsed) {
        carsQuery = query(carsQuery, where("carType", "==", newOrUsed));
      }
      if (transmission) {
        carsQuery = query(carsQuery, where("transmission", "==", transmission));
      }
      if (fuel) {
        carsQuery = query(carsQuery, where("fuelType", "==", fuel));
      }
      const carsSnapshot = await getDocs(carsQuery);
      let cars = carsSnapshot.docs.map((doc) => doc.data());

      if (search) {
        cars = cars.filter((car) =>
          car.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      setAds(cars);
    } catch (error) {
      alert(error.message);
    }
  };

  // Run the optimized function when filters change
  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/all_ads"
    ) {
      handleGetAds();
    }
  }, [
    user,
    window.location.pathname !== "/" && search,
    window.location.pathname !== "/" && newOrUsed,
    window.location.pathname !== "/" && transmission,
    window.location.pathname !== "/" && fuel,
    ads,
  ]);

  const handleAddToFavorites = async (ad) => {
    try {
      if (!user) {
        toast.error("Please login to add to favorites");
        return;
      }
      const addNewFiled = {
        ...ad,
        adder: user.id,
      };
      await setDoc(doc(db, "favorites", ad.title), addNewFiled);
      alert("Added to favorites successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGetFavorites = async () => {
    if (!user) return;
    try {
      const favoritesCollection = collection(db, "favorites");
      const favoritesQuery = query(
        favoritesCollection,
        where("adder", "==", user.id)
      );
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favorites = favoritesSnapshot.docs.map((doc) => doc.data());
      setFavorites(favorites);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/favorites") {
      handleGetFavorites();
    }
  }, [user]);

  return (
    <CarsContext.Provider
      value={{
        user,
        handleAddNewAdvertisement,
        handleGetMyAds,
        myAds,
        ads,
        setMyAds,
        handleGetAds,
        handleAddToFavorites,
        favorites,
        setFavorites,
        setAds,
        search,
        setSearch,
        newOrUsed,
        setNewOrUsed,
        transmission,
        setTransmission,
        carBrand,
        setCarBrand,
        fuel,
        setFuel,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export const useCarContext = () => {
  return useContext(CarsContext);
};
