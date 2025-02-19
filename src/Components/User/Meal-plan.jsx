"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";
import { UserContext } from "./UserContext";

const Meal = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [array, setArray] = useState([]);
  const { users } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [mealType, setMealType] = useState(""); // State for meal type filter
  const location = useLocation();
  const user = users.find((item) => item.userId === id);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const fetchMeal = async () => {
    setLoading(true);
    setProgress(0);
    setError(null);
    let interval;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const response = await fetch(
        `https://aharkosh-backend.onrender.com/api/generateUserMeal/fetch-by-user/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      clearInterval(interval);

      if (response.ok) {
        setArray(data.data || []);
        setProgress(100);
      } else {
        setError(data.message || "Failed to fetch meals");
        setProgress(100);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setProgress(100);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [id]);

  const filteredArray = array.filter((meal) => {
    const matchesType = mealType ? meal.type.toLowerCase() === mealType.toLowerCase() : true;
    const matchesSearch = meal.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);
  const currentMeals = filteredArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-[#Fae9d7] flex flex-col relative">
      <Header setSearchTerm={setSearchTerm} setMealType={setMealType} />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="flex flex-1">
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
        <main
          className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? "lg:ml-[340px] lg:w-[calc(100%-320px)]" : "ml-0 w-full"
          }`}
        >
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {!loading && filteredArray.length === 0 && !error && (
            <p className="text-center text-gray-500">No meals available.</p>
          )}

          {fullName.length > 0 && (
            <div>
              <div className="bg-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 shadow-md">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"></div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {fullName}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {phoneNumber}
                    </p>
                  </div>
                  <div className="sm:ml-auto">
                    <Bell className="text-gray-500 hover:text-gray-700 w-6 h-6 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">DATE</th>
                      <th className="py-2 px-4 text-left">Meal Type</th>
                      <th className="py-2 px-4 text-left">Cancel Meal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMeals.map((day, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">
                          <Link
                            to={`/meal/details/${day.userId}/${day._id}`}
                            state={{ mealData: day }}
                            className="block"
                          >
                            {new Date(day.createdOn).toLocaleDateString("en-GB")}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          <span className="bg-[#FFEEDD] text-[#FF6600] px-2 py-1 rounded text-sm">
                            {day.type}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <button className="bg-[#FFDDDD] text-[#FF0000] px-4 py-1 rounded">
                            {day.isCanceled ? "Yes" : "No"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#FF6600] text-white"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#FF6600] text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Meal;
