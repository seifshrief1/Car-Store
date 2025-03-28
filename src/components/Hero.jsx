import React from "react";
import Marquee from "react-fast-marquee";

const Hero = () => {
  const cars = [
    "http://pluspng.com/img-png/hyundai-logo-png-hyundai-car-logo-png-brand-image-1749.png",
    "https://logos-world.net/wp-content/uploads/2021/03/Kia-Logo.png",
    "https://freepnglogo.com/images/all_img/1719812219bmw-logo-transparent-png.png",
    "https://www.freeiconspng.com/uploads/mercedes-benz-logo-png-2.png",
    "https://i.pinimg.com/originals/a1/fc/7c/a1fc7c9653fbb201e71ef504f81e737c.png",
    "http://www.freepnglogos.com/uploads/porsche-logo-9.png",
    "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png",
    "https://www.pngplay.com/wp-content/uploads/13/Land-Rover-Logo-Background-PNG-Image.png",
    "https://www.pngall.com/wp-content/uploads/13/Audi-Logo-PNG-File.png",
  ];

  return (
    <>
      <div className="flex flex-col items-center p-10 py-16 gap-6 md:h-[650px] h-[400px] w-full bg-[#eef0fc]">
        <div className="w-full flex flex-col items-center gap-2 justify-center">
          <h2 className="md:text-7xl text-3xl text-gray-700 font-bold tracking-tighter">
            Find Your Dream Car.
          </h2>
          <p className="md:text-lg text-xs text-gray-600 text-center max-w-2xl">
            Explore a wide range of top car brands and models. Whether you're
            looking for luxury, speed, or reliability, we have the perfect car
            waiting for you. Start your journey today!
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <Marquee gradient={false} speed={50} className="mt-12">
            {cars.map((car, index) => (
              <div key={index} className="mx-10 flex items-center">
                <img
                  src={car}
                  alt="Car Logo"
                  className="md:h-28 md:w-28 h-16 w-16 object-contain"
                />
              </div>
            ))}
          </Marquee>
          <img
            src="https://www.cstatic-images.com/car-pictures/maxWidth900/usc70tsc024b021003.png"
            className="-mt-22 md:block hidden"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
