import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <section className="w-full py-10 bg-lightGray flex flex-col items-center justify-center px-5 gap-5 lg:px-10 lg:flex-row-reverse xl:px-16">
        <div className="w-full flex flex-col lg:flex-row items-center lg:justify-end lg:gap-5">
          <h1 className="text-center mb-5 text-gray-700 md:text-lg lg:text-sm lg:mb-0">
            Follow Us On
          </h1>
          <div className="flex items-center justify-center gap-5 text-[26px] md:text-5xl lg:text-2xl">
            <FaFacebook className="text-blue-600 cursor-pointer" />
            <FaInstagram className="text-purple-600 cursor-pointer" />
            <FaLinkedin className="text-blue-800 cursor-pointer" />
            <FaPinterest className="text-red-700 cursor-pointer" />
            <FaYoutube className="text-red-600 cursor-pointer" />
          </div>
        </div>
        <div className="w-full text-center text-sm text-gray-700 flex flex-col gap-5 md:text-base lg:text-sm lg:text-start lg:gap-2">
          <div className="flex flex-col items-center lg:justify-start lg:flex-row">
            <p>Copyright © 1996-2024 AR Doors Corporation. </p>
            <p>All Rights Reserved</p>
          </div>
          <div>
            <div className="font-semibold lg:text-base">
              <span className="hover:underline cursor-pointer">Privacy</span> |{" "}
              <span className="hover:underline cursor-pointer">
                Do Not Sell My Information
              </span>{" "}
              |{" "}
              <span className="hover:underline cursor-pointer">
                Terms & Conditions
              </span>{" "}
              | <span className="hover:underline cursor-pointer">Sitemap</span>
            </div>
            <p className="mt-3 lg:mt-2">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
