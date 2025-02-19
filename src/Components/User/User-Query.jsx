import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../Header";
import { Bell } from "lucide-react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const UserQuery = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [walletData, setWalletData] = useState([]); // For storing wallet data
  const [loading, setLoading] = useState(true); // Loading state
  const [progress, setProgress] = useState(0); // Progress bar percentage
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1);
  const { users } = useContext(UserContext);
  const user = users.find((item) => item.userId === id);
  const fullName = user ? user.fullName : "User not found";
  const phoneNumber = user ? user.phoneNumber : "Fetching..";
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProgress(0);
    let interval;

    const fetchUserData = async () => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 300);

      try {
        const response = await axios.get(
          `https://aharkoshbacked.onrender.com/api/wallet/${id}`
        );
        console.log(response.data.data);

        if (response.status === 200) {
          setWalletData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch user");
        }
        setProgress(100);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Error fetching user data");
        } else {
          setError("Network error. Please try again later.");
        }
      } finally {
        clearInterval(interval);
        setProgress(100); // Complete progress
        setTimeout(() => {
          setProgress(0); // Reset after a short delay
          setLoading(false); // Hide progress bar
        }, 500); // Delay to show the final state
      }
    };

    fetchUserData();
  }, [id]);

  // Transaction data (static example)
  const transactionData = [
    { id: "#54264", date: "12/JAN/2024", time: "09:40 AM", name: "REFERRAL", type: "Debit", amount: "280-" },
    { id: "#54265", date: "12/JAN/2024", time: "10:40 AM", name: "MEAL CANCEL", type: "Debit", amount: "280-" },
    { id: "#54266", date: "13/JAN/2024", time: "11:40 AM", name: "REFERRAL", type: "Credit", amount: "280+" },
  ];

  return (
    <div className="min-h-screen bg-[#Fae9d7] flex flex-col relative">
      {/* Header */}
      <Header />

      {/* Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          className={`transition-all duration-300 ${
            isMenuOpen ? 'sm:w-[280px]' : 'w-0'
          } fixed sm:relative top-0 left-0 h-full bg-white z-50 sm:z-auto`}
        />

        {/* Main Content */}
        <main
          className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
          }`}
        >
          {loading ? (
            <div className="text-center mt-20 text-xl">Loading...</div>
          ) : error ? (
            <div className="text-center mt-20 text-red-500">{error}</div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4 sm:gap-[90px]">
                {/* User Info */}
                <div className="bg-white mt-1 w-full sm:w-[315px] sm:h-[80px] p-4 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xl font-medium"></span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-[18px] font-semibold">{fullName}</h2>
                      <p className="text-gray-600 text-sm sm:text-base">{phoneNumber}</p>
                    </div>
                    <div className="sm:ml-auto">
                      <Bell className="text-gray-500 hover:text-gray-700 w-6 h-6 cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="bg-white h-[80px] mt-1 w-full sm:w-[250px] p-4 rounded-lg shadow-md flex items-center gap-4">
                  <div className="w-[60px] h-[60px] bg-[#FF4500] rounded-full flex items-center justify-center text-[20px] text-white">
                    $
                  </div>
                  <div>
                    <p className="text-gray-600 text-[15px] font-[400]">Available Balance</p>
                    <p className="font-bold text-[18px] leading-[27px]">253</p>
                  </div>
                </div>
                <div className="bg-white h-[80px] w-full sm:w-[250px] p-4 rounded-lg shadow-md flex items-center gap-4">
                  <div className="w-[60px] h-[60px] bg-[#FF4500] rounded-full flex items-center justify-center text-white text-[20px]">
                    %
                  </div>
                  <div>
                    <p className="text-gray-600">Coupon</p>
                    <p className="font-bold text-[18px] leading-[27px]">253</p>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-4">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION ID
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        DATE
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        TIME
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction Name
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Transaction Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactionData.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="py-4 px-4 whitespace-nowrap">
                          <Link
                            to={`/wallet/${id}/details`}
                            className="text-black hover:underline"
                          >
                            {transaction.id}
                          </Link>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap hidden sm:table-cell">
                          {transaction.date}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap hidden md:table-cell">
                          {transaction.time}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {transaction.name}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap hidden sm:table-cell">
                          {transaction.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserQuery;