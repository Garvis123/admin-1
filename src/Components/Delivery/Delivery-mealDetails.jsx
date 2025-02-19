import React from 'react'
import { ArrowLeft, ChevronDown, Search } from 'lucide-react'
import Header from '../Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DeliverySidebar from '../Delivery/Delivery-Sidebar'
const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']
const planTypes = ['Standerd', 'Premium', 'Gold']

const queryData = [
  {
    id: '#54264',
    date: '12/JAN/2024',
    time: '5:00 AM',
    query: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NULLAM IN DUI MAURIS.'
  },
  {
    id: '#54264',
    date: '12/JAN/2024',
    time: '5:00 AM',
    query: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NULLAM IN DUI MAURIS.'
  },
  {
    id: '#54264',
    date: '12/JAN/2024',
    time: '5:00 AM',
    query: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NULLAM IN DUI MAURIS.'
  },
  {
    id: '#54264',
    date: '12/JAN/2024',
    time: '5:00 AM',
    query: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NULLAM IN DUI MAURIS.'
  },
  {
    id: '#54264',
    date: '12/JAN/2024',
    time: '12/JAN/2024',
    query: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. NULLAM IN DUI MAURIS.'
  }
]

const DeliveryMealDetails =()=> {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const toggleMenu = () => setIsMenuOpen((prev) => !prev);
const {id}=useParams();
  return (
    <div className="min-h-screen bg-[#ffe9d7]">
      {/* Header */}
     <Header />

      {/* Back button and Title */}
      <div className="flex flex-1 md:flex-row">
      <DeliverySidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
        

        {/* Meal Sections */}
        <main  className={`flex-1 mt-[80px]  p-4 transition-all duration-300 ${
          isMenuOpen ? 'lg:ml-[340px] lg:w-[calc(100%-340px)]' : 'ml-0 w-full'
        }`}>
        {mealTypes.map((mealType) => (
          <div key={mealType} className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <h2 className="text-center font-semibold text-xl mb-6">{mealType}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planTypes.map((planType) => (
                <div key={planType} className="space-y-4">
                  <h3 className="font-medium text-lg">{planType}</h3>
                  <div className="space-y-2">
                    <p>Meal : Sabji , Roti , Rice</p>
                    <p>Total Meal Quantity : 23</p>
                    <p>Delivery Meal Quantity : 15</p>
                    <p>Cancle Meal Quantity : 8</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Customer Query Sequence */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Customer Query Sequence</h2>
            <button className="flex items-center gap-2 border rounded-md px-3 py-1">
              Sort By
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">QUERY ID</th>
                  <th className="text-left py-3 px-4">DATE</th>
                  <th className="text-left py-3 px-4">TIME</th>
                  <th className="text-left py-3 px-4">QUERY</th>
                </tr>
              </thead>
              <tbody>
                {queryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.time}</td>
                    <td className="py-3 px-4">{item.query}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </main>
      </div>
    </div>
  )
}
export default DeliveryMealDetails;
