import React from "react";

const Categories = () => {
  const categories = [
    {
      img: "https://cdn-icons-png.flaticon.com/128/13584/13584003.png",
      title: "SUV",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/3202/3202003.png",
      title: "SEDAN",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/5035/5035167.png",
      title: "HATCHBACK",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/4564/4564336.png",
      title: "ELECTRIC",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/5035/5035202.png",
      title: "CONVERTIBLE",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/4391/4391630.png",
      title: "COUPE",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/1433/1433678.png",
      title: "VAN",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/5814/5814855.png",
      title: "TRUCK",
    },
  ];
  return (
    <div className="md:mt-48 mt-20">
      <h1 className="text-5xl text-blue-600/75 font-bold tracking-tighter text-center">
        Categories
      </h1>
      <div className="flex flex-wrap justify-around items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 mt-12 border w-32 h-22 p-2 rounded-xl border-gray-300"
          >
            <img
              src={category.img}
              alt={category.title}
              className="h-10 w-auto"
            />
            <h2 className="text-gray-700 font-bold">{category.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
