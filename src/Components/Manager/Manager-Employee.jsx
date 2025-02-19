import React from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header'
import ManagerSidebar from './Manager-Sidebar';

const EmployeePanel = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const employees = [
    { id: '#54264', name: 'Aditya Seth', designation: 'Manager', mobile: '8989898985', status: 'Available' },
    { id: '#54264', name: 'Aditya Seth', designation: 'Helper', mobile: '8989898985', status: 'Not Available' },
    { id: '#54264', name: 'Aditya Seth', designation: 'Cook', mobile: '8989898985', status: 'Not Available' },
    { id: '#54264', name: 'Aditya Seth', designation: 'Cook', mobile: '8989898985', status: 'Available' },
    { id: '#54264', name: 'Aditya Seth', designation: 'Helper', mobile: '8989898985', status: 'Not Available' },
    { id: '#54264', name: 'Aditya Seth', designation: 'Manager', mobile: '8989898985', status: 'Available' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]">
     <Header />

      <div className="flex flex-1 overflow-hidden">
        <ManagerSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />  
        <main   className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
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

          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Employee Id</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Designation</th>
                <th className="p-3 text-left">Mobile No.</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.mobile}</td>
                  <td className="p-3">
                    <span className={`px-4 py-1 rounded-full text-white ${emp.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>{emp.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default EmployeePanel;
