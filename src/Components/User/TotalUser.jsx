import React, { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import Header from '../Header';

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    'Profile', 'Meal Plans', 'Order', 'Total Users', 'Plans', 'Wallet', 'All Query', 'All Documents'
  ];

  const tableData = [
    { userId: '#26266565', userName: 'DOSA', planId: '#26266565', planName: 'DOSA', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
    { userId: '#26266565', userName: 'RASMALAI', planId: '#26266565', planName: 'RASMALAI', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
    { userId: '#26266565', userName: 'DOSA', planId: '#26266565', planName: 'DOSA', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
    { userId: '#26266565', userName: 'IDLI', planId: '#26266565', planName: 'IDLI', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
    { userId: '#26266565', userName: 'FREE KA KHANA', planId: '#26266565', planName: 'FREE KA KHANA', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
    { userId: '#26266565', userName: 'OR BHAI', planId: '#26266565', planName: 'OR BHAI', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
    { userId: '#26266565', userName: 'MALAI CHAP', planId: '#26266565', planName: 'MALAI CHAP', purchaseDate: '12/JAN/2024', expireDate: '12/JAN/2024' },
  ];

 
  
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF3E0]">
      {/* Header */}
      <Header />
      {loading && (
  <div className="fixed top-0 left-0 w-full h-3 bg-gray-300 overflow-hidden z-50 shadow-md">
    <div
      className="h-full  bg-[#FF6600]   rounded-r-lg"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
)}

      <div className="flex flex-1">
        <aside className={`bg-white w-64 p-4 shadow-lg md:block ${isSidebarOpen ? 'block' : 'hidden'} absolute md:relative z-10`}>
          <nav>
            <h2 className="text-lg font-semibold mb-4">Admin {'>'} Vendor</h2>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className={`mb-2 p-2 rounded ${item === 'Total Users' ? 'bg-[#FF5722] text-white' : 'hover:bg-[#FFF3E0]'}`}>
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 mt-10">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full p-2 mr-4">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold">ADITYA SETH</h2>
                <p className="text-sm text-gray-600">9893679911</p>
              </div>
            </div>
            <Bell className="h-6 w-6 text-gray-500" />
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">USER ID</th>
                  <th className="p-2 text-left">USER NAME</th>
                  <th className="p-2 text-left">PLAN ID</th>
                  <th className="p-2 text-left">PLAN NAME</th>
                  <th className="p-2 text-left">PURCHASE DATE</th>
                  <th className="p-2 text-left">EXPIRE DATE</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{row.userId}</td>
                    <td className="p-2">{row.userName}</td>
                    <td className="p-2">{row.planId}</td>
                    <td className="p-2">{row.planName}</td>
                    <td className="p-2">{row.purchaseDate}</td>
                    <td className="p-2">{row.expireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}