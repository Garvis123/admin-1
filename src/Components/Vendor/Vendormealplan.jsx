import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../Header';
import { X, Bell } from 'lucide-react';
import VendorSidebar from './Vendor-Sidebar';
import { VendorContext } from './VendorContext';

const MealPlan = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meal, setMeal] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { currentItems } = useContext(VendorContext);

  const user = currentItems.find((item) => item.outletId === id);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const fetchMeal = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    let interval;

    try {
      const token = localStorage.getItem('token');
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const response = await fetch(`https://aharkosh-backend.onrender.com/api/generateUserMeal/fetch-by-outlet/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      
      clearInterval(interval);

      if (response.ok) {
        const usersArray = data.data;
        setMeal(usersArray);
        setProgress(100);
      } else {
        setError(data.message || 'Failed to fetch users');
        setProgress(100);
      }
    } catch (err) {
      setError('Network error. Please try again.');
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

  const totalPages = Math.ceil(meal.length / itemsPerPage);
  const currentUsers = meal.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]  relative">
      <Header />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
        <main
          className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
          }`}
        >
          <div className="bg-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xl font-medium"></span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold">{fullName}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{phoneNumber}</p>
              </div>
              <div className="sm:ml-auto">
                <Bell className="text-gray-500 hover:text-gray-700 w-6 h-6 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className=" bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">DATE</th>
                  <th className="py-2 px-4 text-left">Meal Type</th>
                  <th className="py-2 px-4 text-left">Cancel Meal</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((plan, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">
                      <Link 
                        to={`/vendor/mealPlan/${plan.id}/details`} 
                        state={{ VendorMeal: plan }}
                      >
                        {plan.date}
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex gap-2">
                        {plan.type && <span className="px-2 py-1 bg-[#FFE4B5] text-[#8B4513] rounded-full text-xs">{plan.type}</span>}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-red-200 text-red-800">
                        {plan.isCanceled ? "NO" : "Yes"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && meal.length > 0 && (
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
        </main>
      </div>
    </div>
  );
};

export default MealPlan;