import React from "react";
import Header from "../Header";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState,useEffect } from "react";

const QueryDetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [QueryData, setQueryData] = useState(null);
  const location=useLocation();
  const toggleMenu = () => setIsMenuOpen( (prev) => !prev);
  useEffect(() => {
    // Extract meal data from location state
    if (location.state && location.state.QueryData) {
      setQueryData(location.state.QueryData);
    }
  }, [location.state]);

  console.log(QueryData);

  return (
    <div className="min-h-screen bg-[#fae9d7] text-black ">
      {/* Header */}
   <Header />


      {/* Query Details */}
      <div className="flex flex-1">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        
      <main  className={`flex-1 p-4 transition-all duration-300 mt-[80px] ${
            isMenuOpen ? "ml-[340px] " : "ml-[0px]"
          }`}>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Customer Information */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <p className="mb-2">Customer Name: <span className="font-medium">Ankit</span></p>
          <p className="mb-2">Customer Id: <span className="font-medium">#595956</span></p>
          <p className="mb-2">Mobile No.: <span className="font-medium">9356897412</span></p>
          <p className="mb-4">Email Id.: <span className="font-medium">Aditya@Gmail.Com</span></p>

          <h2 className="text-lg font-semibold mb-4">Query Information</h2>
          <p className="mb-2">Query Id: <span className="font-medium">{QueryData?._id}</span></p>
          <p className="mb-2">Query Topic: <span className="font-medium">{QueryData?.title}</span></p>
          <p className="mb-2">Query Create Date: <span className="font-medium">{new Date(QueryData?.createdAt).toLocaleDateString('en-GB')}</span></p>
          <p className="mb-4">
  Status: 
  <span className={`font-medium ${QueryData?.status === 'open' ? 'text-green-600' : QueryData?.status === 'close' ? 'text-red-600' : 'text-orange-500'}`}>
    {QueryData?.status.charAt(0).toUpperCase() + QueryData?.status.slice(1)}
  </span>
</p>


          <h2 className="text-lg font-semibold mb-4">Query Description</h2>
          <p className="mb-4">
           {QueryData?.description}
          </p>

          <h2 className="text-lg font-semibold mb-4">Email Outreach</h2>
          <textarea
            placeholder="Send Reply..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
          ></textarea>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Send</button>
        </div>

        {/* Query Sequence */}
        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Query Sequence</h2>
            <button className="px-4 py-2 border rounded-md">Sort By</button>
          </div>
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2">NAME</th>
                <th>REPLIER ID</th>
                <th className=" pl-8">DATE</th>
                <th>SEQUENCE</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 text-orange-600 font-medium px-1">Aditya Seth</td>
                  <td className="px-2">#54264</td>
                  <td className="px-2">12/JAN/2024</td>
                  <td className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </main>
      </div>
    </div>
  );
};

export default QueryDetails;
