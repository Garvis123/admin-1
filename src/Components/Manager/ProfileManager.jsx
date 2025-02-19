import Header from "../Header";
import ManagerSidebar from "./Manager-Sidebar";
import { useState } from "react";   
const ProfileManager=()=> {
      const [isMenuOpen, setIsMenuOpen] = useState(true)
        const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    return (
      <div className="flex flex-col min-h-screen bg-[#fae9d7]">
        {/* Navigation */}
       <Header />
  
        {/* Main Content */}
        <div className="flex flex-1 ">
          {/* Sidebar */}
         <ManagerSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}  />
  
          {/* Form Content */}
          <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'sm:ml-[100px] ml-0 w-full'
          }`}>
            {/* Personal Information */}
            <section className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-6">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man_vendor_panel_list_profile-zlDylnGQvpU9MBjUZhy7IDOiag5sN1.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="space-y-6 flex-1">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input type="text" value="Meal Plans" className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input type="text" value="Seth" className="w-full p-2 border rounded" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" value="Aditya3512@Gmail.Com" className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" value="********" className="w-full p-2 border rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-blue-600">Edit</button>
              </div>
  
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select className="w-full p-2 border rounded">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <div className="flex gap-2">
                    <select className="p-2 border rounded">
                      <option>September</option>
                    </select>
                    <select className="p-2 border rounded">
                      <option>31</option>
                    </select>
                    <select className="p-2 border rounded">
                      <option>2002</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <div className="bg-green-500 text-white p-2 rounded">Active</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Restaurant Name</label>
                  <input type="text" value="Chulhe Da Dhaba" className="w-full p-2 border rounded" />
                </div>
              </div>
            </section>
  
            {/* Outlet Information */}
            <section className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Outlet Information</h2>
                <button className="text-blue-600">Edit</button>
              </div>
  
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    value="Palace @72, Sarfbad Village, Noida Sector 72"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode</label>
                  <input type="text" value="462046" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input type="text" value="Noida" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input type="text" value="Uttar Pradesh" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Latitude/Longitude</label>
                  <input type="text" value="72.5326,58.267" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Outlet Registration</label>
                  <input type="text" value="20/08/2024" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">FSSAI Number</label>
                  <input type="text" value="125EYH556J" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GST Number</label>
                  <input type="text" value="JKJD52995D" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Aadhar Card</label>
                  <input type="text" value="305868217289" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PAN Card</label>
                  <input type="text" value="CKAPV9456K" className="w-full p-2 border rounded" />
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="border rounded p-4">
                  <div className="bg-gray-200 w-full h-32 mb-2"></div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📄</span>
                    Pan Card
                  </div>
                </div>
                <div className="border rounded p-4">
                  <div className="bg-gray-200 w-full h-32 mb-2"></div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📄</span>
                    Adhar Card
                  </div>
                </div>
                <div className="border rounded p-4">
                  <div className="bg-gray-200 w-full h-32 mb-2"></div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📄</span>
                    GST Regis.
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }
  export default ProfileManager;
  
  