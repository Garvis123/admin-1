import React from "react";
import Header from "../Header";
import { useNavigate,useParams } from "react-router-dom";
import { useState } from "react";
import DeliverySidebar from "./Delivery-Sidebar";

const DeliveryOneTimeOrderDetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {id}=useParams();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navigate=useNavigate();
const Back=()=>{
  navigate(-1)
}
  return (
    <div className="min-h-screen bg-[#fae9d7] text-black ">
      {/* Header */}
      <Header />

        {/* Back Button and Title */}
     <div className="flex flex-1">
     <DeliverySidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
    

      {/* Main Content */}
    <main className={`flex-1 p-4 transition-all duration-300 mt-[80px] ${
            isMenuOpen ? "ml-[340px]" : "ml-[0px] items-center justify-evenly"
          }`}>
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Customer Information */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <p className="mb-2">
            Customer Name: <span className="font-medium">Ankit</span>
          </p>
          <p className="mb-2">
            Customer Id: <span className="font-medium">#595956</span>
          </p>
          <p className="mb-2">
            Mobile No.: <span className="font-medium">9356897412</span>
          </p>
          <p className="mb-4">
            Email Id.: <span className="font-medium">Aditya@Gmail.Com</span>
          </p>

          
        </div>

        {/* Order Information */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Order Information</h2>
          <p className="mb-2">
            Order Id: <span className="font-medium">D5565ds</span>
          </p>
          <p className="mb-2">
            Order Name: <span className="font-medium">Lorem Ipsum Dolor Sit Am Lorem</span>
          </p>
          <p className="mb-2">
            Order Price: <span className="font-medium">$260</span>
          </p>
          <p className="mb-2">
            Order Date: <span className="font-medium">13/05/2002</span>
          </p>
          <p className="mb-2">
            Order Time: <span className="font-medium">12:20 PM</span>
          </p>
          <p className="mb-2">
            Delivery Boy Name: <span className="font-medium">Parv Modi</span>
          </p>
          <p className="mb-2">
            Delivery Time: <span className="font-medium">1:20 PM</span>
          </p>
          <p>
            Order Status: 
            <span className="font-medium text-green-600"> Done</span> / 
            <span className="font-medium text-red-600"> Not Done</span> / 
            <span className="font-medium text-orange-500"> Process</span>
          </p>
        </div>
      </section>

      <div className="bg-white p-4 rounded-md shadow mt-4">
      <h2 className="text-lg font-semibold mb-4 mt-2">One Time Order Description</h2>
          <p>
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam In Dui Mauris.
          </p>
     
      </div>

      {/* Query Sequence */}
      <section className="mt-6 bg-white p-4 rounded-md shadow">
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
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">#54264</td>
                <td>12/JAN/2024</td>
                <td>5:00 AM</td>
                <td>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.</td>
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

export default DeliveryOneTimeOrderDetails;