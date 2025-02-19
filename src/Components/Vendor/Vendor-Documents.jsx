'use client'

import { useState,useContext } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header'
import VendorSidebar from './Vendor-Sidebar';
import { VendorContext } from './VendorContext';

const VendorDocuments=()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const {id}=useParams();
    const { currentItems, setCurrentItems } = useContext(VendorContext);
      // console.log(currentItems);
      
      const user = currentItems.find((item) => item.outletId === id);
    // console.log(user);
    const fullName = user ? user.fullName : "User not found";
    const phoneNumber = user ? user.phoneNumber : "Fetching..";
   

  const documents = [
    {
      fileName: "Adhar Card",
      subText: "adhar_card_report.pdf",
      dateUploaded: "12/JAN/2024",
      lastUpdated: "An Hour Ago",
      verified: true,
      fileSize: "3.2 MB"
    },
    {
      fileName: "Adhar Card",
      subText: "adhar_card_report.pdf",
      dateUploaded: "12/JAN/2024",
      lastUpdated: "An Hour Ago",
      verified: false,
      fileSize: "3.2 MB"
    },
    {
      fileName: "Adhar Card",
      subText: "adhar_card_report.pdf",
      dateUploaded: "12/JAN/2024",
      lastUpdated: "15 Min. Ago",
      verified: true,
      fileSize: "3.2 MB"
    },
    {
      fileName: "Adhar Card",
      subText: "adhar_card_report.pdf",
      dateUploaded: "12/JAN/2024",
      lastUpdated: "Onr Month Ago",
      verified: false,
      fileSize: "3.2 MB"
    },
    {
      fileName: "Adhar Card",
      subText: "adhar_card_report.pdf",
      dateUploaded: "12/JAN/2024",
      lastUpdated: "An Hour Ago",
      verified: false,
      fileSize: "3.2 MB"
    },
    {
      fileName: "Adhar Card",
      subText: "adhar_card_report.pdf",
      dateUploaded: "12/JAN/2024",
      lastUpdated: "An Hour Ago",
      verified: true,
      fileSize: "3.2 MB"
    }
  ]

  const menuItems = [
    "Profile",
    "Meal Plans",
    "One Time Order",
    "Total Users",
    "Plans",
    "Wallet",
    "All Query",
    "All Documents"
  ]

  return (
    <div className="min-h-screen bg-[#Fae9d7]">
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
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
     

        {/* Main Content */}
        <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
  ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
  ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
          {/* Breadcrumb */}
          

          {/* User Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h2 className="font-bold">{fullName}</h2>
                <p className="text-sm text-gray-600">{phoneNumber}</p>
              </div>
              <span className="ml-auto">🔔</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">$</div>
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <h2 className="font-bold">253</h2>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">$</div>
              <div>
                <p className="text-sm text-gray-600">Not Verified</p>
                <h2 className="font-bold">253</h2>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">File Name</th>
                  <th className="text-left p-4">Date Uploaded</th>
                  <th className="text-left p-4">Last Updated</th>
                  <th className="text-left p-4">Verified</th>
                  <th className="text-left p-4">File Size</th>
                  <th className="text-left p-4"></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">📄</div>
                        <div>
                          <p className="font-medium">{doc.fileName}</p>
                          <p className="text-sm text-gray-600">{doc.subText}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{doc.dateUploaded}</td>
                    <td className="p-4">{doc.lastUpdated}</td>
                    <td className="p-4">
                      <span className={`${
                        doc.verified ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {doc.verified ? 'Verified' : 'Not Verified'}
                      </span>
                    </td>
                    <td className="p-4">{doc.fileSize}</td>
                    <td className="p-4">
                      <button className="px-2">⋮</button>
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


export default VendorDocuments;