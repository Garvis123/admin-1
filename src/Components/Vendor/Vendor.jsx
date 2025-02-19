import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Header';
import PanelSidebar from '../Panel-sidebar';
import { VendorContext } from './VendorContext'; 

const Vendor = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const itemsPerPage = 7;
  const navigate = useNavigate();
  const { currentItems, setCurrentItems } = useContext(VendorContext); 

  const fetchVendor = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    let interval;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in.');
        setLoading(false);
        return;
      }

      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await fetch('https://aharkosh-backend.onrender.com/api/outlet', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      clearInterval(interval);
      if (response.ok) {
        setCurrentItems(data.data || []);
        setProgress(100);
      } else {
        setError(data.message || 'Failed to fetch vendors');
        setProgress(100);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setProgress(100);
    } finally {
      if (interval) clearInterval(interval);
      setLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayedItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]">
      <Header />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-300 overflow-hidden z-50 shadow-md">
          <div
            className="h-full bg-[#FF6600] rounded-r-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <PanelSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <main
  className={`flex-1 p-4 transition-all duration-300 mt-[80px] ${
    isMenuOpen ? "lg:ml-[320px] lg:w-[calc(100%-320px)]" : "lg:ml-[90px] w-full"
  } w-full max-w-full`}
>
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] sm:min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentDisplayedItems.map((user, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/vendor/profile/${user.outletId}`}
                  state={{ VendorData: user }}
                  className="flex items-center"
                >
                  {user.outletId}
                </Link>
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 relative">
                  <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ri-user-line"></i>
                </div>
                <Link to={`/vendor/profile/${user.outletId}`}>
                  {user.fullName.split(' ')[0]}
                </Link>
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {!loading && currentItems.length > 0 && (
    <div className="mt-4 flex flex-wrap justify-center items-center gap-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-[#FF6600] text-white'
        }`}
      >
        Previous
      </button>
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-[#FF6600] text-white'
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

export default Vendor;
