import React, { useState,useEffect ,useContext} from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom';
import Header from '../Header';
import { X,Bell } from 'lucide-react';
import VendorSidebar from './Vendor-Sidebar';
import { VendorContext } from './VendorContext';


const VendorQuery= ()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setquery] = useState([]);
  const [progress, setProgress] = useState(0);

  const {id}=useParams();
  const { currentItems, setCurrentItems } = useContext(VendorContext);
    // console.log(currentItems);
    
    const user = currentItems.find((item) => item.outletId === id);
  // console.log(user);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  

  const fetchQueries = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://aharkosh-backend.onrender.com/api/query/user/cf7a17b1-c5e2-11ee-9867-6d0d8337f7f8', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
console.log(data);

      if (response.ok) {
        setquery(data.data || []); // Assuming deliveries are in data.data
      } else {
        setError(data.message || 'Failed to fetch delivery data');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries(); // Fetch delivery data on component mount
  }, [id]);


  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]  relative">
      {/* Header */}
     <Header />
    
     {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden ">
        
        {/* Sidebar */}
       

        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
     
        {/* Main Content Area */}
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
  ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
  ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
          

          {/* User Info and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white sm:w-full mt-1 w-[350px] p-4 rounded-lg ">
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
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="w-12 h-12 bg-yellow-300 rounded-full mr-4 flex items-center justify-center text-2xl">$</div>
              <div>
                <h2 className="font-bold">All Query</h2>
                <p className="text-xl">253</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="w-12 h-12 bg-orange-300 rounded-full mr-4 flex items-center justify-center text-2xl">%</div>
              <div>
                <h2 className="font-bold">Resolve Query</h2>
                <p className="text-xl">253</p>
              </div>
            </div>
          </div>

          {/* Query Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">QUERY ID</th>
                  <th className="py-2 px-4 text-left">DATE</th>
                  <th className="py-2 px-4 text-left">QUERY TYPE</th>
                  <th className="py-2 px-4 text-left">Query Name</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'REFERRAL', status: 'Process' },
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'MEAL CANCLE', status: 'Not Done' },
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'MEAL CANCLE', status: 'Not Done' },
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'REFERRAL', status: 'Done' },
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'MEAL CANCLE', status: 'Not Done' },
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'MEAL CANCLE', status: 'Process' },
                  { id: '#54264', date: '12/JAN/2024', type: '09:40 AM', name: 'MEAL CANCLE', status: 'Done' },
                ].map((query, index) => (
                  <tr key={index} className="border-t">
                  
                  
                    <td className="py-2 px-4"><Link to={`/vendor/query/:id/details`}>{query.id}</Link></td>
                    <td className="py-2 px-4">{query.date}</td>
                    <td className="py-2 px-4">{query.type}</td>
                    <td className="py-2 px-4">{query.name}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          query.status === 'Process'
                            ? 'bg-yellow-200 text-yellow-800'
                            : query.status === 'Not Done'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {query.status}
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

export default VendorQuery;