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
      <section className="w-full py-10 bg-[#fbfcfd] flex flex-col items-center justify-center px-5 gap-5 lg:px-10 lg:flex-row-reverse xl:px-16">
        <div className="w-full flex flex-col lg:flex-row items-center lg:justify-end lg:gap-8">
          <h1 className="text-center mb-5 text-gray-500 md:text-lg lg:text-sm lg:mb-0">
            Follow Us On
          </h1>
          <div className="flex items-center justify-center gap-5 text-[26px] md:text-5xl lg:text-2xl">
            <FaFacebook className="text-[#34495e] cursor-pointer py-[5px] text-3xl rounded-full bg-[#dbdbdb] hover:scale-110" />
            <FaInstagram className="text-[#34495e] cursor-pointer py-[5px] text-3xl rounded-full bg-[#dbdbdb] hover:scale-110" />
            <FaLinkedin className="text-[#34495e] cursor-pointer py-[5px] text-3xl rounded-full bg-[#dbdbdb] hover:scale-110" />
            <FaPinterest className="text-[#34495e] cursor-pointer py-[5px] text-3xl rounded-full bg-[#dbdbdb] hover:scale-110" />
            <FaYoutube className="text-[#34495e] cursor-pointer py-[5px] text-3xl rounded-full bg-[#dbdbdb] hover:scale-110" />
          </div>
        </div>
        <div className="w-full text-center text-sm text-gray-500 flex flex-col gap-5 md:text-base lg:text-sm lg:text-start lg:gap-2">
          <div className="flex flex-col items-center lg:justify-start lg:flex-row">
            <p>Copyright © 1996-2024 AR Doors Corporation. </p>
            <p>All Rights Reserved</p>
          </div>
          <div>
            <div className="lg:text-base">
              <a
                href="/privacy-policy"
                className="hover:underline cursor-pointer"
              >
                Privacy
              </a>{" "}
              |{" "}
              <span className="hover:underline cursor-pointer">
                Do Not Sell My Information
              </span>{" "}
              |{" "}
              <span className="hover:underline cursor-pointer">
                Terms & Conditions
              </span>{" "}
              |{" "}
              <a href="/sitemap" className="hover:underline cursor-pointer">
                Sitemap
              </a>
              |{" "}
              <a href="/about" className="hover:underline cursor-pointer">
                About
              </a>
            </div>
            <p className="mt-3 lg:mt-2">
              This site is protected by reCAPTCHA and the Google{" "}
              <span className="text-gray-700 cursor-pointer hover:underline">
                Privacy Policy{" "}
              </span>
              and{" "}
              <span className="text-gray-700 cursor-pointer hover:underline">
                Terms of Service apply.{" "}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
