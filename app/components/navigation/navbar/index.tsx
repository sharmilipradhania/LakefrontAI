import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className="w-full h-20 bg-gray-100 sticky z-10 ">
        <div className="container mx-auto px-4 h-full text-black w-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            
          
            <ul className="hidden md:flex box gap-x-6 text-black">
            {/* !--Hoverable Link-- */}
            <li className="hoverable hover:bg-gray-100 hover:text-white">
          <a href="#" className="relative block  lg:p-3 lg:text-xs  hover:bg-gray-100 hover:text-red-900">SERVICES</a>
          <div className="p-9 mega-menu mb-20 sm:mb-0 shadow-xxl bg-gray-100">
            <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
              <ul className="px-1 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  
                  <h3 className="font-bold text-m text-black text-bold mb-2">STRATEGY AND CONSULTING</h3>
                </div>

              

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="/services" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-gray-100 hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0">Find more</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Cantonica</h3>
                </div>
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi lek tund polis gendai sola tarpals.</p>

               

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Yavin 4</h3>
                </div>


                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi lek tund polis gen dai sola tarpals.</p>

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Alderaan</h3>
                </div>
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi lek tund polis gen dai sola tarpals.</p>

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
            </div>
          </div>
        </li>
        {/* <!--Hoverable Link--> */}
        <li className="hoverable hover:bg-gray-100 hover:text-white">
          <a href="#" className="relative block  lg:p-3 lg:text-xs  hover:bg-gray-100 hover:text-red-900">ABOUT US</a>
          <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gray-100">
            <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
             
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                  </svg>
                  <h3 className="font-bold text-xl text-black text-bold mb-2">About Us</h3>
                </div>
                <img className="rounded-t-lg w-66 h-40" src="/lake.webp" alt="" />
                <p className="text-black mt-2 text-sm">We’re passionate about solving some of the toughest business problems out there using AI and analytics.</p>

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-black bold border-b-2 border-gray-900 hover:text-red-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-black text-bold mb-2">Our Story</h3>
                </div>
                <img className="rounded-t-lg w-66 h-40" src="/birds.jpg" alt="" />
                <p className="text-black text-sm">we transform data into actionable insights. With a passion for technology and analytics, we leverage advanced tools to help businesses make informed decisions.</p>

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-black bold border-b-2 border-gray-900 hover:text-red-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-black text-bold mb-2"> Join Us</h3>
                </div>
                <img className="rounded-t-lg w-66 h-40" src="/working.jpeg" alt="" />
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi lek tund polis gen dai sola tarpals.</p>

                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-black bold border-b-2 border-gray-900 hover:text-red-900">Find out more...</a>
                </div>
              </ul>
              
            </div>
          </div>
        </li>
        {/* second */}
        <li className="hoverable hover:bg-gray-100 hover:text-white">
          <a href="#" className="relative block  lg:p-3 lg:text-xs hover:bg-gray-100 hover:text-red-900">OPEN AI</a>
          <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gray-100">
            <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
             
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Tatooine</h3>
                </div>
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi  lek tund polis gen  dai sola tarpals.</p>
                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Cantonica</h3>
                </div>
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi  lek tund polis gen  dai sola tarpals.</p>
                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Yavin 4</h3>
                </div>
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi  lek tund polis gen  dai sola tarpals.</p>
                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
              <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                <div className="flex items-center">
                  <svg className="h-8 mb-3 mr-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg>
                  <h3 className="font-bold text-xl text-white text-bold mb-2">Alderaan</h3>
                </div>
                <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra twi  lek tund polis gen  dai sola tarpals.</p>
                <div className="flex items-center py-3">
                  <svg className="h-6 pr-3 fill-current text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                  </svg>
                  <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                </div>
              </ul>
            </div>
          </div>
        </li>
        {/* third */}
       
        {/* forth */}
            </ul>
            <div className=" md:block">
              <Button />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
