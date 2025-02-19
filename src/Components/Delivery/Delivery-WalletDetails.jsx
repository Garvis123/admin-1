import React from "react";
import Header from "../Header";
import { useNavigate,useParams} from "react-router-dom";
import { useState } from "react";
import DeliverySidebar from "./Delivery-Sidebar";

const DeliveryWalletDetails = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const {id}=useParams();

   
  return (
    <div className="min-h-screen bg-[#fae9d7] text-black  ">
      {/* Header */}
      <Header />
   
      {/* Wallet Details */}

      
       <div className="flex flex-1 md:flex-row">
       <DeliverySidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />

     <main className={`flex-1 p-4 transition-all duration-300 mt-[80px] ${
            isMenuOpen ? "ml-[340px]" : "ml-0"
          }`}>
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
     </main>
       </div>
    </div>
  );
};

export default DeliveryWalletDetails;
