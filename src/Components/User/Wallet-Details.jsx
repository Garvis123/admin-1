import React from "react";
import Header from "../Header";
import { useNavigate,useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

const WalletDetails = () => {
  const {id}=useParams();
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [progress, setProgress] = useState(0);
  const navigate=useNavigate();
  const Back=()=>{
    navigate(-1)
  }
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

   
  return (
    <div className="min-h-screen bg-[#fae9d7]  flex flex-col relative">
      {/* Header */}
      <Header />
      {loading && (
  <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
    <div
      className="h-full bg-[#FF6600] transition-all duration-200 rounded"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
)}

      
      {/* Wallet Details */}

      <div className="flex flex-1 overflow-hidden">

      <Sidebar
  isMenuOpen={isMenuOpen}
  toggleMenu={toggleMenu}
  id={id}
  className={`transition-all duration-300 ${
    isMenuOpen ? 'sm:w-[280px]' : 'w-0'
  } fixed sm:relative top-0 left-0 h-full bg-white z-50 sm:z-auto`}
/>
        
     <main  className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
          }`}>
      <div>
      <div className="bg-white p-4 rounded-md shadow mt-3">
          <h2 className="text-lg font-semibold mb-4">Wallet Information</h2>
          <p className="mb-2">Transaction Id: <span className="font-medium">D5565ds</span></p>
          <p className="mb-2">Transaction Date: <span className="font-medium">13/05/2002</span></p>
          <p className="mb-2">Transaction Time: <span className="font-medium">12:20 PM</span></p>
          <p className="mb-2">Transaction Name: <span className="font-medium">Meal Cancel</span></p>
          <p className="mb-2">Transaction Amount: <span className="font-medium">280</span></p>
          <p>
            Transaction Status: 
            <span className="font-medium text-green-600"> Credit</span> / 
            <span className="font-medium text-red-600"> Debit</span> / 
            <span className="font-medium text-orange-500"> Process</span>
          </p>
        </div>
    

      {/* Query Sequence */}
      <section className="bg-white p-4 rounded-md shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Query Sequence</h2>
          <button className="px-4 py-2 border rounded-md">Sort By</button>
        </div>
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-2">QUERY ID</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>QUERY</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 ">#54264</td>
                <td className="">12/JAN/2024</td>
                <td>5:00 AM</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </div>
     </main>
      </div>
    </div>
  );
};

export default WalletDetails;
