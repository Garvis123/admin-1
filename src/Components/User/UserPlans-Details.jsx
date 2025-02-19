import React from "react";
import Header from "../Header";
import { useNavigate,useLocation, useParams } from "react-router-dom";
import { useState,useEffect} from "react";
import Sidebar from "./Sidebar";

const PlanDetails = () => {
  const {id}=useParams()
  const location=useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    // Extract meal data from location state
    if (location.state && location.state.mealData) {
      setMealData(location.state.mealData);
    }
  }, [location.state]);

  console.log(mealData);
 
  const toggleMenu = () => setIsMenuOpen( (prev) => !prev);


  return (
    <div className="min-h-screen bg-[#fae9d7] text-black">
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

      {/* Main Content */}
     <div className="flex flex-1">
     <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
       
   <main  className={`flex-1 p-4 transition-all duration-300 mt-[80px] ${
            isMenuOpen ? "ml-[340px] " : "ml-[0px]"
          }`}>
   <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Customer Information */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Plans Details</h2>
          <p className="mb-2">
            Plan Id: <span className="font-medium">{mealData?.planId}</span>
          </p>
          <p className="mb-2">
            Plan Name: <span className="font-medium">{mealData?.item?.name}</span>
          </p>
          <p className="mb-2">
            Plan Price: <span className="font-medium">{mealData?.item?.amount}</span>
          </p>
          <p className="mb-2">
            Plan Purchase Date: <span className="font-medium">{new Date(mealData?.createdOn).toLocaleDateString("en-GB")}</span>
          </p>
          <p className="mb-2">
            Plan Expire Date Time: <span className="font-medium">13/05/2002</span>
          </p>
          <div className="mb-2">
  <p className="font-medium">
    Plan Features: {mealData?.features?.join(" / ") || "N/A"}
  </p>
</div>

          <p className="mb-2">
           Plan Slots: <span className="font-medium">{mealData?.period?.join(" / ") || "N/A"}</span>
          </p>
          <p>
            Meal Address :1.Kokda Abhinav Home
            
          </p>
        </div>
     

        {/* Plans Details */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Plans Details</h2>
         <h4>{mealData?.item?.description}</h4>
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
   </main>
     </div>
    </div>
  );
};

export default PlanDetails;
