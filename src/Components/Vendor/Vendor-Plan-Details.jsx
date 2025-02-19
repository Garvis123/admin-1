import React from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const VendorPlanDetails = () => {
  const navigate=useNavigate();
  const Back=()=>{
    navigate(-1)
  }
  return (
    <div className="min-h-screen bg-[#fae9d7] text-black p-4 md:p-8">
      {/* Header */}
     <Header />

     <div className="mb-6">
          <button onClick={Back} className="flex items-center text-gray-600 mb-4 mt-2">
          <i class="ri-arrow-left-s-line"></i>
            Back
          </button>
          <h1 className="text-2xl font-bold text-center">Plans Details</h1>
        </div>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Customer Information */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Plans Details</h2>
          <p className="mb-2">
            Plan Id: <span className="font-medium">D5565ds</span>
          </p>
          <p className="mb-2">
            Plan Name: <span className="font-medium">Lorem Ipsum Dolor Sit Am Lorem</span>
          </p>
          <p className="mb-2">
            Plan Price: <span className="font-medium">$260</span>
          </p>
          <p className="mb-2">
            Plan Purchase Date: <span className="font-medium">13/05/2002</span>
          </p>
          <p className="mb-2">
            Plan Expire Date Time: <span className="font-medium">13/05/2002</span>
          </p>
          <p className="mb-2">
            Plan Feature: <span className="font-medium">1 time/ 2 time/ 3 time</span>
          </p>
          <p className="mb-2">
           Plan Slots: <span className="font-medium">Breakfast/Lunch/Dinner</span>
          </p>
          <p>
            Meal Address :1.Kokda Abhinav Home
            
          </p>
        </div>
     

        {/* Plans Details */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Plans Details</h2>
         <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat vitae facilis obcaecati saepe? Minus similique maxime illum inventore consectetur neque?</h4>
        </div>
      </section>
      
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
    </div>
  );
};

export default VendorPlanDetails;
