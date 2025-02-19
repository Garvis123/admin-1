'use client'

import { useState, useEffect } from 'react'
import Header from '../Header'
import VendorSidebar from './Vendor-Sidebar'
import { useLocation, useParams } from 'react-router-dom'

const VendorTotalUsersDetails=()=> {
    const {id}=useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location=useLocation();
  const [VendorUser, setVendorUser] = useState(null)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const [isMobile, setIsMobile] = useState(false)

 useEffect(() => {
     if (location.state && location.state.VendorUser) {
       setVendorUser(location.state.VendorUser);
     } else {
       console.error("No VendorUser data in location.state");
     }
   }, [location.state]);
   console.log(VendorUser);
   

  return (
    <div className="min-h-screen bg-[#fae9d7]  flex flex-col relative">
      {/* Header */}
    <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />


        {/* Main Content */}
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
  ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
  ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
          <div className="max-w-4xl mx-auto">
            {/* Profile Section */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 mx-auto md:mx-0">
                  <img 
                    src="/profile.jpg" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input 
                        type="text" 
                        value={VendorUser?.fullName.split(" ")[0]}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input 
                        type="text" 
                        value={VendorUser?.fullName.split(" ")[1]}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      value={VendorUser?.email}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                      <div className="grid grid-cols-3 gap-2">
                        <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                          <option>September</option>
                        </select>
                        <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                          <option>31</option>
                        </select>
                        <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                          <option>2002</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className={`${VendorUser?.isPlanActive ? "mt-1 bg-green-500 text-white px-4 py-2 rounded-md inline-block " : "mt-1 bg-red-500 text-white px-4 py-2 rounded-md inline-block"}`}>
  {VendorUser?.isPlanActive ? "Active" : "Non Active"}
</div>

                  </div>
                </div>
              </div>
            </div>

            {/* Outlet Information */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-6">Outlet Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input 
                      type="text" 
                      value="Palace @72, Sarfbad Village, Noida Sector 72"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input 
                      type="text" 
                      value="Noida"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Latitude/Longitue</label>
                    <input 
                      type="text" 
                      value="72.5326,58.287"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fssai Number</label>
                    <input 
                      type="text" 
                      value="125EYFH556J"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
                    <input 
                      type="text" 
                      value="305868217289"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    <input 
                      type="text" 
                      value="462046"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input 
                      type="text" 
                      value="Uttar Pradesh"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Of Oulet Registration</label>
                    <input 
                      type="text" 
                      value="20/08/2024"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gst Number</label>
                    <input 
                      type="text" 
                      value="JKJD52995D"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pan Card</label>
                    <input 
                      type="text" 
                      value="CKAPV9456K"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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

export default VendorTotalUsersDetails;