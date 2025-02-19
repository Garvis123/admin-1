import React from 'react'
import Header from '../Header';
import { useState,useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import VendorSidebar from './Vendor-Sidebar';
import { VendorContext } from './VendorContext';



const plans = [
  { title: 'Stander Plan', type: 'standard' },
  { title: 'Gold Plan', type: 'gold' },
  { title: 'Premium Plan', type: 'premium' },
  { title: 'Others', type: 'others' },
]

const VendorPlan=()=> {
  const {id}=useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [plans,setPlans] = useState([]); 
  const [error, setError] = useState(null)// For storing wallet data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { currentItems, setCurrentItems } = useContext(VendorContext);
    // console.log(currentItems);
    
    const user = currentItems.find((item) => item.outletId === id);
  // console.log(user);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const VendorPlan = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
  let interval;
    try {
      const token = localStorage.getItem('token');
       interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increment progress until 90%
      }, 200);
      const response = await fetch(`https://aharkosh-backend.onrender.com/api/plan/fetch-outlet-plan/${id}`, {
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
        const planArray=data.data
        setPlans(planArray || []);
        setProgress(100);  // Assuming deliveries are in data.data
        console.log(planArray);
        
      } else {
        setError(data.message || 'Failed to fetch delivery data');
        setProgress(100); 
      }

    } catch (err) {
      setError('Network error. Please try again.');
      setProgress(100); 
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0); // Hide progress after completion
      }, 500);
    }
  };
  
  useEffect(() => {
    VendorPlan(); // Fetch delivery data on component mount
  }, [id]);

 
  if (error) return <div>{error}</div>;
  const totalPages = Math.ceil(plans.length / itemsPerPage);
  const currentUsers = plans.slice(
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
     

        <main  className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
    isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
  }`}>
          <div className="bg-white rounded-lg shadow p-6 mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h2 className="text-xl font-semibold">{fullName}</h2>
                <p className="text-gray-600">{phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentUsers.map((plan,index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">{plan.item.name}</h3>
                <div className="space-y-2">
                  <p>Plan Id : {plan.planId}</p>
                  <p>Plan Price : {plan.item.currency} {plan.item.amount}</p>
                  <p>Plan Active User : 52</p>
                  <p>Meal Id : {plan._id}</p>
                  <p>
                    Delivery Status Status :{' '}
                    <span className="text-green-600 font-medium">Done</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {!loading && plans.length > 0 && (
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

export default VendorPlan;