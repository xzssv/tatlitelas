import Image from "next/image";
import React from "react";
import Title from "../ui/Title";

const Order = () => {
  return (
    <div className="items-center mx-3 ml-0  lg:mb-0  w-full lg:p-8 lg:mt-0 mt-5 md:ml-5 md:mb-0 mb-6 overflow-x-auto">
      <Title classAdd="text-[24px] text-center sm:text-start">Orders</Title>
      <div className="items-center  w-full mt-4 ">
        <table className="text-sm text-center  text-gray-500 w-full ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-secondary border-gray-700 hover:bg-primary transition-all">
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                <span>634222</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>Uncalı</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                14-02-2023
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                $14
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                Preparing
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
