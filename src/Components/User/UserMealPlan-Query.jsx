import { useLocation, useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";

const MealPlanQuery = () => {
  const { id, mealId } = useParams();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    // Extract meal data from location state
    if (location.state && location.state.mealData) {
      setMealData(location.state.mealData);
    }
  }, [location.state]);
  console.log(mealData);
  

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-[#fae9d7]">
      <Header />

      <div className="flex flex-1">
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />

        <main
         className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
          isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
        }`}
        >
          {mealData ? (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{mealData.planName}</h2>
              <td className="">
        {mealData.items.map((i, idx) => (
        // Pass the meal data
        <p>Meal Name:{i.item.title}</p>
        ))}   </td>
              <tr className="">
        {mealData.items.map((i, idx) => (
        // Pass the meal data
        <p>Meal Quantity:{i.quantity}</p>
        ))}   </tr>
              <tr>
                {mealData.items.map((i,idx)=>(
<p>Add on Price: {i.item.price}</p>
                ))}
              </tr>
              <p>Delivery Boy Name: {mealData.quantity || "N/A"}</p>
              <p>Delivery Boy Id: {mealData.quantity || "N/A"}</p>
              <p>Delivery Time: {mealData.quantity || "N/A"}</p>
              <p>Add On: {mealData.addOn || "N/A"}</p>
              <p>Delivery Status: {mealData.isDelivered ? "true" :"false" || "N/A"}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">No meal data available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MealPlanQuery;
