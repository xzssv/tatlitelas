import Image from "next/image";

const Order = () => {
  return (
      <div className="min-h-[calc(100vh_-_433px)] justify-between flex items-center flex-col p-10">
        <div className=" flex flex-1 items-center mx-3 overflow-x-auto w-full">
          <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ORDER ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-secondary border-gray-700 hover:bg-primary transition-all">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                  6107F559D
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>Ahmet Akif</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  Antalya/Kontaaltı
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  $18
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full p-10 bg-primary mt-4">
          <div>
            <Image src="/images/paid.png" alt="" width={40} height={40} />
          </div>
          <div>
            <Image src="/images/line.png" alt="" width={40} height={40} />
          </div>
          <div className="animate-pulse">
            <Image src="/images/bake.png" alt="" width={40} height={40} />
          </div>
          <div>
            <Image src="/images/line.png" alt="" width={40} height={40} />
          </div>
          <div>
            <Image src="/images/bike.png" alt="" width={40} height={40} />
          </div>
          <div>
            <Image src="/images/line.png" alt="" width={40} height={40} />
          </div>
          <div>
            <Image src="/images/delivered.png" alt="" width={40} height={40} />
          </div>
        </div>
      </div>
  );
};

export default Order;
