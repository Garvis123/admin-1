import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { Bell } from "lucide-react";

const Onetimeorder = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const { users } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = users.find((item) => item.userId === id);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching...";

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      setProgress(0);
      let interval;

      try {
        const token = localStorage.getItem("token");

        interval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        const response = await fetch(
          `https://aharkosh-backend.onrender.com/api/order/user/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data.data);
        
        clearInterval(interval);

        if (response.ok) {
          setOrders(data.data || []);
          setProgress(100);
        } else {
          setError(data.message || "Failed to fetch delivery data");
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

    fetchOrder();
  }, [id]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  console.log(orders);
  
  const filteredOrders = orders.filter((order) => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||   
    order.meals.some((meal) =>  
      meal.item.title.toLowerCase().includes(searchTerm.toLowerCase())
      
    )
  );

  

  const currentOrders = filteredOrders.slice(
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
    <div className="min-h-screen bg-[#fae9d7] flex flex-col relative">
      <Header setSearchTerm={setSearchTerm} />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen((prev) => !prev)}
          id={id}
          className={`transition-all duration-300 ${
            isMenuOpen ? "sm:w-[280px]" : "w-0"
          } fixed sm:relative top-0 left-0 h-full bg-white z-50 sm:z-auto`}
        />

        <main
          className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? "lg:ml-[340px] lg:w-[calc(100%-340px)]" : "ml-0 w-full"
          }`}
        >
          <div>
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

            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4">ORDER ID</th>
                    <th className="text-left p-4">DATE</th>
                    <th className="text-left p-4">ORDER NAME</th>
                    <th className="text-left p-4">PRICE</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">
                        <Link to={`/order/${order.userId}/details`} state={{ mealData: order }}>
                          {order.orderId}
                        </Link>
                      </td>
                      <td className="p-4">{new Date(order.createdOn).toLocaleDateString('en-GB')}</td>
                      <td className="p-4">{order.meals.map((meal) => meal.item.title).join(", ")}</td>
                      <td className="p-4">₹ {order.meals.reduce((sum, meal) => sum + meal.item.price, 0)}</td>
                      <td className="p-4">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Onetimeorder;
