'use client'

import { useState,useEffect,useContext } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom';
import Header from '../Header';
import { X,Bell } from 'lucide-react'
import VendorSidebar from './Vendor-Sidebar';
import { VendorContext } from './VendorContext';

const VendorTotalUsers=()=> {
  const {id}=useParams();
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [users, setusers] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { currentItems, setCurrentItems } = useContext(VendorContext);
  
  const user = currentItems.find((item) => item.outletId === id);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";

  const fetchUser = async () => {
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
  
      const response = await fetch(`https://aharkosh-backend.onrender.com/api/outlet/find-current-active-user-outlet/cf7a17b1-c5e2-11ee-9867-6d0d8337f7f8`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      
      
      clearInterval(interval);
      if (response.ok) {
        setusers(data.data);
        setProgress(100);
      } else {
        setError(data.message || 'Failed to fetch users');
        setProgress(100);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setProgress(100);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, [id]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  console.log(users);
  
  const filteredUsers = users
  .flat() // Flatten the array to get a single-level array
  .filter(user => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentUsers = filteredUsers.slice(
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
    <div className="flex flex-col min-h-screen bg-[#fae9d7] relative">
      <Header setSearchTerm={setSearchTerm} />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
          <div className="h-full bg-[#FF6600] transition-all duration-200 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
          ${isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
          ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
          <div className="bg-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"></div>
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
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">USER ID</th>
                  <th className="text-left p-2">USER NAME</th>
                  <th className="text-left p-2">PLAN ID</th>
                  <th className="text-left p-2">PLAN NAME</th>
                  <th className="text-left p-2">PURCHASE DATE</th>
                  <th className="text-left p-2">EXPIRE DATE</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2"><Link to={`/vendor/totalUser/${row._id}/details`} state={{VendorUser:row}}>{row.userId}</Link></td>
                    <td className="p-2">{row.fullName}</td>
                    <td className="p-2">{row.planId}</td>
                    <td className="p-2">{row.planName}</td>
                    <td className="p-2">{row.purchaseDate}</td>
                    <td className="p-2">{row.expireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VendorTotalUsers;
