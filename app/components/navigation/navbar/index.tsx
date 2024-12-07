import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className="w-full h-16 bg-gray-100 sticky z-10 ">
        <div className="container mx-auto px-4 h-full text-black w-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <ul className="hidden md:flex box gap-x-6 text-black">
              {/* !--Hoverable Link-- */}
              <li className="hoverable hover:bg-gray-100 hover:text-black">
                <a href="#" className="relative block  lg:p-3 lg:text-1xl  hover:bg-gray-100 hover:text-red-900">Services</a>
                <div className="p-9 mega-menu mb-20 sm:mb-0 shadow-xxl bg-gray-100">
                  <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
                  <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                      <div className="flex items-center">

                        <h3 className="font-bold text-l text-black text-bold mb-2">Strategy and Consulting

                        </h3>
                      </div>
                      <div className="flex items-center py-3">
                        <svg className="h-6 pr-3 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                        </svg>
                        <a href="/services/strategy" className="text-black bold border-b-2 border-black hover:text-teal-900">Find out more...</a>
                      </div>
                    </ul>
                    <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                      <div className="flex items-center">

                        <h3 className="font-bold text-l text-black text-bold mb-2">Data Engineering and Business Intelligence
                        </h3>
                      </div>
                      <div className="flex items-center py-3">
                        <svg className="h-6 pr-3 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                        </svg>
                        <a href="/services/dbmngt" className="text-black bold border-b-2 border-black hover:text-teal-900">Find out more...</a>
                      </div>
                    </ul>
                    <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                      <div className="flex items-center">

                        <h3 className="font-bold text-l text-black text-bold mb-2">Drive Innovation with GenAI and Machine learning
                        </h3>
                      </div>




                      <div className="flex items-center py-3">
                        <svg className="h-6 pr-3 fillcurrent text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                        </svg>
                        <a href="#" className="text-black bold border-b-2 border-black hover:text-teal-900">Find out more...</a>
                      </div>
                    </ul>
                    <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                      <div className="flex items-center">

                        <h3 className="font-bold text-l text-black text-bold mb-2">Actionable Insights
                        </h3>
                      </div>


                      <div className="flex items-center py-3">
                        <svg className="h-6 pr-3 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                        </svg>
                        <a href="#" className="text-black bold border-b-2 border-black hover:text-teal-900">Find out more...</a>
                      </div>
                    </ul>
                  </div>
                </div>
              </li>
              {/* <!--Hoverable Link--> */}
              <li className="hoverable hover:bg-gray-100 hover:text-white">
                <a href="#" className="relative block  lg:p-3 lg:text-1xl  hover:bg-gray-100 hover:text-red-900">Product</a>
                <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gray-100">
                  <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
                  </div>
                </div>
              </li>
              {/* second */}
              <li className="hoverable hover:bg-gray-100 hover:text-white">
                <a href="#" className="relative block  lg:p-3 lg:text-1xl hover:bg-gray-100 hover:text-red-900">Blog</a>
                <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gray-100">
                  <div className="container mx-auto w-full flex flex-wrap justify-between mx-2"> 
                  </div>
                </div>
              </li>
              {/* third */}
              <li className="hoverable hover:bg-gray-100 hover:text-white">
                <a href="/blog" className="relative block  lg:p-3 lg:text-1xl hover:bg-gray-100 hover:text-red-900">About Us</a>
               
              </li>
              {/* forth */}
            </ul>
            <div className="hidden md:block">
              <Button />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
