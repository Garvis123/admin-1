import Header from "../Header";
import DeliverySidebar from "./Delivery-Sidebar";
import { useState,useEffect} from "react";
import { useParams,Link } from "react-router-dom";
const DeliveryWallet=()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {id}=useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [wallet, setWallet] = useState([]);
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
        `https://aharkosh-backend.onrender.com/api/deliverywallet/${id}`,
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
        setWallet(data.data || []);
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
    return (
      <div className="flex flex-col min-h-screen bg-[#fae9d7]">
        {/* Header */}
       <Header />
  
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
        <DeliverySidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
           
  
          {/* Main Content Area */}
          <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
          }`}>
            {/* User Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold">ADITYA SETH</div>
                  <div className="text-sm text-gray-600">9893679911</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">$</div>
                  <div>Available Balance</div>
                </div>
                <div className="text-xl font-bold mt-2">253</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">%</div>
                  <div>Coupon</div>
                </div>
                <div className="text-xl font-bold mt-2">253</div>
              </div>
            </div>
  
            {/* Transactions Table */}
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4">TRANSACTION ID</th>
                    <th className="p-4">DATE</th>
                    <th className="p-4">TIME</th>
                    <th className="p-4">Transaction Name</th>
                    <th className="p-4">Transaction Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    <tr className="border-b">
                      <td className="p-4"><Link to={`/delivery/wallet/details/:id`}>{wallet._id }</Link></td>
                      <td className="p-4">  <td className="p-4">{new Date(wallet.createdOn).toLocaleDateString(
                              "en-GB"
                            )}</td></td>
 <td className="p-4">
        {new Date(wallet.createdOn).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // This will display time in 12-hour format with AM/PM
        })}
      </td>
                      <td className="p-4">{}</td>
                      {/* <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${i === 3 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {i === 3 ? '280+ Credit' : '280- Debit'}
                        </span>
                      </td> */}
                    </tr>
                }
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
export default DeliveryWallet;