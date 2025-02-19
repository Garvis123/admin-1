'use client'

import React, { useState,useEffect,useContext } from 'react'
import { Bell, Search, User, DollarSign, Percent,X } from 'lucide-react'
import { useNavigate, useParams ,Link} from 'react-router-dom'
import Header from '../Header'
import VendorSidebar from './Vendor-Sidebar'
import { VendorContext } from './VendorContext'

const VendorWallet=()=> {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [wallet,setWallet] = useState([]); // For storing wallet data
  const [loading, setLoading] = useState(true); 
  const [progress, setProgress] = useState(0); // Loading state
  const [error, setError] = useState(null);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { currentItems, setCurrentItems } = useContext(VendorContext);
    // console.log(currentItems);
    
    const user = currentItems.find((item) => item.outletId === id);
  // console.log(user);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";
 

  const VendorWallet = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
  let interval;
    try {
      const token = localStorage.getItem('token');
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increment progress until 90%
      }, 200);
      const response = await fetch(`https://aharkosh-backend.onrender.com/api/outlet-wallet-history/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      clearInterval(interval);
      console.log(data);
      
  
      if (response.ok) {
        const orderArray=data.data
        setWallet(orderArray || []);
        setProgress(100);  // Assuming deliveries are in data.data
        console.log(orderArray);
        
      } else {
        setError(data.message || 'Failed to fetch delivery data');
        setProgress(100); 
      }

    } catch (err) {
      setError('Network error. Please try again.');
      setProgress(100); 
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
    VendorWallet(); // Fetch delivery data on component mount
  }, [id]);


  const totalPages = Math.ceil(wallet.length / itemsPerPage);
  const currentUsers = wallet.slice(
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
      {/* Header placeholder */}
    <Header />

    {loading && (
  <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
    <div
      className="h-full bg-[#FF6600] transition-all duration-200 rounded"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
)}


      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
     

        {/* Main content area */}
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
  ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
  ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
        

          {/* User info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white sm:w-full mt-1 w-[350px] p-4 rounded-lg shadow-md">
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
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <DollarSign size={40} className="text-[#FFD700]" />
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <h2 className="font-bold">253</h2>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <Percent size={40} className="text-[#FF5722]" />
              <div>
                <p className="text-sm text-gray-600">Coupon</p>
                <h2 className="font-bold">253</h2>
              </div>
            </div>
          </div>

          {/* Transaction table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">TRANSACTION ID</th>
                  <th className="p-2 text-left">DATE</th>
                  <th className="p-2 text-left">TIME</th>
                  <th className="p-2 text-left">Transaction Name</th>
                  <th className="p-2 text-left">Transaction Type</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2" ><Link state={{VendorWallet:item}} to={`/vendor/wallet/${item.outletId}/details`}>{item.id}</Link></td>
                    <td className="py-2 px-4">
                      {new Date(item.createdOn).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-2">09:40 AM</td>
                    <td className="p-2">{item.transactionName}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.transactionType.includes('Credit') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {item.transactionType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {!loading && wallet.length > 0 && (
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
  )
}

export default VendorWallet;