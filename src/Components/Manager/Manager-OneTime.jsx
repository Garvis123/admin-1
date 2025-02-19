'use client'

import { useState,useEffect } from 'react'
import Header from '../Header'
import ManagerSidebar from './Manager-Sidebar'
import { useParams,Link } from 'react-router-dom'

const  ManagerOrder=()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {id}=useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [order, setOrder] = useState([]);
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
        `https://aharkosh-backend.onrender.com/api/order/delivery/all-delivery/${id}`,
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
        setOrder(data.data || []);
        setProgress(100);
      } 
      
      else {
        setError(data.message || "Failed to fetch delivery details");
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

  const orders = [
    { id: '#26266565', date: '12/JAN/2024', customerName: 'DOSA', orderName: 'DOSA', price: '523', status: 'No' },
    { id: '#26266565', date: '12/JAN/2024', customerName: 'RASMALAI', orderName: 'RASMALAI', price: '523', status: 'No' },
    { id: '#26266565', date: '12/JAN/2024', customerName: 'DOSA', orderName: 'DOSA', price: '523', status: 'No' },
    { id: '#26266565', date: '12/JAN/2024', customerName: 'IDLI', orderName: 'IDLI', price: '523', status: 'No' },
    { id: '#26266565', date: '12/JAN/2024', customerName: 'FREE KA KHANA', orderName: 'FREE KA KHANA', price: '523', status: 'No' },
    { id: '#26266565', date: '12/JAN/2024', customerName: 'OR BHAI', orderName: 'OR BHAI', price: '523', status: 'No' },
    { id: '#26266565', date: '12/JAN/2024', customerName: 'MALAI CHAP', orderName: 'MALAI CHAP', price: '523', status: 'No' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]">
      {/* Header */}
     <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
      <ManagerSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
       

        {/* Main Content */}
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'sm:ml-[100px] ml-0 w-full'
          }`}>
          {/* Profile Header */}
          <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <h2 className="text-xl font-bold">ADITYA SETH</h2>
                <p className="text-gray-600">9893679911</p>
              </div>
            </div>
           
            <div className="hidden md:block">
              🔔
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-4">ORDER ID</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">CUSTOMER NAME</th>
                  <th className="p-4">ORDER NAME</th>
                  <th className="p-4">PRICE</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
  {order.map((order, index) => (
    <tr key={index} className="border-b">
      <td className="p-4">
        {order.meals.map((meal, idx) => (
          <Link 
            key={idx} 
            to={`/delivery/order/details/${meal.id}`} // Use the meal ID dynamically
            className="block"
          >
            {meal.item._id}
          </Link>
        ))}
      </td>
      <td className="p-4">{new Date(order.createdOn).toLocaleDateString(
                              "en-GB"
                            )}</td>
      <td className="p-4">{order.user.
fullName
}</td>
<td className="p-4">
        {order.meals.map((meal, idx) => (
          <Link 
            key={idx} 
            to={`/delivery/order/details/${meal.id}`} // Use the meal ID dynamically
            className="block"
          >
            {meal.item.title}
          </Link>
        ))}
      </td>
      <td className="p-4">
        <div className="flex items-center">
          <span className="mr-1">₹</span>
          <td className="p-4">
        {order.meals.map((meal, idx) => (
          <Link 
            key={idx} 
            to={`/delivery/order/details/${meal.id}`} // Use the meal ID dynamically
            className="block"
          >
            {meal.item.price}
          </Link>
        ))}
      </td>
        </div>
      </td>
      <td className="p-4">
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
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
  )
}

export default ManagerOrder;