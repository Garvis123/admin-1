'use client'

import { useState } from 'react'
import { useParams,Link } from 'react-router-dom'

import { Bell, Menu, Search } from 'lucide-react'
import Header from '../Header'
import DeliverySidebar from './Delivery-Sidebar'

export default function DeliveryMeal() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meal, setmeal] = useState([]);
  const [progress, setProgress] = useState(0); 
  const {id}=useParams();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  const mealData = Array(6).fill({
    date: '12/JAN/2024',
    meals: ['BREAKFAST', 'LUNCH', 'DINNER']
  })

  const navItems = [
    { name: 'Profile', active: false },
    { name: 'Meal Plans', active: true },
    { name: 'Order', active: false },
    { name: 'Plans', active: false },
    { name: 'Wallet', active: false },
    { name: 'All Query', active: false }
  ]

  return (
    <div className="flex min-h-screen bg-[#Fae9d7] flex-col relative">
      {/* Sidebar - hidden on mobile, shown with toggle */}
      <Header />
    {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Header */}
        <DeliverySidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
     
        {/* User info */}
        <main  className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
          }`}>
       <div className="bg-white p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xl font-medium">AS</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">ADITYA SETH</h2>
            <p className="text-gray-600 text-sm sm:text-base">9893679911</p>
          </div>
          <div className="sm:ml-auto">
            <Bell className="text-gray-500 hover:text-gray-700 w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

        {/* Meal plans table */}
        <div className="p-4 overflow-x-auto bg-white">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left">
                <th className="p-4 font-medium">DATE</th>
                <th className="p-4 font-medium">Meal Type</th>
                <th className="p-4 font-medium">Cancel Meal</th>
              </tr>
            </thead>
            <tbody>
              {mealData.map((day, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4"><Link to={`/delivery/meal/details/:id`}>{day.date}</Link></td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal, mealIndex) => (
                        <span
                          key={mealIndex}
                          className="px-3 py-1 rounded-full bg-[#FFE4D6] text-sm"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                      No
                    </button>
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

