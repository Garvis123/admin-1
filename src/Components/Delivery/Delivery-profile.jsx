import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header'
import DeliverySidebar from './Delivery-Sidebar';

const  DeliveryProfile=()=>{
const [isMenuOpen, setIsMenuOpen] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [progress, setProgress] = useState(0);
const [delivery, setDelivery] = useState([]);

const toggleMenu = () => setIsMenuOpen((prev) => !prev);
const {id}=useParams();

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
      `https://aharkosh-backend.onrender.com/api/delivery/${id}`,
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
      setDelivery(data.data || []);
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
     {
    return (
      <div className="flex flex-col min-h-screen bg-[#fae9d7]">
        {/* Header */}
       <Header />
  
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
        <DeliverySidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
         
  
          {/* Main Content */}
          <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
          }`}>
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=150&width=150"
                      alt="Profile"
                      className="w-[150px] h-[150px] rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        value="Meal Plans"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        value="Seth"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value="Aditya3512@Gmail.Com"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <input
                        type="password"
                        value="**********"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Male</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Of Birth</label>
                      <div className="flex gap-2">
                        <select className="flex-1 p-2 border rounded-md">
                          <option>September</option>
                        </select>
                        <select className="w-20 p-2 border rounded-md">
                          <option>31</option>
                        </select>
                        <select className="w-24 p-2 border rounded-md">
                          <option>2002</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <div className="bg-emerald-500 text-white p-2 rounded-md text-center">
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Outlet Information */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Outlet Information</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=150&width=150"
                      alt="Profile"
                      className="w-[150px] h-[150px] rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input
                        type="text"
                        value="Palace @72, Sarfbad Village, Noida Sector 72"
                        className="w-full p-2 border rounded-md text-center"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        value="Noida"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        value="Uttar Pradesh"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Latitude/Longitue</label>
                      <input
                        type="text"
                        value="72.5326,58.287"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode</label>
                      <input
                        type="text"
                        value="462046"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Fssai Number</label>
                      <input
                        type="text"
                        value="125EYFH556J"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gst Number</label>
                      <input
                        type="text"
                        value="JKJD52995D"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Aadhar Card</label>
                      <input
                        type="text"
                        value="305868217289"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pan Card</label>
                      <input
                        type="text"
                        value="CKAPV9456K"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Of Oulet Registration</label>
                      <input
                        type="text"
                        value="20/08/2024"
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}
export default DeliveryProfile;