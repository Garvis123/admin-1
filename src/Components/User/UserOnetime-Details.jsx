import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const OneTimeOrderDetails = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [mealData, setMealData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formatTime = (isoString) => {
  const date = new Date(isoString);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString("en-US", options);
};


  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const Back = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (location.state && location.state.mealData) {
      setMealData(location.state.mealData);
    } else {
      setError("Meal data not available.");
    }
  }, [location.state]);
  console.log(mealData);
  
  return (
    <div className="min-h-screen bg-[#fae9d7] text-black ">
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
        {/* Back Button and Title */}
       <div className="flex flex-1 overflow-hidden">
       <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id}/>
     
        

      {/* Main Content */}
     <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
  ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
  ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
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
  Order Id: <span className="font-medium">{mealData?.orderId || "N/A"}</span>
</p>

<div className="mb-2">
  {mealData?.meals?.map((i, idx) => (
    <p key={idx} className="font-medium">
      Order Name: {i.item.title}
    </p>
  )) || <p>No meals available</p>}
</div>

          <div className="mb-2">
             {mealData?.meals?.map((i,idx)=>(
              <p key={idx} className="font-medium">Order Price:{i.item.price}</p>
            )) || <p>N/A</p> }
          </div>
          <p className="mb-2">
            Order Date: <span className="font-medium">{new Date(mealData?.createdOn).toLocaleDateString("en-GB")}</span>
          </p>
          <p className="mb-2">
  Order Time: <span className="font-medium">{formatTime(mealData?.createdOn)}</span>
</p>

          <p className="mb-2">
            Delivery Boy Name: <span className="font-medium">Parv Modi</span>
          </p>
          <p className="mb-2">
            Delivery Time: <span className="font-medium">1:20 PM</span>
          </p>
          <p>
            Order Status: 
            <span className="font-medium text-green-600">{mealData?.status}</span> 
            {/* <span className="font-medium text-red-600"> Not Done</span> / 
            <span className="font-medium text-orange-500"> Process</span> */}
          </p>
        </div>
      </section>

      <div className="bg-white p-4 rounded-md shadow mt-4">
      <h2 className="text-lg font-semibold mb-4 mt-2">One Time Order Description</h2>
          <div className="mb-2">
           {mealData?.meals?.map((i,idx)=>(
             <p>{i.item.description}</p>
           ))}
          </div>
     
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

export default OneTimeOrderDetails;
