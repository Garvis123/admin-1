"use client"

import { Menu, Search, UserIcon } from "lucide-react"
import { useState } from "react"
import Header from "../Header"
import PanelSidebar from "../Panel-sidebar"
import { Link } from "react-router-dom"
// import Image from "next/image"

// interface VendorData  {
//   id: string
//   name: string
//   mobile: string
//   email: string
//   numbers: number
// }

const VendorManager=()=> {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const stats = [
    { title: "Total Vender Manager", count: 21 },
    { title: "Active Vender Manager", count: 2 },
    { title: "Non Active Vender Manager", count: 1 },
    { title: "Deleted Vender Manager", count: 1234 },
  ]

  const vendorData = [
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "aditya@gmail.com", numbers: 24 },
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "aditya@gmail.com", numbers: 74 },
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "aditya@gmail.com", numbers: 74 },
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "adiya@gmail.com", numbers: 5 },
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "aditya@gmail.com", numbers: 2 },
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "aditya@gmail.com", numbers: 7 },
    { id: "#1234", name: "JOSE D", mobile: "8982825992", email: "adit@gmail.com", numbers: 1 },
  ]

  return (
    <div className="min-h-screen bg-[#FAE9D7] flex flex-col relative">
      {/* Header */}
     
<Header />
      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar */}
        <PanelSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />


        {/* Main Content */}
        <main className={` flex-1  sm:mt-[80px] mt-[80px] p-4 transition-all duration-300  ${
          isMenuOpen ? "lg:ml-[340px] overflow-hidden lg:w-[calc(100%-320px)]" : "ml-[0px] sm:ml-[100px] w-full "
        }`}>
         

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <UserIcon size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{stat.count}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <Link to={`/manager/vender/:id`}>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Id</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Mobile No.</th>
                  <th className="text-left p-4">Email Id</th>
                  <th className="text-left p-4">Numbers Of Vender</th>
                </tr>
              </thead>
              <tbody>
                {vendorData.map((vendor, index) => (
                    
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{vendor.id}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          {/* <
                            src="/placeholder.svg"
                            alt={vendor.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          /> */}
                        </div>
                        <span>{vendor.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{vendor.mobile}</td>
                    <td className="p-4">{vendor.email}</td>
                    <td className="p-4 text-green-500">{vendor.numbers}</td>
                  </tr>
                     
                ))}
              </tbody>
            </table>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default VendorManager;