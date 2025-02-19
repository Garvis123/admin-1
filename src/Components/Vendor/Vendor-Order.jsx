import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import { Bell } from 'lucide-react';
import VendorSidebar from './Vendor-Sidebar';
import { VendorContext } from './VendorContext';

const VendorOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentItems } = useContext(VendorContext);

  const user = currentItems.find((item) => item.outletId === id);
  const fullName = user ? user.fullName : 'User not found';
  const phoneNumber = user ? user.phoneNumber : 'Fetching..';

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const fetchVendorOrders = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    let interval;
    try {
      const token = localStorage.getItem('token');
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const response = await fetch(`https://aharkosh-backend.onrender.com/api/order/outlet/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      clearInterval(interval);

      if (response.ok) {
        setOrder(data.data || []);
        setProgress(100);
      } else {
        setError(data.message || 'Failed to fetch order data');
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
    fetchVendorOrders();
  }, [id]);

  const filteredOrders = order.filter((order) =>
    order.meals.some((meal) => meal.item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#Fae9d7] relative">
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
        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'} flex flex-col overflow-hidden`}>
          <div className="bg-white p-4 rounded-lg mb-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{fullName}</h2>
                <p className="text-gray-600 text-sm">{phoneNumber}</p>
              </div>
              <Bell className="text-gray-500 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            </div>
          </div>
          
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">ORDER ID</th>
                  <th className="p-2 text-left">DATE</th>
                  <th className="p-2 text-left">CUSTOMER NAME</th>
                  <th className="p-2 text-left">ORDER NAME</th>
                  <th className="p-2 text-left">PRICE</th>
                  <th className="p-2 text-left">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 whitespace-nowrap">
                      <Link to={`/vendor/Order/${order.outletId}/details`} state={{ VendorMeal: order }}>
                        {order._id}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{new Date(order.createdOn).toLocaleDateString('en-GB')}</td>
                    <td className="p-4">{order.customerName || 'N/A'}</td>
                    <td className="p-4">
                      {order.meals.map((meal, mealIndex) => (
                        <div key={mealIndex}>{meal.item.title}</div>
                      ))}
                    </td>
                    <td className="p-4">
                      {order.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="flex items-center gap-1">
                          <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">₹</span>
                          <span>{meal.item.price}</span>
                        </div>
                      ))}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorOrder;
