import React from 'react'
import Image from 'next/image'
import Title from '../ui/Title'

const Product = () => {
  return (
    <div className='items-center mx-3 ml-0  lg:mb-0  w-full lg:p-8 lg:mt-0 mt-5 md:ml-5 md:mb-0 mb-6 overflow-x-auto'>
      <Title classAdd="text-[24px] text-center sm:text-start">
            Products
          </Title>
    <div className='items-center w-full mt-4'>
        <table className="w-full text-sm text-center text-gray-500 min-w-[900px] table-fixed">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Image
                </th>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-secondary border-gray-700 hover:bg-primary transition-all">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                <Image alt="" src="/images/f1.png" width={50} height={50} />
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>239483</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  Good Pizza
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  $14
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <button className='btn-primary !bg-red-600'>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
    </div>
    </div>
  )
}

export default Product