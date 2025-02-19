import React, { useState } from 'react';
import Header from '../Header';
import ManagerSidebar from './Manager-Sidebar';

const ManagerMeal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-[#fae9d7]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ManagerSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <main
          className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'sm:ml-[100px] ml-0 w-full'
          }`}
        >
          {['BREAKFAST', 'LUNCH', 'DINNER'].map((meal) => (
            <div key={meal} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-center">{meal}</h2>

              <div className="flex flex-wrap justify-center  gap-4 ">
  {['Standard Plan', 'Basic Plan', 'Premium Plan', 'Gold Plan'].map((plan, index) => (
    <button
      key={index}
      className={`px-5 py-2 rounded border font-semibold ${
        plan === 'Standard Plan' ? 'bg-orange-500 text-white' : 'border-orange-500 text-orange-500'
      }`}
    >
      {plan}
    </button>
  ))}
</div>


              <div className="grid grid-cols-5 text-center mt-6 font-bold">
                <div className="text-left">
                  <p className="mb-2">Meal :</p>
                  <p className="mb-2">Total Meal :</p>
                  <p className="mb-2">Delivery Meal :</p>
                  <p className="mb-2">Cancel Meal :</p>
                </div>

                {['Standard Plan', 'Basic Plan', 'Premium Plan', 'Gold Plan'].map((plan, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-gray-600 font-semibold">Sabji, Roti, Rice</p>
                    <p className="text-gray-600">23</p>
                    <p className="text-gray-600">15</p>
                    <p className="text-gray-600">8</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ManagerMeal;
