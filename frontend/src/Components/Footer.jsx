import React from "react";
import Logos from "../assets/Logo/Online Shop Logo.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="h-64 shadow-md bg-white w-full">
      <div>
        <div className="text-center pt-3 text-lg">
          <p className="text-cyan-800 font-bold">Follow Us</p>
        </div>
        <div className="flex justify-evenly text-center text-sm">
          <Link target="blank" to={"https://nitinkondhari03.github.io/"}>
            <div>
              <IoPerson size={"22"} className="m-auto text-green-800" />
              <p className="text-green-800">Portfolio</p>
            </div>
          </Link>
          <Link target="blank" to={"https://github.com/nitinkondhari03"}>
            <div>
              <FaGithub size={"22"} className="m-auto text-green-800" />
              <p className="text-green-800"> Github</p>
            </div>
          </Link>
          <Link target="blank" to={"https://www.linkedin.com/in/nitinkondhari/"}>
            <div>
              <FaLinkedin size={"22"} className="m-auto text-green-800" />
              <p className="text-green-800"> LInkedin</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center pt-10">
          <div className="h-10 md:h-20 m-auto">
            <img src={Logos} className="h-full" alt="Logos" />
          </div>
          <div className="h-10 m-auto">
            <p className="text-sm lg:text-md text-cyan-800 text-center pl-4 pr-4">
              Designed and Developed by Nitin Kondhari © Copyright 2024. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
