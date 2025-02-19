import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DeliverySidebar = ({ isMenuOpen, toggleMenu, id }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "profile", label: "Profile", route: `/delivery/profile/${id}` },
    { key: "mealPlans", label: "Meal Plans", route: `/delivery/meal/${id}` },
    { key: "oneTimeOrder", label: "One Time Order", route: `/delivery/order/${id}` },
    { key: "documents", label: "All Documents", route: `/delivery/documents/${id}` },
    { key: "wallet", label: "Payment & Wallet ", route: `/delivery/wallet/${id}` },
    { key: "allQuery", label: "All Query", route: `/delivery/query/${id}` },
  ];

  const getActiveTab = () => {
    const activeTab = tabs.find((tab) => location.pathname.includes(tab.route));
    return activeTab ? activeTab.key : null;
  };

  const activeTab = getActiveTab();

  return (
    <>
    <aside
        className={`fixed top-[75px] left-0 h-[calc(100vh-75px)] w-[80%] sm:w-[280px] md:w-[320px] bg-[#fae9d7] border-r-2 border-white z-40 p-4 space-y-4 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg md:text-xl font-semibold">
          Admin &gt; Delivery &gt; Ankit
        </div>
        <button onClick={toggleMenu} className="text-2xl  px-3 py-2 text-[#727272] bg-white shadow rounded-full z-50">
          <i className="ri-menu-line"></i>
        </button>
      </div>

      <nav className="space-y-2 md:space-y-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => navigate(tab.route)}
            className={`w-full text-left py-2 px-4 rounded ${
              activeTab === tab.key
                ? "bg-[#FF6600] text-white"
                : "bg-white hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>

     {/* Sidebar Toggle Button */}
     {!isMenuOpen && (
        <div className="h-[calc(100vh-75px)] w-[0px] sm:w-[90px] border-white sm:border-r-2">
          <button
            className="sm:mt-[100px] mt-5 ml-4 sm:ml-5 px-3 py-2 text-[#727272] bg-white shadow rounded-full"
            onClick={toggleMenu}
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default DeliverySidebar;
