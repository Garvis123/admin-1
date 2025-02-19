import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Header from "../Header";
import PanelSidebar from "../Panel-sidebar";

const Delivery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(7); // Items per page
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const fetchDeliveries = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    try {
      const token = localStorage.getItem("token");
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);
      const response = await fetch(
        "https://aharkosh-backend.onrender.com/api/delivery",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      
      clearInterval(interval);

      if (response.ok) {
        setDeliveries(data.data || []);
        setProgress(100);
      } else {
        setError(data.message || "Failed to fetch delivery data");
        setProgress(100);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setProgress(100);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Calculate the range of items to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deliveries.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination numbers
  const totalPages = Math.ceil(deliveries.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
      <div className="flex flex-1">
        <PanelSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <main
        className={`flex-1 sm:mt-[80px] mt-[80px] p-4 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "lg:ml-[340px] lg:w-[calc(100%-320px)]" : "ml-[0px] sm:ml-[100px] w-full"
        }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Total Delivery", value: "1234" },
              { title: "Active Delivery", value: "1234" },
              { title: "Non Active Delivery", value: "1234" },
              { title: "Deleted Delivery", value: "1234" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex items-center"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 relative">
                  <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ri-user-line"></i>
                </div>
                <div>
                  <div className="font-bold text-xl">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center p-4">
                      Loading...
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (
                  currentItems.map((delivery, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/delivery/profile/${delivery.
deliveryId
}`}>
                        {delivery._id}              
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 relative">
                          <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ri-user-line"></i>
                        </div>
                        {delivery.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            delivery.status === "Open"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {delivery.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4">
                      No delivery data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {!loading && deliveries.length > 0 && (
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

export default Delivery;
