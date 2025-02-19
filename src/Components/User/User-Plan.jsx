'use client'

import { Bell, Menu, Search } from 'lucide-react'
import { useState,useEffect,useContext } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import Header from '../Header'
import Sidebar from './Sidebar'
import { UserContext } from './UserContext'


const Plans=()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const { id } = useParams(); // Ensure 'id' comes from the route
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  const {users} = useContext(UserContext);
  const itemsPerPage = 10;

  const navigate=useNavigate();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const user = users.find((item) => item.userId === id);
  // console.log(user);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber  : "Fetching..";
  // console.log(fullName);

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
  
      // Start a progress interval
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);
  
      const response = await fetch(
        `https://aharkosh-backend.onrender.com/api/plan`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      clearInterval(interval);
      console.log(data.data);
      
  
      if (response.ok) {
        setPlans(data.data || []);
        setProgress(100); // Complete progress bar
      } else {
        setError(data.message || "Failed to fetch users");
        setProgress(100); // Indicate completion even on error
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setProgress(100); // Indicate completion
    } finally {
      clearInterval(interval);
      setProgress(100); // Complete progress
      setTimeout(() => {
        setProgress(0); // Reset after a short delay
        setLoading(false); // Hide progress bar
      }, 500); // Delay to show the final state
    }
    
  };
  

  useEffect(() => {
    fetchMeal();
  }, [id]);

  const planData = Array(7).fill({
    planId: '#26266565',
    planName: 'STANDER PLAN',
    purchaseDate: '12/JAN/2024',
    expireDate: '12/JAN/2024',
    price: '523',
    status: 'No',
  })


  const totalPages = Math.ceil(plans.length / itemsPerPage);
  console.log(plans);
  
  const filteredplans = plans.filter((plans) => 
    plans.planId.toLowerCase().includes(searchTerm.toLowerCase()) ||   
  plans.planId.toLowerCase().includes(searchTerm.toLowerCase())   

 ) ;

  

  const currentplans = filteredplans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };



  return (
    <div className="min-h-screen bg-[#fae9d7] flex flex-col relative">
      {/* Header */}
      <Header setSearchTerm={setSearchTerm} />
    
     {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="flex flex-1">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />

      
        
       

        {/* Main Content */}
        <main  className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? "lg:ml-[340px] lg:w-[calc(100%-320px)]" : "ml-0 w-full"
          }`}>
      {/* User Info Section */}
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

      {/* Plans Table Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead className="hidden sm:table-header-group">
            <tr className="text-left border-b">
              <th className="pb-2 sm:pb-4">PLAN ID</th>
              <th className="pb-2 sm:pb-4">PLAN NAME</th>
              <th className="pb-2 sm:pb-4">PURCHASE DATE</th>
              <th className="pb-2 sm:pb-4">EXPIRE DATE</th>
              <th className="pb-2 sm:pb-4">PRICE</th>
              <th className="pb-2 sm:pb-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentplans.map((plan, index) => (
              <tr key={index} className="border-t sm:border-none flex flex-col sm:table-row mb-4 sm:mb-0">
                <td className="py-2 sm:py-4">
                  <span className="sm:hidden font-semibold">PLAN ID: </span>
                  <Link
                    to={`/plans/${plan._id}/details`}
                    state={{ mealData: plan }}
                    className="text-black hover:underline break-words"
                  >
                    {plan.planId}
                  </Link>
                </td>
                <td className="py-2 sm:py-4">
                  <span className="sm:hidden font-semibold">PLAN NAME: </span>
                  {plan.planName}
                </td>
                <td className="py-2 sm:py-4">
                  <span className="sm:hidden font-semibold">PURCHASE DATE: </span>
                  {new Date(plan.createdOn).toLocaleDateString(
                              "en-GB"
                            )}
                </td>
                <td className="py-2 sm:py-4">
                  <span className="sm:hidden font-semibold">EXPIRE DATE: </span>
                  {plan.expireDate}
                </td>
                <td className="py-2 sm:py-4">
                  <span className="sm:hidden font-semibold">PRICE: </span>
                  <div className="flex items-center gap-1">
                    <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                      ₹
                    </span>
                    {plan.item.amount}
                  </div>
                </td>
                <td className="py-2 sm:py-4">
                  <span className="sm:hidden font-semibold">STATUS: </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                      plan.status === "Active"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>




      </div>

      {/* Mobile Menu Button */}
     
    </div>
  )
}

export default Plans;