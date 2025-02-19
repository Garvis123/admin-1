import React from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header'
import ManagerSidebar from './Manager-Sidebar';
const RawMaterialPanel = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(true);
        const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]">
    <Header />
    <div className='flex flex-1 overflow-hidden'>
    <ManagerSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />  
    <main  className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'sm:ml-[100px] ml-0 w-full'
          }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">&#x1F464;</div>
    <div>
      <p className="font-semibold">Total Employee</p>
      <h2 className="text-xl font-bold">253</h2>
    </div>
  </div>
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">&#x1F464;</div>
    <div>
      <p className="font-semibold">Available Employee</p>
      <h2 className="text-xl font-bold">150</h2>
    </div>
  </div>
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">&#x1F464;</div>
    <div>
      <p className="font-semibold">Absent Employee</p>
      <h2 className="text-xl font-bold">53</h2>
    </div>
  </div>
</div>

      <div className="overflow-x-auto bg-white text-black">
        <table className="w-full border-collapse border ">
          <thead>
            <tr className="bg-white">
              <th className="border border-gray-300 p-2">Material</th>
              <th className="border border-gray-300 p-2">Purchase Date</th>
              <th className="border border-gray-300 p-2">Delivered Material</th>
              <th className="border border-gray-300 p-2">Used Material</th>
              <th className="border border-gray-300 p-2">Leftover Material</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Meda', '24/05/2024', '15 Kg', '10 Kg', '5 Kg'],
              ['Suji', '24/05/2024', '18 Kg', '5 Kg', '13 Kg'],
              ['Aata', '24/05/2024', '200 Kg', '152 Kg', '48 Kg'],
              ['Namkeen', '24/05/2024', '3 Packet', '1 Packet', '2 Packet'],
              ['Poha', '24/05/2024', '50 Packet', '35 Packet', '15 Packet'],
              ['Aata', '24/05/2024', '20 Kg', '20 Kg', '0 Kg'],
              ['Suji', '24/05/2024', '400 Kg', '200 Kg', '200 Kg']
            ].map((row, index) => (
              <tr key={index} className="text-center">
                {row.map((data, i) => (
                  <td key={i} className="border border-gray-300 p-2">
                    {data}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
    </div>
    </div>
  );
};

export default RawMaterialPanel;