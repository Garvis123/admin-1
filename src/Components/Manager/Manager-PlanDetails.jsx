import Header from "../Header";
import ManagerSidebar from "./Manager-Sidebar";
import { useState } from "react";

const ManagerPlans=()=> {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const activeDayIndex = 0 // Sunday is active
  
    return (
      <div className="flex flex-col min-h-screen bg-[#fae9d7]">
        {/* Header */}
        <Header />
  
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
        <ManagerSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
  
          {/* Main Content Area */}
          <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? 'lg:ml-[340px] overflow-hidden lg:w-[calc(100%-340px)]' : 'sm:ml-[100px] ml-0 w-full'
          }`}>
            {/* Days Selection */}
            <div className="overflow-x-auto mb-6">
              <div className="flex gap-2 min-w-max">
                {days.map((day, index) => (
                  <button
                    key={day}
                    className={`px-6 py-2 rounded-full ${
                      index === activeDayIndex ? "bg-[#FF4500] text-white" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Meal Plans */}
            <div className="space-y-8">
              {/* Standard Plan */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Standard Plan</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Dinner", "Lunch"].map((mealType) => (
                    <div key={mealType} className="bg-white rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man_vendor_panel_list_meal_plans-6H9QKD4x03O8I7zMJkvKnO4SiYCFuM.png"
                        alt="Meal"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold">{mealType}</h3>
                          <div className="flex">
                            {"★★★★☆".split("").map((star, i) => (
                              <span key={i} className="text-yellow-400">
                                {star}
                              </span>
                            ))}
                          </div>
                        </div>
  
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Ice Cream</h4>
                            <h4 className="font-medium mb-2">Ingredients</h4>
                            <p className="text-sm text-gray-600">
                              Delicious Poha Jalebi with grilled onion and spicy mirch. Delicious Poha Jalebi with grilled
                              onion and spicy mirch. Delicious Poha Jalebi with grilled onion and spicy mirch.
                            </p>
                          </div>
  
                          <div>
                            <h4 className="font-medium mb-2">Ingredients</h4>
                            <p className="text-sm text-gray-600">
                              Delicious Poha Jalebi with grilled onion and spicy mirch. Delicious Poha Jalebi with grilled
                              onion and spicy mirch. Delicious Poha Jalebi with grilled onion and spicy mirch.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
  
              {/* Basic Plan */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Basic Plan</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Dinner", "Lunch"].map((mealType) => (
                    <div key={mealType} className="bg-white rounded-lg overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man_vendor_panel_list_meal_plans-6H9QKD4x03O8I7zMJkvKnO4SiYCFuM.png"
                        alt="Meal"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold">{mealType}</h3>
                          <div className="flex">
                            {"★★★★☆".split("").map((star, i) => (
                              <span key={i} className="text-yellow-400">
                                {star}
                              </span>
                            ))}
                          </div>
                        </div>
  
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Ice Cream</h4>
                            <h4 className="font-medium mb-2">Ingredients</h4>
                            <p className="text-sm text-gray-600">
                              Delicious Poha Jalebi with grilled onion and spicy mirch. Delicious Poha Jalebi with grilled
                              onion and spicy mirch. Delicious Poha Jalebi with grilled onion and spicy mirch.
                            </p>
                          </div>
  
                          <div>
                            <h4 className="font-medium mb-2">Ingredients</h4>
                            <p className="text-sm text-gray-600">
                              Delicious Poha Jalebi with grilled onion and spicy mirch. Delicious Poha Jalebi with grilled
                              onion and spicy mirch. Delicious Poha Jalebi with grilled onion and spicy mirch.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  export default ManagerPlans ;
 