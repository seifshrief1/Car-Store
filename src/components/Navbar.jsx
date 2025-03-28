import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { LuBaggageClaim } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <header className="bg-transparent shadow-sm sticky top-0 z-50 backdrop-filter backdrop-blur-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://admixt.com/corp/img/FB-Marketplace-icon.png"
                className="h-10 w-auto"
                alt="Car Marketplace"
              />
              <span className="md:text-xl font-bold text-gray-600">
                Car Marketplace
              </span>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="text-black transition hover:text-blue-600 duration-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add_ads"
                      className="text-black transition hover:text-blue-600 duration-300"
                    >
                      Add Advertisement
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all_ads"
                      className="text-black transition hover:text-blue-600 duration-300"
                    >
                      All Advertisements
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/compare_cars"
                      className="text-black transition hover:text-blue-600 duration-300"
                    >
                      Compare Cars
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <SignedOut>
                {/* <SignInButton /> */}
                <SignInButton>
                  <div className="sm:flex sm:gap-4 cursor-pointer">
                    <a className="rounded-md bg-blue-600/75 px-5 hover:bg-blue-500 transition duration-300 py-2.5 text-sm font-medium text-white shadow-sm">
                      Login
                    </a>
                  </div>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Advertisements"
                      labelIcon={<LuBaggageClaim />}
                      href="/my-ads"
                    />
                    <UserButton.Link
                      label="Favorites"
                      labelIcon={<FaHeart />}
                      href="/favorites"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
              <div className="block md:hidden">
                <button
                  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={() => setIsOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Off-Canvas Menu */}
      <div
        className={`fixed inset-0 bg-opacity-50 z-50 transition-opacit ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-100 z-50 shadow-md border border-gray-200 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } p-5`}
      >
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          &#x2715;
        </button>
        <nav className="mt-5">
          <ul className="flex flex-col gap-4 text-sm">
            <li>
              <Link
                to="/"
                className="text-black transition hover:text-blue-600 duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/add_ads"
                className="text-black transition hover:text-blue-600 duration-300"
                onClick={() => setIsOpen(false)}
              >
                Add Advertisement
              </Link>
            </li>
            <li>
              <Link
                to="/all_ads"
                className="text-black transition hover:text-blue-600 duration-300"
                onClick={() => setIsOpen(false)}
              >
                All Advertisements
              </Link>
            </li>
            <li>
              <Link
                to="/compare_cars"
                className="text-black transition hover:text-blue-600 duration-300"
                onClick={() => setIsOpen(false)}
              >
                Compare Cars
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
