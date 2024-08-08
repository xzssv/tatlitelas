import React from "react";
import Title from "../ui/Title";
import { IoIosPin } from "react-icons/Io";
import { BsTelephoneFill } from "react-icons/Bs";
import { GrMail } from "react-icons/Gr";

const Footer = () => {
  return (
    <div className="bg-secondary ">
      <div className="container mx-auto text-white pt-16 pb-6 ">
        <div>
          <div className="flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-4">
            <div className="flex flex-col gap-y-2 mt-6">
              <Title classAdd="text-[30px]">Contact Us</Title>
              <div>
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">Location</span>
              </div>
              <div>
                <i className="fa fa-phone"></i>
                <span className="inline-block ml-2">Call +01 1234567890</span>
              </div>
              <div>
                <i className="fa fa-envelope"></i>
                <span className="inline-block ml-2">demo@gmail.com</span>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-y-2 mt-6 ">
                <Title classAdd="text-[30px]">Feane</Title>
                <p className="w-72 ">
                  Necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with
                </p>
                <div className="justify-center">
                  <ul className="flex justify-center">
                    <li className="mx-2 hover:bg-primary transition-all rounded-full">
                      <a href="">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li className="mx-2 hover:bg-primary transition-all rounded-full">
                      <a href="">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="mx-2 hover:bg-primary transition-all rounded-full">
                      <a href="">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                    <li className="mx-2 hover:bg-primary transition-all rounded-full">
                      <a href="">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li className="mx-2 hover:bg-primary transition-all rounded-full">
                      <a href="">
                        <i className="fab fa-pinterest"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-y-2 mt-6">
                <Title classAdd="text-[30px]">Opening Hours</Title>
                <div>
                  <span className="inline-block ml-2">Everyday</span>
                </div>
                <div>
                  <span className="inline-block ml-2">10.00 Am -10.00 Pm</span>
                </div>
                <div>
                  <i className="fa fa-envelope"></i>
                  <span className="inline-block ml-2">demo@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
        <p className="text-center mt-14">
          © 2023 All Rights Reserved By Free Html Templates
        </p>
      </div>
    </div>
  );
};

export default Footer;
