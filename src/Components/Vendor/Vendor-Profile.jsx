import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import VendorSidebar from './Vendor-Sidebar';

const VendorProfile = () => {
  const { id } = useParams(); 

  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state
  const [error, setError] = useState(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);



 

  const fetchVendorProfile = async () => {
    setLoading(true);
    setError(null);
    setProgress(0);
    try {
      const token = localStorage.getItem('token');
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increment progress until 90%
      }, 200);
      const response = await fetch(`https://aharkosh-backend.onrender.com/api/outlet/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      clearInterval(interval);
      console.log('Fetched data:', data);

      if (response.ok) {
        setProfile(data.data || {});
        setProgress(100); // Update profile with fetched data
      } else {
        setError(data.message || 'Failed to fetch vendor profile');
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
    fetchVendorProfile(); // Fetch vendor profile data on component mount
  }, []);

  // Optional: useEffect to log profile whenever it updates
  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      console.log('Updated profile:', profile);
    }
  }, [profile]);



  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]  relative">
      <Header />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
      <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
     

        <main  className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
    isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
  }`}>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
              <img src={profile.imageUrl} alt="Profile" className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" value={profile.fullName || ''} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={profile.email || ''} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" value={profile.password || ''} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                  <div className="flex gap-2">
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50">
                      <option>September</option>
                    </select>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50">
                      <option>31</option>
                    </select>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50">
                      <option>2002</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1 block w-full p-2 rounded-md bg-green-500 text-white">Active</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Outlet Information</h2>
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
              <img src="/placeholder.svg?height=120&width=120" alt="Outlet" className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" value={profile.address?.address || ''} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" value={profile.phoneNumber || ''} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorProfile;
